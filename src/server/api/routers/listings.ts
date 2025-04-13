import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, price } = input;
      await ctx.db.listing.create({
        data: {
          userId: ctx.userId,
          name: name,
          description: description,
          price: price,
        },
      });
    }),
});
