import { useQueryClient } from "@tanstack/react-query"
import type { Expense } from "@/lib/db/schema/expenses"

export const useSetExpenses = () => {
  const queryClient = useQueryClient()

  return {
    setExpenses: (expenses: Expense[]) => {
      queryClient.setQueryData(["expenses"], {
        expenses,
      })
    },
  }
}
