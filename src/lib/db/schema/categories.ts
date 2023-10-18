import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { z } from "zod"

import { expenses } from "./expenses"

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  description: text("description").notNull(),
})

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  expenses: many(expenses),
}))

// Schema for CRUD - used to validate API requests
export const insertCategorieschema = createInsertSchema(categories)
export const selectCategorieschema = createSelectSchema(categories)
export const categoryIdSchema = selectCategorieschema.pick({ id: true })
export const updateCategorieschema = selectCategorieschema

export type Category = z.infer<typeof selectCategorieschema>
export type NewCategory = z.infer<typeof insertCategorieschema>
export type CategoryId = z.infer<typeof categoryIdSchema>["id"]
