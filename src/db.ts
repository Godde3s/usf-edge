import { Env, User, Settings, TrafficStats, ActiveConnection, DashboardStats } from './types';

export async function getSetting(db: D1Database, key: string): Promise<string> {
  const result = await db.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first<{ value: string }>();
  return result?.value || '';
}

export async function getAllSettings(db: D1Database): Promise<Settings> {
  const rows = await db.prepare('SELECT key, value FROM settings').all<{ key: string; value: string }>();
  const settings: Record<string, string> = {};
  for (const row of rows.results) {
    settings[row.key] = row.value;
  }
  return {
    protocol: settings.protocol || 'vlx',
    transport: settings.transport || 'ws',
    path: settings.path || '/',
    host: settings.host || '',
    fingerprint: settings.fingerprint || 'chrome',
    sub_name: settings.sub_name || 'Usf-Edge',
    fake_page_url: settings.fake_page_url || '',
    admin_path: settings.admin_path || 'login',
    sub_path: settings.sub_path || 's',
  };
}

export async function updateSetting(db: D1Database, key: string, value: string): Promise<void> {
  await db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind(key, value).run();
}

export async function getUserByUUID(db: D1Database, uuid: string): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE uuid = ?').bind(uuid).first<User>();
}

export async function getUserByUsername(db: D1Database, username: string): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE username = ?').bind(username).first<User>();
}

export async function getUserById(db: D1Database, id: number): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<User>();
}

export async function getAllUsers(db: D1Database): Promise<User[]> {
  const result = await db.prepare('SELECT * FROM users ORDER BY created_at DESC').all<User>();
  return result.results;
}

