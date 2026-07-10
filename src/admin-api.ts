import { Env, User } from './types';
import * as dbOps from './db';
import { generateUUID, generatePassword, generateToken, hashPassword, verifyAuth, jsonResponse, formatBytes, corsHeaders } from './utils';

export async function handleAdminAPI(request: Request, env: Env, path: string): Promise<Response> {
  const url = new URL(request.url);

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders() });
  }

  // Public endpoint: login
  if (path === '/api/auth/login' && request.method === 'POST') {
    return handleLogin(request, env);
  }

  // Auth check for all other endpoints
  const cookie = request.headers.get('Cookie');
  const authHeader = request.headers.get('Authorization');
  let authenticated = false;
  let adminPass = env.ADMIN_PASS;

  // Also check DB for stored password
  try {
    const storedPass = await dbOps.getSetting(env.DB, 'admin_pass');
    if (storedPass) adminPass = storedPass;
  } catch (e) {}

  if (authHeader && authHeader.startsWith('Bearer ')) {
    authenticated = authHeader.slice(7) === hashPassword(adminPass);
  } else {
    authenticated = verifyAuth(cookie, adminPass);
  }

  if (!authenticated) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  // Route to handlers
  if (path === '/api/dashboard' && request.method === 'GET') {
    return handleDashboard(env);
  }
  if (path === '/api/users' && request.method === 'GET') {
    return handleGetUsers(env);
  }
  if (path === '/api/users' && request.method === 'POST') {
    return handleCreateUser(request, env);
  }
  const userMatch = path.match(/^\/api\/users\/(\d+)(\/.*)?$/);
  if (userMatch) {
    const userId = parseInt(userMatch[1]);
    const subPath = userMatch[2] || '';
    if (subPath === '' && request.method === 'PUT') return handleUpdateUser(request, env, userId);
    if (subPath === '' && request.method === 'DELETE') return handleDeleteUser(env, userId);
    if (subPath === '/reset-traffic' && request.method === 'POST') return handleResetTraffic(env, userId);
    if (subPath === '/connections' && request.method === 'GET') return handleGetConnections(env, userId);
  }
  if (path === '/api/settings' && request.method === 'GET') {
    return handleGetSettings(env);
  }
  if (path === '/api/settings' && request.method === 'PUT') {
    return handleUpdateSettings(request, env);
  }
  if (path === '/api/change-password' && request.method === 'PUT') {
    return handleChangePassword(request, env);
  }

  return jsonResponse({ error: 'Not found' }, 404);
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json<{ password: string }>();
    let adminPass = env.ADMIN_PASS;
    try {
      const storedPass = await dbOps.getSetting(env.DB, 'admin_pass');
      if (storedPass) adminPass = storedPass;
    } catch (e) {}

    if (body.password === adminPass) {
      const token = hashPassword(adminPass);
      const adminPath = await dbOps.getSetting(env.DB, 'admin_path') || 'usf-admin';
      return jsonResponse({ token, admin_path: adminPath }, 200);
    }
    return jsonResponse({ error: 'Invalid password' }, 401);
  } catch (e) {
    return jsonResponse({ error: 'Bad request' }, 400);
  }
}

async function handleDashboard(env: Env): Promise<Response> {
  try {
    const stats = await dbOps.getDashboardStats(env.DB);
    const users = await dbOps.getAllUsers(env.DB);
    const recentUsers = users.slice(0, 10).map(u => ({
      id: u.id,
      username: u.username,
      uuid: u.uuid,
      volume_used: u.volume_used,
      volume_limit: u.volume_limit,
      enabled: u.enabled,
      expire_date: u.expire_date,
      updated_at: u.updated_at,
    }));
    return jsonResponse({ ...stats, recent_users: recentUsers });
  } catch (e: any) {
    return jsonResponse({ total_users: 0, active_users: 0, total_traffic: 0, active_connections: 0, recent_users: [], error: e.message }, 200);
  }
}

