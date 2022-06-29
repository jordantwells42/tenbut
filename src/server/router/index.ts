// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./rating";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("rating.", exampleRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
