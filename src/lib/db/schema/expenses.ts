import { relations } from "drizzle-orm"
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

import { users } from "./auth"
import { categories } from "./categories"

export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),

  description: text("description").notNull(),
  price: real("price").notNull(),
  date: integer("date", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const expensesRelations = relations(expenses, ({ one, many }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),

  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}))

// Schema for CRUD - used to validate API requests
export const insertExpenseSchema = createInsertSchema(expenses)
  .extend({
    description: z
      .string({ required_error: "Required" })
      .nonempty({ message: "Required" }),
    price: z
      .number({
        invalid_type_error:
          "Price must be a number, with a comma as the decimal separator",
      })
      .positive({ message: "Price must be greater than R0" }),
    categoryId: z.number({ invalid_type_error: "Required" }),
  })
  .omit({
    userId: true,
  })
export const selectExpenseSchema = createSelectSchema(expenses)
export const expenseIdSchema = selectExpenseSchema.pick({ id: true })
export const updateExpenseSchema = selectExpenseSchema

export type Expense = z.infer<typeof selectExpenseSchema>
export type NewExpense = z.infer<typeof insertExpenseSchema>
export type ExpenseId = z.infer<typeof expenseIdSchema>["id"]
