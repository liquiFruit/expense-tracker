import { Chart } from "@/components/chart"
import { ExpenseCrud } from "@/components/expense-crud"
import { ExpenseList } from "@/components/expense-list"

export default function DashboardPage() {
  return (
    <main>
      <Chart />

      <ExpenseCrud />

      <ExpenseList />
    </main>
  )
}
