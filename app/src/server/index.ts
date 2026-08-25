import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createContext } from './context';
import { appRouter } from './routers/_app';

const app = new Hono();

app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// tRPC handler
app.use('/api/trpc/*', async (c) => {
  const path = c.req.url.split('/api/trpc/')[1]?.split('?')[0] || '';
  const ctx = await createContext(c);

  const body = c.req.method !== 'GET' ? await c.req.json().catch(() => ({})) : undefined;

  const result = await appRouter.createCaller(ctx)[path as keyof typeof appRouter] as unknown as { _def: { router: unknown } };

  if (!result) {
    return c.json({ error: { message: 'Not found' } }, 404);
  }

  return c.json(result);
});

// Simple JSON endpoints for auth and contact
app.post('/api/auth/register', async (c) => {
  const body = await c.req.json();
  const caller = appRouter.createCaller(await createContext(c));
  const result = await caller.auth.register(body);
  return c.json(result);
});

app.post('/api/auth/login', async (c) => {
  const body = await c.req.json();
  const caller = appRouter.createCaller(await createContext(c));
  const result = await caller.auth.login(body);
  return c.json(result);
});

app.get('/api/auth/me', async (c) => {
  const caller = appRouter.createCaller(await createContext(c));
  const result = await caller.auth.me();
  return c.json(result);
});

app.post('/api/contact/submit', async (c) => {
  const body = await c.req.json();
  const caller = appRouter.createCaller(await createContext(c));
  const result = await caller.contact.submit(body);
  return c.json(result);
});

app.get('/api/contact/list', async (c) => {
  const caller = appRouter.createCaller(await createContext(c));
  const result = await caller.contact.list();
  return c.json(result);
});

app.get('/api/auth/listUsers', async (c) => {
  const caller = appRouter.createCaller(await createContext(c));
  const result = await caller.auth.listUsers();
  return c.json(result);
});

export default app;
