"use client"

import type { Expense } from "@/lib/db/schema/expenses"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useExpenses } from "@/lib/hooks/queries"

export default function ExpensesPage() {
  const query = useExpenses()

  if (query.error || query.data?.error) return "An error occured"

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={query.data?.expenses ?? []} />
    </div>
  )
}
