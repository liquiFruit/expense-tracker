"use client"

import type { Expense } from "@/lib/db/schema/expenses"
import { useExpenseStore } from "@/lib/stores/expenseStore"
import { humanDate } from "@/lib/utils"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function ExpenseList(props: { expenses: Expense[] }) {
  const resetExpenses = useExpenseStore((state) => state.resetExpenses)

  resetExpenses(props.expenses)

  return (
    <section className="my-4 mb-96">
      <Collapsible>
        <CollapsibleTrigger>
          <h2 className="mb-2">My Expenses</h2>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {!props.expenses ? (
            <p className="text-center">An error occured!</p>
          ) : props.expenses.length === 0 ? (
            <p className="text-center">No expenses yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {props.expenses.map((exp, i) => (
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
          )}
        </CollapsibleContent>
      </Collapsible>
    </section>
  )
}
