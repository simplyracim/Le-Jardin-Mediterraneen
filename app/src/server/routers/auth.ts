import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { hash, compare } from 'bcryptjs';
import { SignJWT } from 'jose';
import { eq } from 'drizzle-orm';
import { router, publicProcedure } from './_app';
import { db } from '../db';
import { users } from '../schema';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'le-jardin-secret-key-2026');

async function createToken(user: { id: number; username: string; email: string; role: string }) {
  return new SignJWT({ id: user.id, username: user.username, email: user.email, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const existing = db.select().from(users).where(eq(users.email, input.email)).get();
      if (existing) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Email already registered' });
      }
      const existingUsername = db.select().from(users).where(eq(users.username, input.username)).get();
      if (existingUsername) {
        throw new TRPCError({ code: 'CONFLICT', message: 'Username already taken' });
      }

      const passwordHash = await hash(input.password, 12);
      const result = db
        .insert(users)
        .values({
          username: input.username,
          email: input.email,
          passwordHash,
        })
        .returning()
        .get();

      const token = await createToken(result);
      return { token, user: { id: result.id, username: result.username, email: result.email, role: result.role } };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = db.select().from(users).where(eq(users.email, input.email)).get();
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
      }

      const valid = await compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid email or password' });
      }

      const token = await createToken(user);
      return { token, user: { id: user.id, username: user.username, email: user.email, role: user.role } };
    }),

  me: publicProcedure.query(({ ctx }) => {
    if (!ctx.user) return null;
    return {
      id: ctx.user.id,
      username: ctx.user.username,
      email: ctx.user.email,
      role: ctx.user.role,
      isAdmin: ctx.user.role === 'admin',
    };
  }),

  listUsers: publicProcedure.query(({ ctx }) => {
    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin only' });
    }
    return db.select({ id: users.id, username: users.username, email: users.email, role: users.role }).from(users).all();
  }),
});
