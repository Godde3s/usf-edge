import { Env } from './types';
import { bytesToUUID } from './utils';
import { validateUserAccess, addActiveConnection, removeActiveConnection, addUserTraffic } from './db';

interface StreamCtx {
  env: Env;
  userId: number;
  connId: number;
  upBytes: number;
  downBytes: number;
  ws: WebSocket;
}

async function handleVLESSStream(ws: WebSocket, env: Env, clientIP: string, ua: string): Promise<void> {
  let ctx: StreamCtx | null = null;
  try {
    const firstMessage = await new Promise<Uint8Array>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Timeout')), 15000);
      ws.addEventListener('message', (event: MessageEvent) => {
        clearTimeout(timeout);
        const data = event.data instanceof ArrayBuffer ? new Uint8Array(event.data) : new TextEncoder().encode(event.data as string);
        resolve(data);
      }, { once: true });
      ws.addEventListener('close', () => { clearTimeout(timeout); reject(new Error('closed')); }, { once: true });
    });

    if (firstMessage.length < 50) { ws.close(1002, 'Bad header'); return; }

    let offset = 0;
    offset++; // version
    const uuidStr = bytesToUUID(firstMessage.slice(offset, offset + 16));
    offset += 16;

    const validation = await validateUserAccess(env.DB, uuidStr);
    if (!validation.allowed) { ws.close(1002, validation.reason); return; }

    const user = validation.user;
    const connId = await addActiveConnection(env.DB, user.id, clientIP, ua);

    ctx = { env, userId: user.id, connId, upBytes: 0, downBytes: 0, ws };

    const addLen = firstMessage[offset++];
    offset += addLen;
    offset++; // command

    // Parse destination
    const destType = firstMessage[offset++];
    let destAddr: string;
    let destPort: number;

    if (destType === 1) {
      destAddr = `${firstMessage[offset]}.${firstMessage[offset+1]}.${firstMessage[offset+2]}.${firstMessage[offset+3]}`;
      offset += 4;
    } else if (destType === 2) {
      const len = firstMessage[offset++];
      destAddr = new TextDecoder().decode(firstMessage.slice(offset, offset + len));
      offset += len;
    } else if (destType === 3) {
      const parts: string[] = [];
      for (let i = 0; i < 8; i++) parts.push(((firstMessage[offset+i*2]<<8)|firstMessage[offset+i*2+1]).toString(16));
      destAddr = parts.join(':');
      offset += 16;
    } else {
      ws.close(1002, 'Bad addr'); return;
    }
    destPort = (firstMessage[offset] << 8) | firstMessage[offset+1];
    offset += 2;

    const remaining = firstMessage.slice(offset);
    const tcpConn = connect({ hostname: destAddr, port: destPort });
    const writer = tcpConn.writable.getWriter();
    const reader = tcpConn.readable.getReader();

    if (remaining.length > 0) {
      ctx.upBytes += remaining.length;
      await writer.write(remaining);
    }

    ws.addEventListener('message', async (ev: MessageEvent) => {
      try {
        const d = ev.data instanceof ArrayBuffer ? new Uint8Array(ev.data) : new TextEncoder().encode(ev.data as string);
        ctx!.upBytes += d.byteLength;
        await writer.write(d);
      } catch (e) { try { ws.close(); } catch (ex) {} }
    });

    const cleanup = async () => {
      try { writer.close(); reader.cancel(); } catch (e) {}
      if (ctx) {
        await addUserTraffic(env.DB, ctx.userId, ctx.upBytes, ctx.downBytes).catch(() => {});
        await removeActiveConnection(env.DB, ctx.connId).catch(() => {});
      }
    };

    ws.addEventListener('close', cleanup);
    ws.addEventListener('error', cleanup);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      ctx.downBytes += value.byteLength;
      try { ws.send(value); } catch (e) { break; }
    }
    ws.close();
    await cleanup();
  } catch (e) {
    try { ws.close(); } catch (ex) {}
    if (ctx) {
      await addUserTraffic(env.DB, ctx.userId, ctx.upBytes, ctx.downBytes).catch(() => {});
      await removeActiveConnection(env.DB, ctx.connId).catch(() => {});
    }
  }
}

export async function handleTunnel(request: Request, env: Env): Promise<Response | null> {
  if (request.headers.get('Upgrade') !== 'websocket') return null;

  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
  const ua = request.headers.get('User-Agent') || '';

  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  server.accept();

  handleVLESSStream(server, env, clientIP, ua);

  return new Response(null, { status: 101, webSocket: client });
}