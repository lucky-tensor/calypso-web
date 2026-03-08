import { Hono, Context } from 'hono';
import { serveStatic } from 'hono/bun';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { AuthService } from './auth';
import { PrdDb } from './db';
import { PRDSchema } from '@calypso/core';
import { AgentBridge } from './agent';

type Env = {
  Variables: {
    userId: string;
  };
};

const app = new Hono<Env>();

// --- API Layer ---

/**
 * Session Persistence Endpoints
 */
app.post('/api/session', AuthService.middleware, async (c) => {
  const data = await c.req.json() as PRDSchema;
  const userId = c.get('userId');

  PrdDb.saveSession(userId, data);
  return c.json({ success: true, updatedAt: new Date().toISOString() });
});

app.get('/api/session', AuthService.middleware, async (c) => {
  const userId = c.get('userId');
  const session = PrdDb.getSession(userId);

  if (!session) return c.json({ error: 'Session not found' }, 404);
  return c.json(session);
});

// Auth bootstrapping (Proto-only simple login)
app.post('/api/auth/login', async (c) => {
  const { userId } = await c.req.json();
  const token = await AuthService.generateToken(userId);
  return c.json({ token });
});

/**
 * Wizard generation endpoint
 * Triggers the Claude CLI to generate the final prd.md.
 */
app.post('/api/wizard/generate', AuthService.middleware, async (c) => {
  const userId = c.get('userId');
  const session = PrdDb.getSession(userId);

  if (!session) return c.json({ error: 'Session not found' }, 404);

  try {
    const prdContent = await AgentBridge.generatePRD(session);
    return c.json({
      status: 'complete',
      content: prdContent
    });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

/**
 * Health check endpoint for monitoring and CI/CD validation.
 */
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

/**
 * API 404 Handler
 * Protects API namespace from SPA fallback.
 */
app.all('/api/*', (c) => c.json({ error: 'API route not found' }, 404));

/**
 * Static Asset Serving & SPA Routing
 * 
 * We serve static assets from the ../web/dist directory (built React app).
 * If a request doesn't match an API endpoint or a static file, we fall back
 * to index.html to support client-side routing.
 */

// Serve static files from the built web app
app.use('/*', serveStatic({ root: '../web/dist' }));

// SPA Fallback: Serve index.html for all other routes
app.get('*', async (c: Context) => {
  try {
    const indexPath = path.resolve('../web/dist/index.html');
    const indexContent = await readFile(indexPath, 'utf-8');
    return c.html(indexContent);
  } catch (e) {
    return c.text('Static assets not found. Please run `bun run build` in the web package.', 404);
  }
});

/**
 * Server Configuration
 * Port 31415 is mandated by the Calypso Blueprint.
 */
export default {
  port: 31415,
  fetch: app.fetch,
};
