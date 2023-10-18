import { Chart } from "@/components/chart"
import { ExpenseCrud } from "@/components/expense-crud"

export default async function Home() {
  return (
    <main>
      <Chart />

      <ExpenseCrud />
    </main>
  )
}
