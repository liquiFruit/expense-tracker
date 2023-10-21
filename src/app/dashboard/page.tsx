import { getExpensesByUser } from "@/lib/api/expenses/queries"

import { Chart } from "@/components/chart"
import { ExpenseCrud } from "@/components/expense-crud"
import { ExpenseList } from "@/components/expense-list"

export default async function DashboardPage() {
  const initialExpenses = await getExpensesByUser()
  return (
    <main>
      <Chart />

      <ExpenseCrud />

      <ExpenseList initialExpenses={initialExpenses} />
    </main>
  )
}
