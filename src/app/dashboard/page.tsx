import { ExpenseList } from "@/components/expense-list"
import { getExpensesByUser } from "@/lib/api/expenses/queries"

export default async function DashboardPage() {
  const initialData = await getExpensesByUser()
  return (
    <>
      <ExpenseList initialExpenses={initialData} />
      <ExpenseList initialExpenses={initialData} />
    </>
  )
}
