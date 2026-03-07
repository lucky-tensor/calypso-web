import { Context, Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Calypso Server Implementation
 * 
 * This server uses Hono for routing and Bun's native APIs for efficiency.
 * It strictly adheres to the Calypso Blueprint by serving both API endpoints
 * and the static frontend bundle.
 */
const app = new Hono();

// Root API endpoint for basic visibility
app.get('/api', (c: Context) => c.text('Calypso Server API - Active'));

/**
 * Health check endpoint for monitoring and CI/CD validation.
 */
app.get('/health', (c: Context) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

/**
 * Wizard generation endpoint (STUB)
 * This will eventually handle the PRD generation logic.
 */
app.post('/api/wizard/generate', async (c: Context) => {

  return c.json({
    status: 'pending',
    message: 'Wizard logic is currently being implemented via the agent-bridge.'
  });
});

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

