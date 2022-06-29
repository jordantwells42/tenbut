import { createRouter } from "./context";
import { z } from "zod";
import { prisma } from "../db/client";


export const exampleRouter = createRouter()
  .query("get-ratings", {
    async resolve({ ctx }) {
      // @ts-ignore
      return await ctx.prisma.rating.groupBy({
        by: ["caveat"],
        _avg : {
          delta: true
        }
        
      });
    },
  }).mutation("cast-rating", {
    input: z.object({
      caveat: z.string().nullish(),
      rating: z.number().nullish(),
      initialRating: z.number().nullish(),
      delta: z.number().nullish(),
    }), 
    async resolve({input, ctx}) {
      // @ts-ignore
      const rating = await ctx.prisma.rating.create({
        data: {
          ...input
        }

      })
      

      return {success: true, rating: rating}
    }
  })
