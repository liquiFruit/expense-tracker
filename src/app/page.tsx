import { Chart } from "@/components/chart"
import { getExpensesByUser } from "@/lib/api/expenses/queries"

export default async function Home() {
  const { error: getUserExpensesError, expenses } = await getExpensesByUser()

  if (getUserExpensesError) return <div>Error: {getUserExpensesError}</div>

  return (
    <main>
      <Chart />

      <h2>Expenses</h2>
      {expenses!.map((exp) => (
        <div key={exp.id}>
          {exp.description}: R{exp.price.toFixed(2)}
        </div>
      ))}
    </main>
  )
}