export async function createUser(
  db: D1Database,
  uuid: string,
  username: string,
  password: string,
  volumeLimit: number,
  expireDays: number,
  connectionLimit: number
): Promise<User> {
  const expireDate = expireDays > 0
    ? new Date(Date.now() + expireDays * 86400000).toISOString()
    : null;
  await db.prepare(
    `INSERT INTO users (uuid, username, password, volume_limit, expire_date, connection_limit)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(uuid, username, password, volumeLimit, expireDate, connectionLimit).run();
  const user = await getUserByUsername(db, username);
  return user!;
}

export async function updateUser(
  db: D1Database,
  id: number,
  updates: Partial<Pick<User, 'username' | 'volume_limit' | 'expire_date' | 'connection_limit' | 'enabled' | 'note' | 'password'>>
): Promise<void> {
  const setClauses: string[] = [];
  const values: any[] = [];

  if (updates.username !== undefined) { setClauses.push('username = ?'); values.push(updates.username); }
  if (updates.volume_limit !== undefined) { setClauses.push('volume_limit = ?'); values.push(updates.volume_limit); }
  if (updates.expire_date !== undefined) { setClauses.push('expire_date = ?'); values.push(updates.expire_date); }
  if (updates.connection_limit !== undefined) { setClauses.push('connection_limit = ?'); values.push(updates.connection_limit); }
  if (updates.enabled !== undefined) { setClauses.push('enabled = ?'); values.push(updates.enabled); }
  if (updates.note !== undefined) { setClauses.push('note = ?'); values.push(updates.note); }
  if (updates.password !== undefined) { setClauses.push('password = ?'); values.push(updates.password); }

  if (setClauses.length === 0) return;
  setClauses.push("updated_at = datetime('now')");
  values.push(id);

  await db.prepare(`UPDATE users SET ${setClauses.join(', ')} WHERE id = ?`).bind(...values).run();
}

export async function deleteUser(db: D1Database, id: number): Promise<void> {
  await db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
}

export async function getUserTraffic(db: D1Database, userId: number): Promise<TrafficStats> {
  const result = await db.prepare(
    'SELECT COALESCE(SUM(upload), 0) as upload, COALESCE(SUM(download), 0) as download FROM traffic_logs WHERE user_id = ?'
  ).bind(userId).first<{ upload: number; download: number }>();
  return {
    upload: result?.upload || 0,
    download: result?.download || 0,
    total: (result?.upload || 0) + (result?.download || 0),
  };
}

export async function addUserTraffic(db: D1Database, userId: number, upload: number, download: number): Promise<void> {
  if (upload === 0 && download === 0) return;
  await db.prepare(
    'INSERT INTO traffic_logs (user_id, upload, download) VALUES (?, ?, ?)'
  ).bind(userId, upload, download).run();
  await db.prepare(
    'UPDATE users SET volume_used = volume_used + ?, updated_at = datetime(\'now\') WHERE id = ?'
  ).bind(upload + download, userId).run();
}

export async function resetUserTraffic(db: D1Database, userId: number): Promise<void> {
  await db.prepare('DELETE FROM traffic_logs WHERE user_id = ?').bind(userId).run();
  await db.prepare('UPDATE users SET volume_used = 0, updated_at = datetime(\'now\') WHERE id = ?').bind(userId).run();
}

export async function addActiveConnection(db: D1Database, userId: number, ip: string, ua: string): Promise<number> {
  const result = await db.prepare(
    'INSERT INTO active_connections (user_id, ip_address, user_agent) VALUES (?, ?, ?) RETURNING id'
  ).bind(userId, ip, ua).first<{ id: number }>();
  return result?.id || 0;
}

export async function removeActiveConnection(db: D1Database, connId: number): Promise<void> {
  await db.prepare('DELETE FROM active_connections WHERE id = ?').bind(connId).run();
}

export async function getActiveConnections(db: D1Database, userId: number): Promise<ActiveConnection[]> {
  const result = await db.prepare(
    'SELECT * FROM active_connections WHERE user_id = ? ORDER BY connected_at DESC'
  ).bind(userId).all<ActiveConnection>();
  return result.results;
}

export async function countActiveConnections(db: D1Database, userId: number): Promise<number> {
  const result = await db.prepare(
    'SELECT COUNT(*) as count FROM active_connections WHERE user_id = ?'
  ).bind(userId).first<{ count: number }>();
  return result?.count || 0;
}

export async function getDashboardStats(db: D1Database): Promise<DashboardStats> {
  const totalUsers = await db.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
  const activeUsers = await db.prepare('SELECT COUNT(*) as count FROM users WHERE enabled = 1 AND (expire_date IS NULL OR expire_date > datetime(\'now\'))').first<{ count: number }>();
  const totalTraffic = await db.prepare('SELECT COALESCE(SUM(upload + download), 0) as total FROM traffic_logs').first<{ total: number }>();
  const activeConns = await db.prepare('SELECT COUNT(*) as count FROM active_connections').first<{ count: number }>();
  return {
    total_users: totalUsers?.count || 0,
    active_users: activeUsers?.count || 0,
    total_traffic: totalTraffic?.total || 0,
    active_connections: activeConns?.count || 0,
  };
}

export async function changeAdminPassword(db: D1Database, oldPass: string, newPass: string): Promise<boolean> {
  const current = await getSetting(db, 'admin_pass');
  if (current && current !== oldPass) return false;
  await updateSetting(db, 'admin_pass', newPass);
  return true;
}

export async function validateUserAccess(db: D1Database, uuid: string): Promise<{ user: User; allowed: boolean; reason: string }> {
  const user = await getUserByUUID(db, uuid);
  if (!user) return { user: null as any, allowed: false, reason: 'User not found' };
  if (!user.enabled) return { user, allowed: false, reason: 'User is disabled' };
  if (user.expire_date && new Date(user.expire_date) < new Date()) return { user, allowed: false, reason: 'User expired' };
  if (user.volume_limit > 0 && user.volume_used >= user.volume_limit) return { user, allowed: false, reason: 'Volume limit reached' };
  const conns = await countActiveConnections(db, user.id);
  if (user.connection_limit > 0 && conns >= user.connection_limit) return { user, allowed: false, reason: 'Connection limit reached' };
  return { user, allowed: true, reason: 'OK' };
}