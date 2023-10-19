"use client"

import { ExpenseStoreState, useExpenseStore } from "@/lib/stores/expenseStore"
import { useRef } from "react"

export function ZustandInitializer({
  expenseStoreData,
}: {
  expenseStoreData: NonNullable<
    ReturnType<ExpenseStoreState["expenses"]["get"]>
  >[]
}) {
  const initialised = useRef(false)
  const resetExpenseStore = useExpenseStore((store) => store.resetExpenses)

  if (!initialised.current) {
    resetExpenseStore(expenseStoreData)
    initialised.current = true
  }

  return null
}
