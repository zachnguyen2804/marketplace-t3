import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messagesRouter = createTRPCRouter({
  getMessage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const listing = await ctx.db.listing.findMany({
      where: {
        userId,
      },
      include: {
        message: true,
      },
    });
    return listing.flatMap((item) => item.message);
  }),
  sendMessage: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        listingId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.db.message.create({
        data: {
          fromUser: ctx.userId,
          fromUserName: "hello",
          listingId: input.listingId,
          message: input.message,
        },
      });
    }),
});
