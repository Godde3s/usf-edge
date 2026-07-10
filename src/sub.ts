import { Env } from './types';
import * as dbOps from './db';
import { formatBytes, daysRemaining, trojanHashPassword } from './utils';
import { subscriptionHTML } from './html/subscription';

export async function handleSubscriptionPage(token: string, env: Env, request: Request): Promise<Response> {
  // token is the user's UUID
  const user = await dbOps.getUserByUUID(env.DB, token);
  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const url = new URL(request.url);
  const host = url.hostname;
  const protocol = url.protocol === 'https:' ? 'wss' : 'ws';
  const settings = await dbOps.getAllSettings(env.DB);
  const transport = settings.transport || 'ws';
  const path = settings.path || '/';
  const subName = settings.subName || 'Usf-Edge';
  const subPath = settings.sub_path || 's';
  const fingerprint = settings.fingerprint || 'chrome';
  const proto = settings.protocol || 'vless';

  // Calculate stats
  const traffic = await dbOps.getUserTraffic(env.DB, user.id);
  const totalUsed = user.volume_used || traffic.total;
  const volumeLimit = user.volume_limit;
  const isUnlimited = volumeLimit <= 0;
  const volumePercent = isUnlimited ? 0 : Math.min(100, (totalUsed / volumeLimit) * 100);
  const remaining = isUnlimited ? 0 : Math.max(0, volumeLimit - totalUsed);

  // Time
  const daysLeft = daysRemaining(user.expire_date);
  const isExpired = daysLeft !== -1 && daysLeft <= 0;
  const isNever = daysLeft === -1;

  // Connections
  const activeConns = await dbOps.countActiveConnections(env.DB, user.id);
  const connLimit = user.connection_limit;
  const isConnUnlimited = connLimit <= 0;

  // Status
  let status = 'active';
  if (!user.enabled) status = 'disabled';
  else if (isExpired) status = 'expired';
  else if (!isUnlimited && volumePercent >= 100) status = 'limited';

  // Subscription links
  const baseURL = `${url.protocol}//${host}`;
  const subLink = `${baseURL}/${subPath}/${user.uuid}`;
  const subClash = `${subLink}?format=clash`;
  const subSingbox = `${subLink}?format=singbox`;
  const subV2ray = `${subLink}?format=v2ray`;

  // Get recent connections
  const connections = await dbOps.getActiveConnections(env.DB, user.id);
  const connectionsJSON = JSON.stringify(connections.slice(0, 5).map(c => ({
    ip: c.ip_address,
    time: c.connected_at,
    ua: c.user_agent || 'Unknown'
  })));

  // Replace placeholders in HTML
  let html = subscriptionHTML;
  html = html.replace(/__USERNAME__/g, user.username);
  html = html.replace(/__SUB_NAME__/g, subName);
  html = html.replace(/__SUB_LINK__/g, subLink);
  html = html.replace(/__SUB_CLASH__/g, subClash);
  html = html.replace(/__SUB_SINGBOX__/g, subSingbox);
  html = html.replace(/__SUB_V2RAY__/g, subV2ray);
  html = html.replace(/__VOLUME_USED__/g, formatBytes(totalUsed));
  html = html.replace(/__VOLUME_LIMIT__/g, isUnlimited ? 'Unlimited' : formatBytes(volumeLimit));
  html = html.replace(/__VOLUME_PERCENT__/g, volumePercent.toFixed(1));
  html = html.replace(/__DAYS_REMAINING__/g, isNever ? '-1' : String(Math.max(0, daysLeft)));
  html = html.replace(/__EXPIRE_DATE__/g, isNever ? 'Never' : (user.expire_date ? new Date(user.expire_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Never'));
  html = html.replace(/__ACTIVE_CONNS__/g, String(activeConns));
  html = html.replace(/__CONN_LIMIT__/g, isConnUnlimited ? 'Unlimited' : String(connLimit));
  html = html.replace(/__STATUS__/g, status);
  html = html.replace(/__CONNECTIONS_JSON__/g, connectionsJSON);

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function handleSubscriptionData(token: string, env: Env, request: Request): Promise<Response> {
  const user = await dbOps.getUserByUUID(env.DB, token);
  if (!user) {
    return new Response('Not found', { status: 404 });
  }

  // Check if user is allowed
  const validation = await dbOps.validateUserAccess(env.DB, user.uuid);
  if (!validation.allowed) {
    return new Response('Subscription expired or disabled', { status: 403 });
  }

  const url = new URL(request.url);
  const format = url.searchParams.get('format') || '';
  const ua = request.headers.get('User-Agent') || '';
  const host = url.hostname;
  const isTLS = url.protocol === 'https:';
  const settings = await dbOps.getAllSettings(env.DB);
  const proto = settings.protocol || 'vless';
  const transport = settings.transport || 'ws';
  const path = settings.path || '/';
  const fingerprint = settings.fingerprint || 'chrome';
  const subName = settings.subName || 'Usf-Edge';

  // Auto-detect format from UA
  let outputFormat = format;
  if (!outputFormat) {
    const uaLower = ua.toLowerCase();
    if (uaLower.includes('clash') || uaLower.includes('mihomo') || uaLower.includes('meta')) outputFormat = 'clash';
    else if (uaLower.includes('sing-box') || uaLower.includes('sfm') || uaLower.includes('sfa')) outputFormat = 'singbox';
    else outputFormat = 'v2ray';
  }

  const wsPath = path.startsWith('/') ? path : `/${path}`;
  const port = 443;

  if (outputFormat === 'clash') {
    return generateClashConfig(user, host, port, proto, transport, wsPath, fingerprint, isTLS, subName);
  }
  if (outputFormat === 'singbox') {
    return generateSingboxConfig(user, host, port, proto, transport, wsPath, fingerprint, isTLS, subName);
  }

  // Default: V2Ray base64 links
  const link = generateVLESSLink(user, host, port, proto, transport, wsPath, fingerprint, isTLS, subName);
  const b64 = btoa(link);
  const traffic = await dbOps.getUserTraffic(env.DB, user.id);
  const totalUsed = user.volume_used || traffic.total;

  return new Response(b64, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${subName}.txt"`,
      'Subscription-Userinfo': `upload=${Math.floor(totalUsed/2)}; download=${Math.floor(totalUsed/2)}; total=${user.volume_limit > 0 ? user.volume_limit : 0}; expire=${user.expire_date ? new Date(user.expire_date).getTime()/1000 : 0}`,
      'Profile-Update-Interval': '6',
      'Profile-Title': subName,
    },
  });
}

function generateVLESSLink(user: any, host: string, port: number, proto: string, transport: string, path: string, fingerprint: string, isTLS: boolean, subName: string): string {
  if (proto === 'trojan') {
    const pass = user.uuid;
    const sni = host;
    let network = transport;
    if (transport === 'ws') network = 'ws';
    else if (transport === 'grpc') network = 'grpc';
    const params = new URLSearchParams({
      type: transport,
      security: 'tls',
      fingerprint: fingerprint,
      sni: sni,
      path: path,
    });
    if (transport === 'grpc') {
      params.set('serviceName', 'grpc');
      params.delete('path');
    }
    return `trojan://${pass}@${host}:${port}?${params.toString()}#${encodeURIComponent(subName + ' - ' + user.username)}`;
  }

  // VLESS
  const params = new URLSearchParams({
    type: transport,
    security: 'tls',
    fingerprint: fingerprint,
    sni: host,
    path: path,
  });
  if (transport === 'grpc') {
    params.set('serviceName', 'grpc');
    params.delete('path');
  }
  return `vless://${user.uuid}@${host}:${port}?${params.toString()}#${encodeURIComponent(subName + ' - ' + user.username)}`;
}

function generateClashConfig(user: any, host: string, port: number, proto: string, transport: string, path: string, fingerprint: string, isTLS: boolean, subName: string): Response {
  let proxyLines = [`- name: "${subName} - ${user.username}"`];

  if (proto === 'trojan') {
    proxyLines.push(`  type: trojan`);
    proxyLines.push(`  server: ${host}`);
    proxyLines.push(`  port: ${port}`);
    proxyLines.push(`  password: "${user.uuid}"`);
  } else {
    proxyLines.push(`  type: vless`);
    proxyLines.push(`  server: ${host}`);
    proxyLines.push(`  port: ${port}`);
    proxyLines.push(`  uuid: "${user.uuid}"`);
  }

  if (isTLS) {
    proxyLines.push(`  tls: true`);
    proxyLines.push(`  servername: ${host}`);
    proxyLines.push(`  client-fingerprint: ${fingerprint}`);
  }

  if (transport === 'ws') {
    proxyLines.push(`  network: ws`);
    proxyLines.push(`  ws-opts:`);
    proxyLines.push(`    path: ${path}`);
    proxyLines.push(`    headers:`);
    proxyLines.push(`      Host: ${host}`);
  } else if (transport === 'grpc') {
    proxyLines.push(`  network: grpc`);
    proxyLines.push(`  grpc-opts:`);
    proxyLines.push(`    grpc-service-name: grpc`);
  }

  const proxyConfig = proxyLines.join('\n');

  const config = `proxies:
${proxyConfig}
`;

  return new Response(config, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Content-Disposition': `attachment; filename="${subName}.yaml"`,
      'Subscription-Userinfo': `upload=0; download=0; total=${user.volume_limit > 0 ? user.volume_limit : 0}`,
    },
  });
}

