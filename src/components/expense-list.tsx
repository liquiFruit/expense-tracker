"use client"

import { getExpensesByUser } from "@/lib/api/expenses/queries"
import { humanDate } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useExpenses } from "@/lib/hooks/queries"

export function ExpenseList({
  initialExpenses,
}: {
  initialExpenses?: Awaited<ReturnType<typeof getExpensesByUser>>
}) {
  const query = useExpenses()

  return (
    <section className="my-4 mb-96">
      <Collapsible>
        <CollapsibleTrigger>
          <h2 className="mb-2">My Expenses</h2>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {query.error || !query.data || !query.data.expenses ? (
            <p className="text-center">An error occured, check console</p>
          ) : query.data.expenses.length === 0 ? (
            <p className="text-center">No expenses yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {query.data.expenses
                .sort(
                  (first, second) =>
                    first.date.getMilliseconds() - second.date.getMilliseconds()
                )
                .map((exp) => (
                  <div
                    key={exp.id}
                    className="flex items-center justify-between space-x-4 rounded-md border p-4"
                  >
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
          )}
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}
