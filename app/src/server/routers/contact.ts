import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { desc } from 'drizzle-orm';
import { router, publicProcedure } from './_app';
import { db } from '../db';
import { contacts } from '../schema';

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        subject: z.string(),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      const result = db.insert(contacts).values(input).returning().get();
      return { success: true, id: result.id };
    }),

  list: publicProcedure.query(({ ctx }) => {
    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin only' });
    }
    return db.select().from(contacts).orderBy(desc(contacts.createdAt)).all();
  }),
});
