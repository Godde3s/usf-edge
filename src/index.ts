import { Env } from './types';
import { adminHTML } from './html/admin';
import { getFakePageHTML } from './html/fake';
import { handleAdminAPI } from './admin-api';
import { handleSubscriptionPage, handleSubscriptionData } from './sub';
import { getSetting } from './db';
import { handleTunnel } from './tunnel';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);

      let adminPath = 'usf-admin';
      let subPath = 's';
      try {
        const ap = await getSetting(env.DB, 'admin_path');
        if (ap) adminPath = ap;
        const sp = await getSetting(env.DB, 'sub_path');
        if (sp) subPath = sp;
      } catch (e) {}

      const pathname = url.pathname;

      // WebSocket tunneling
      if (request.headers.get('Upgrade') === 'websocket') {
        return handleTunnel(request, env);
      }

      // Admin panel
      if (pathname === `/${adminPath}` || pathname === `/${adminPath}/`) {
        const html = adminHTML.replace(/__ADMIN_API__/g, `/${adminPath}`);
        return new Response(html, {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }

      // Admin API
      if (pathname.startsWith(`/${adminPath}/api/`)) {
        const apiPath = pathname.slice(`/${adminPath}`.length);
        return handleAdminAPI(request, env, apiPath);
      }

      // Subscription page or data
      const subRegex = new RegExp(`^/${subPath}/([a-f0-9-]{36})$`);
      const subMatch = pathname.match(subRegex);
      if (subMatch) {
        if (url.searchParams.has('format')) {
          return handleSubscriptionData(subMatch[1], env, request);
        }
        return handleSubscriptionPage(subMatch[1], env, request);
      }

      // Version
      if (pathname === '/version') {
        return new Response(JSON.stringify({ name: 'Usf-Edge', version: '1.0.0' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Stealth fake page
      return new Response(getFakePageHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message || 'Internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};