import { checkAuth } from "@/lib/auth/utils"
import { getExpensesByUser } from "@/lib/api/expenses/queries"
import { ZustandInitializer } from "@/components/zustand/initialiser"
import { ZustandErrorHandler } from "@/components/zustand/error-handler"

export async function ZustandDataFetcher() {
  checkAuth()

  const { error, expenses } = await getExpensesByUser()
  if (error || !expenses) return <ZustandErrorHandler error={error} />

  return <ZustandInitializer expenseStoreData={expenses ?? []} />
}
