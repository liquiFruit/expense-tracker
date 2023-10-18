import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { expenses, ExpenseId } from "@/lib/db/schema/expenses"

export const getExpenses = async () => {
  const exp = await db.select().from(expenses)
  return { expenses: exp }
}

export const getExpenseById = async (id: ExpenseId) => {
  const [exp] = await db.select().from(expenses).where(eq(expenses.id, id))

  return { expense: exp }
}
