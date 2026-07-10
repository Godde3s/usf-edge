-- Usf-edge Database Schema
-- User management with volume/time/connection limits

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  volume_limit REAL DEFAULT 0,
  volume_used REAL DEFAULT 0,
  expire_date TEXT,
  connection_limit INTEGER DEFAULT 0,
  enabled INTEGER DEFAULT 1,
  note TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS traffic_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  upload REAL DEFAULT 0,
  download REAL DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS active_connections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ip_address TEXT,
  connected_at TEXT DEFAULT (datetime('now')),
  user_agent TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Default settings
INSERT OR IGNORE INTO settings (key, value) VALUES
  ('protocol', 'vless'),
  ('transport', 'ws'),
  ('path', '/'),
  ('host', ''),
  ('fingerprint', 'chrome'),
  ('sub_name', 'Usf-Edge'),
  ('fake_page_url', ''),
  ('admin_path', 'usf-admin'),
  ('sub_path', 's');

CREATE INDEX IF NOT EXISTS idx_users_uuid ON users(uuid);
CREATE INDEX IF NOT EXISTS idx_traffic_logs_user ON traffic_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_active_connections_user ON active_connections(user_id);