async function handleGetUsers(env: Env): Promise<Response> {
  try {
    const users = await dbOps.getAllUsers(env.DB);
    return jsonResponse({ users });
  } catch (e: any) {
    return jsonResponse({ users: [], error: e.message }, 200);
  }
}

async function handleCreateUser(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json<{
      username: string;
      volume_limit: number;
      expire_days: number;
      connection_limit: number;
      note: string;
    }>();

    if (!body.username || body.username.length < 3) {
      return jsonResponse({ error: 'Username must be at least 3 characters' }, 400);
    }

    const existing = await dbOps.getUserByUsername(env.DB, body.username);
    if (existing) {
      return jsonResponse({ error: 'Username already exists' }, 409);
    }

    const uuid = generateUUID();
    const password = generatePassword(16);
    const volumeLimit = (body.volume_limit || 0) * 1073741824; // GB to bytes

    const user = await dbOps.createUser(
      env.DB, uuid, body.username, password,
      volumeLimit, body.expire_days || 0, body.connection_limit || 0
    );

    if (body.note) {
      await dbOps.updateUser(env.DB, user.id, { note: body.note });
    }

    return jsonResponse({
      user: { ...user, volume_limit: user.volume_limit / 1073741824 },
      password,
      sub_link: `/${await dbOps.getSetting(env.DB, 'sub_path') || 's'}/${uuid}`,
    }, 201);
  } catch (e: any) {
    return jsonResponse({ error: e.message || 'Failed to create user' }, 500);
  }
}

async function handleUpdateUser(request: Request, env: Env, userId: number): Promise<Response> {
  try {
    const body = await request.json<any>();
    const updates: any = {};

    if (body.username !== undefined) updates.username = body.username;
    if (body.volume_limit !== undefined) updates.volume_limit = body.volume_limit * 1073741824;
    if (body.expire_days !== undefined) {
      if (body.expire_days === 0) {
        updates.expire_date = null as any;
      } else {
        const user = await dbOps.getUserById(env.DB, userId);
        const base = user ? new Date(user.created_at) : new Date();
        updates.expire_date = new Date(base.getTime() + body.expire_days * 86400000).toISOString();
      }
    }
    if (body.connection_limit !== undefined) updates.connection_limit = body.connection_limit;
    if (body.enabled !== undefined) updates.enabled = body.enabled ? 1 : 0;
    if (body.note !== undefined) updates.note = body.note;

    await dbOps.updateUser(env.DB, userId, updates);
    return jsonResponse({ success: true });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

async function handleDeleteUser(env: Env, userId: number): Promise<Response> {
  try {
    await dbOps.deleteUser(env.DB, userId);
    return jsonResponse({ success: true });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

async function handleResetTraffic(env: Env, userId: number): Promise<Response> {
  try {
    await dbOps.resetUserTraffic(env.DB, userId);
    return jsonResponse({ success: true });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

async function handleGetConnections(env: Env, userId: number): Promise<Response> {
  try {
    const connections = await dbOps.getActiveConnections(env.DB, userId);
    return jsonResponse({ connections });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

async function handleGetSettings(env: Env): Promise<Response> {
  const settings = await dbOps.getAllSettings(env.DB);
  return jsonResponse(settings);
}

async function handleUpdateSettings(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json<Record<string, string>>();
    for (const [key, value] of Object.entries(body)) {
      await dbOps.updateSetting(env.DB, key, value);
    }
    return jsonResponse({ success: true });
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}

async function handleChangePassword(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json<{ old_password: string; new_password: string }>();
    const success = await dbOps.changeAdminPassword(env.DB, body.old_password, body.new_password);
    if (success) {
      return jsonResponse({ success: true });
    }
    return jsonResponse({ error: 'Current password is incorrect' }, 403);
  } catch (e: any) {
    return jsonResponse({ error: e.message }, 500);
  }
}