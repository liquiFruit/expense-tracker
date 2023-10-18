import { Chart } from "@/components/chart"
import { ExpenseCrud } from "@/components/expense-crud"
import { getExpensesByUser } from "@/lib/api/expenses/queries"
import { humanDate } from "@/lib/utils"

export default async function Home() {
  const { error, expenses } = await getExpensesByUser()
  return (
    <main>
      <Chart />

      <ExpenseCrud />

      <section className="my-4">
        {error || !expenses ? (
          <p className="text-center">An error occured: &apos;{error}&apos;</p>
        ) : expenses.length === 0 ? (
          <p className="text-center">No expenses yet.</p>
        ) : (
          <>
            <h2>My Expenses</h2>
            <div className="mt-2 flex flex-col gap-4">
              {expenses.map((exp, i) => (
                <div className="flex items-center justify-between space-x-4 rounded-md border p-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-medium">
                      {exp.description}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      {humanDate(exp.date)}
                    </span>
                  </div>

                  <span className="font-bold">R{exp.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
