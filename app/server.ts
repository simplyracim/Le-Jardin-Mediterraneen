import { serve } from '@hono/node-server';
import app from './src/server/index';

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server running on port ${port}`);
