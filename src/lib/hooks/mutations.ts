import { useMutation } from "@tanstack/react-query"
import { deleteExpense } from "../api/expenses/mutations"
import { toast } from "@/components/ui/use-toast"
import { Expense } from "../db/schema/expenses"
import { useExpenses } from "./queries"

export const useDeleteExpense = (expense: Expense) => {
  const { refetch } = useExpenses()

  return useMutation({
    mutationKey: [["expenses"]],

    mutationFn: async () => await deleteExpense(expense.id),

    onSuccess: ({ error, expense }) => {
      if (error)
        toast({
          title: "An error occured",
          description: `Could not delete this expense: "${error}"`,
          className: "bg-destructive text-white",
        })
      else {
        refetch()
        toast({
          title: "Success!",
          description: `Deleted your expense "${expense?.description}`,
          className: "bg-primary text-white",
        })
      }
    },
  })
}
