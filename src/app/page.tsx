import { Chart } from "@/components/chart"
import { ExpenseCrud } from "@/components/expense/crud"
import { ExpenseList } from "@/components/expense/list"

import { getExpensesByUser } from "@/lib/api/expenses/queries"

export default async function Home() {
  const { error, expenses } = await getExpensesByUser()

  return (
    <main>
      <Chart />

      <ExpenseCrud />

      <ExpenseList expenses={expenses ?? []} />
    </main>
  )
}
