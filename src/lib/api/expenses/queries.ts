"use server"

import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { expenses, ExpenseId } from "@/lib/db/schema/expenses"
import { getUserAuth } from "@/lib/auth/utils"

export const getExpenses = async () => {
  const exp = await db.select().from(expenses)
  return { expenses: exp }
}

export const getExpensesByUser = async () => {
  console.log(`>> GET EXPENSES BY USER: ${Date.now()}`)

  // Check user auth
  const { session } = await getUserAuth()
  if (!session) return { error: "Unauthorised" }

  const userExpenses = await db
    .select()
    .from(expenses)
    .where(eq(expenses.userId, session.user.id))
  return { expenses: userExpenses }
}

export const getExpenseById = async (id: ExpenseId) => {
  const [exp] = await db.select().from(expenses).where(eq(expenses.id, id))

  return { expense: exp }
}
