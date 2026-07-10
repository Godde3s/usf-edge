# Usf-Edge

**Next-Generation Edge Proxy Management Panel** — Deploy a fully-featured proxy management system on Cloudflare Workers with user management, volume/time limits, beautiful subscription pages, and stealth mode.

![Usf-Edge](https://img.shields.io/badge/Usf--Edge-1.0.0-cyan?style=for-the-badge)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## Features

### 🎯 User Management
- Create unlimited users with unique UUIDs and passwords
- **Volume limits** — Set data caps per user (GB), with real-time tracking
- **Time limits** — Set expiry dates or durations (days)
- **Connection limits** — Max concurrent devices per user
- Enable/disable users instantly
- One-click traffic reset
- Search and filter users

### 📊 Beautiful Subscription Pages
- **Volume usage ring** — Circular SVG progress showing used vs. total
- **Time remaining** — Countdown with progress bar
- **Active connections** — See connected devices with IP and user-agent
- **Multi-format subscription links**:
  - Universal (auto-detect client)
  - Clash / Clash Meta YAML
  - Sing-box JSON
  - V2Ray base64
- **QR code generation** for each format
- **Copy to clipboard** with one click
- **How-to-use guides** for Windows, Android, iOS, macOS, Linux
- Auto language detection and responsive design

### 🔐 Admin Panel
- Dark glassmorphism UI with smooth animations
- Dashboard with stats (total users, active users, total traffic, active connections)
- Full CRUD user management
- Settings configuration (protocol, transport, path, fingerprint, etc.)
- Password management with change option
- Session-based authentication
- Responsive sidebar navigation

### 🕵️ Stealth Mode
- Root URL shows a fake **nginx welcome page**
- Admin panel hidden at a random/custom path (default: `/usf-admin`)
- Subscription pages at customizable path (default: `/s`)
- Nothing reveals the proxy functionality to casual inspection

### ⚡ Technical Features
- **VLESS** protocol support over WebSocket
- **D1 database** for persistent user storage
- **KV namespace** for caching
- Real-time traffic accounting per user
- Active connection tracking
- Multiple subscription output formats (Clash, Sing-box, V2Ray)
- TLS with configurable client fingerprint

---

## Quick Deploy

### Option 1: One-Click Deploy (Recommended)

1. Go to the **[Usf-Edge Deploy Page](https://godde3s.github.io/usf-edge/)**
2. Follow the token guide to get your Cloudflare API token
3. Enter your token and click **Deploy**
4. Save the admin URL and password shown

### Option 2: Manual Deploy

#### Prerequisites
- Node.js 18+
- A Cloudflare account
- Cloudflare API token with permissions:
  - `Account > Workers Scripts > Edit`
  - `Account > D1 > Edit`
  - `Account > Workers KV Storage > Edit`

#### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/godde3s/usf-edge.git
   cd usf-edge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Login to Cloudflare:**
   ```bash
   export CLOUDFLARE_API_TOKEN="your_api_token_here"
   ```

4. **Create D1 database:**
   ```bash
   npx wrangler d1 create usf-edge-db
   ```
   Copy the `database_id` from the output and update `wrangler.jsonc`.

5. **Create KV namespace:**
   ```bash
   npx wrangler kv namespace create KV
   ```
   Copy the `id` from the output and update `wrangler.jsonc`.

6. **Initialize the database schema:**
   ```bash
   npx wrangler d1 execute usf-edge-db --remote --file=./schema.sql
   ```

7. **Set your admin password** in `wrangler.jsonc`:
   ```json
   {
     "vars": {
       "ADMIN_PASS": "your_secure_password_here"
     }
   }
   ```

8. **Deploy:**
   ```bash
   npx wrangler deploy
   ```

9. **Access your panel** at:
   ```
   https://your-worker-name.your-subdomain.workers.dev/usf-admin
   ```

---

## Project Structure

```
usf-edge/
├── src/
│   ├── index.ts          # Main entry point, request routing
│   ├── types.ts          # TypeScript interfaces
│   ├── utils.ts          # Utility functions (UUID, hashing, formatting)
│   ├── db.ts             # D1 database operations (CRUD, stats)
│   ├── admin-api.ts      # Admin REST API endpoints
│   ├── sub.ts            # Subscription handler (config generation)
│   ├── tunnel.ts         # VLESS tunnel implementation
│   └── html/
│       ├── admin.ts      # Admin panel HTML (embedded)
│       ├── subscription.ts  # Subscription page HTML (embedded)
│       └── fake.ts       # Stealth fake page HTML
├── github-pages/
│   └── index.html        # GitHub Pages deploy tool website
├── dist/
│   └── index.js          # Pre-built Worker bundle (for deploy tool)
├── schema.sql            # D1 database schema
├── wrangler.jsonc        # Wrangler configuration
├── package.json
└── tsconfig.json
```

---

## API Reference

All admin API endpoints are under `/{admin_path}/api/`.

### Authentication
```http
POST /api/auth/login
Content-Type: application/json

{"password": "your_admin_password"}

→ {"token": "...", "admin_path": "usf-admin"}
```

### Dashboard
```http
GET /api/dashboard
Authorization: Bearer <token>

→ {"total_users": 5, "active_users": 3, "total_traffic": 1234567, "active_connections": 2, "recent_users": [...]}
```

### Users
```http
# List all users
GET /api/users

# Create a user
POST /api/users
{"username": "john", "volume_limit": 10, "expire_days": 30, "connection_limit": 3, "note": ""}

→ {"user": {...}, "password": "generated_password", "sub_link": "/s/uuid-here"}

# Update a user
PUT /api/users/{id}
{"volume_limit": 20, "enabled": true}

# Delete a user
DELETE /api/users/{id}

# Reset user traffic
POST /api/users/{id}/reset-traffic

# Get user connections
GET /api/users/{id}/connections
```

### Settings
```http
GET /api/settings
→ {"protocol": "vless", "transport": "ws", "path": "/", ...}

PUT /api/settings
{"protocol": "vless", "transport": "ws", "fingerprint": "chrome"}
```

### Password
```http
PUT /api/change-password
{"old_password": "...", "new_password": "..."}
```

### Subscription Endpoints
```
GET /s/{uuid}                    → Subscription page (HTML)
GET /s/{uuid}?format=v2ray       → Base64 VLESS link
GET /s/{uuid}?format=clash       → Clash YAML config
GET /s/{uuid}?format=singbox     → Sing-box JSON config
```

---

## Configuration

Settings can be changed from the admin panel or via API.

| Setting | Default | Description |
|---------|---------|-------------|
| `protocol` | `vless` | Proxy protocol (vless / trojan) |
| `transport` | `ws` | Transport type (ws / grpc) |
| `path` | `/` | WebSocket path |
| `fingerprint` | `chrome` | TLS client fingerprint |
| `sub_name` | `Usf-Edge` | Subscription display name |
| `admin_path` | `usf-admin` | Admin panel URL path |
| `sub_path` | `s` | Subscription URL path |

---

## Client Setup

After creating a user, give them their subscription link:
```
https://your-worker.workers.dev/s/{their-uuid}
```

They can:
1. Open the link in a browser to see their usage stats
2. Add the link to their proxy client:
   - **V2RayNG / V2RayN**: Add subscription → paste link
   - **Clash / Clash Meta**: Add subscription URL → paste link
   - **Sing-box**: Add subscription → paste link
   - **Shadowrocket**: Add subscription → paste link
   - **Streisand / Hiddify**: Add subscription → paste link

---

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Cache**: Cloudflare KV
- **Language**: TypeScript
- **Build Tool**: Wrangler
- **Frontend**: Vanilla HTML/CSS/JS (no framework)

---

## Important Notes

- **Free tier limits**: 100,000 requests/day, 5GB D1 storage
- **Traffic accounting**: Uses WebSocket message sizes for estimation
- **Stealth**: The root URL shows a fake nginx page; only specific paths serve the panel
- **Security**: Change the default admin password immediately after deployment
- **Connections**: Active connections are tracked in D1; stale connections are cleaned up

---

## License

MIT License — feel free to use, modify, and distribute.