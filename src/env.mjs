import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NOTION_SECRET: z.string(),
    DATABASE_ID: z.string(),
  },
  runtimeEnv: {
    NOTION_SECRET: process.env.NOTION_SECRET,
    DATABASE_ID: process.env.DATABASE_ID,
  },
});
