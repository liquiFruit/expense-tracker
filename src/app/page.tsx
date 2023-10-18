import { Chart } from "@/components/chart"
import { CreateExpenseForm } from "@/components/create-expense-form"

export default async function Home() {
  return (
    <main>
      <Chart />

      <CreateExpenseForm />
    </main>
  )
}
