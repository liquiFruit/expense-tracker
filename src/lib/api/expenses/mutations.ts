"use server"

import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import {
  NewExpense,
  insertExpenseSchema,
  expenses,
  ExpenseId,
} from "@/lib/db/schema/expenses"
import { getUserAuth } from "@/lib/auth/utils"

export const createExpense = async (expense: NewExpense) => {
  // Parse
  const { success: isValidExpense } = insertExpenseSchema.safeParse(expense)
  if (!isValidExpense) return { error: "Bad request" }

  // Get userId
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorized" }

  // Try create new expense
  try {
    const [exp] = await db
      .insert(expenses)
      .values({ ...expense, userId: session.user.id })
      .returning()
    return { expense: exp }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    return { error: message }
  }
}

export const updateExpense = async (id: ExpenseId, expense: NewExpense) => {
  // Parse input
  const { success: isValidExpense } = insertExpenseSchema.safeParse(expense)
  if (!isValidExpense) return { error: "Bad request" }

  // Try update expense
  try {
    const [exp] = await db
      .update(expenses)
      .set(expense)
      .where(eq(expenses.id, id))
      .returning()
    return { expense: exp }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    return { error: message }
  }
}

export const deleteExpense = async (id: ExpenseId) => {
  // Check if user is authed
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorized" }

  // Check user owns the expense
  const res = await db.query.expenses.findFirst({
    where(exp, { eq }) {
      return eq(exp.userId, session.user.id)
    },
  })

  if (!res) return { error: "You are not authorised to mutate this expense" }

  // Try delete expense
  try {
    const [exp] = await db
      .delete(expenses)
      .where(eq(expenses.id, id))
      .returning()
    return { expense: exp }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    return { error: message }
  }
}
