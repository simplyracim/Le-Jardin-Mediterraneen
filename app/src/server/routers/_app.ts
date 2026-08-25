import { initTRPC } from '@trpc/server';
import type { Context } from '../context';
import { authRouter } from './auth';
import { contactRouter } from './contact';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  auth: authRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
