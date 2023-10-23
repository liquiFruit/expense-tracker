"use client"

import { ColumnDef } from "@tanstack/react-table"

import type { Expense } from "@/lib/db/schema/expenses"
import { humanDate } from "@/lib/utils"

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "description",
    header: () => <p className="text-md font-bold">Expense</p>,
    cell: ({ row: { original: expense } }) => (
      <div className="flex flex-row items-center justify-between">
        <p className="text-lg">{expense.description}</p>

        <div className="flex flex-col items-end gap-1">
          <p className="text-sm text-muted-foreground">
            {humanDate(expense.date)}
          </p>

          <p className="self-end text-lg font-bold">
            R{expense.price.toFixed(2)}
          </p>
        </div>
      </div>
    ),
  },
]
