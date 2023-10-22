import { getExpensesByUser } from "@/lib/api/expenses/queries"
import { useQuery } from "@tanstack/react-query"

export const useExpenses = () =>
  useQuery({
    queryKey: ["expenses"],
    queryFn: getExpensesByUser,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