function generateSingboxConfig(user: any, host: string, port: number, proto: string, transport: string, path: string, fingerprint: string, isTLS: boolean, subName: string): Response {
  let transportConfig = '';
  if (transport === 'ws') {
    transportConfig = `
      "transport": {
        "type": "ws",
        "path": "${path}",
        "headers": {
          "Host": "${host}"
        }
      }`;
  } else if (transport === 'grpc') {
    transportConfig = `
      "transport": {
        "type": "grpc",
        "service_name": "grpc"
      }`;
  }

  const tlsConfig = isTLS ? `
    "tls": {
      "enabled": true,
      "server_name": "${host}",
      "utls": {
        "enabled": true,
        "fingerprint": "${fingerprint}"
      }
    }` : '';

  let outbound = '';
  if (proto === 'trojan') {
    outbound = `{
      "type": "trojan",
      "tag": "${subName} - ${user.username}",
      "server": "${host}",
      "server_port": ${port},
      "password": "${user.uuid}"${tlsConfig}${transportConfig}
    }`;
  } else {
    outbound = `{
      "type": "vless",
      "tag": "${subName} - ${user.username}",
      "server": "${host}",
      "server_port": ${port},
      "uuid": "${user.uuid}"${tlsConfig}${transportConfig}
    }`;
  }

  const config = JSON.stringify({
    outbounds: [JSON.parse(outbound)]
  }, null, 2);

  return new Response(config, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="${subName}.json"`,
      'Subscription-Userinfo': `upload=0; download=0; total=${user.volume_limit > 0 ? user.volume_limit : 0}`,
    },
  });
}