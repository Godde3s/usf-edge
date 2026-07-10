export function generateUUID(): string {
  return crypto.randomUUID();
}

export function isValidUUID(uuid: string): boolean {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
}

export function generatePassword(length: number = 16): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*';
  let password = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    password += chars[randomValues[i] % chars.length];
  }
  return password;
}

export function generateToken(length: number = 32): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

// Simple sync hash using FNV-1a for session tokens (not crypto-secure, but sufficient for session IDs)
function simpleHash(str: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
}

export function hashPassword(password: string): string {
  return simpleHash(password);
}

export function verifyAuth(cookie: string | null, adminPass: string): boolean {
  if (!cookie) return false;
  const match = cookie.match(/usf_auth=([^;]+)/);
  if (!match) return false;
  return match[1] === hashPassword(adminPass);
}

export function bytesToUUID(bytes: Uint8Array): string {
  const hex = Array.from(bytes.slice(0, 16), b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function daysRemaining(expireDate: string | null): number {
  if (!expireDate) return -1;
  const diff = new Date(expireDate).getTime() - Date.now();
  return Math.ceil(diff / 86400000);
}

export function parseDestAddress(data: Uint8Array, offset: number): { addr: string; port: number; newOffset: number } {
  const addrType = data[offset];
  offset++;
  let addr: string;
  switch (addrType) {
    case 1: {
      addr = `${data[offset]}.${data[offset + 1]}.${data[offset + 2]}.${data[offset + 3]}`;
      offset += 4;
      break;
    }
    case 2: {
      const domainLen = data[offset];
      offset++;
      addr = new TextDecoder().decode(data.slice(offset, offset + domainLen));
      offset += domainLen;
      break;
    }
    case 3: {
      const parts: string[] = [];
      for (let i = 0; i < 8; i++) {
        parts.push(((data[offset + i * 2] << 8) | data[offset + i * 2 + 1]).toString(16));
      }
      addr = parts.join(':');
      offset += 16;
      break;
    }
    default:
      throw new Error(`Unknown address type: ${addrType}`);
  }
  const port = (data[offset] << 8) | data[offset + 1];
  offset += 2;
  return { addr, port, newOffset: offset };
}

export function jsonResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

export function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}