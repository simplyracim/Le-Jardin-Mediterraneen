import type { Context as HonoContext } from 'hono';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'le-jardin-secret-key-2026');

export interface Context {
  user: { id: number; username: string; email: string; role: string } | null;
}

export async function createContext(c: HonoContext): Promise<Context> {
  const authHeader = c.req.header('authorization');
  const token = authHeader?.replace('Bearer ', '') || c.req.query('token');

  if (!token) {
    return { user: null };
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return {
      user: {
        id: payload.id as number,
        username: payload.username as string,
        email: payload.email as string,
        role: payload.role as string,
      },
    };
  } catch {
    return { user: null };
  }
}
