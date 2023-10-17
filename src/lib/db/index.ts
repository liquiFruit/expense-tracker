import { drizzle } from "drizzle-orm/better-sqlite3"
import Database from "better-sqlite3"
import { env } from "../env.mjs"

import * as AuthSchema from "@/lib/db/schema/auth"
import * as ComputerSchema from "@/lib/db/schema/computers"

export const sqlite = new Database(env.DATABASE_URL)
export const db = drizzle(sqlite, {
  schema: {
    ...AuthSchema,
    ...ComputerSchema,
  },
})
