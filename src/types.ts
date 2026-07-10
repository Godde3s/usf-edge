export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  ADMIN_PASS: string;
  ADMIN_PATH: string;
  SUB_PATH: string;
  SUB_TOKEN: string;
}

export interface User {
  id: number;
  uuid: string;
  username: string;
  password: string;
  volume_limit: number;
  volume_used: number;
  expire_date: string | null;
  connection_limit: number;
  enabled: number;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface Settings {
  protocol: string;
  transport: string;
  path: string;
  host: string;
  fingerprint: string;
  sub_name: string;
  fake_page_url: string;
  admin_path: string;
  sub_path: string;
}

export interface TrafficStats {
  upload: number;
  download: number;
  total: number;
}

export interface ActiveConnection {
  id: number;
  user_id: number;
  ip_address: string;
  connected_at: string;
  user_agent: string;
}

export interface DashboardStats {
  total_users: number;
  active_users: number;
  total_traffic: number;
  active_connections: number;
}