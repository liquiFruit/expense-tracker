import { create } from "zustand"
import type { Expense } from "../db/schema/expenses"

interface ExpenseState {
  expenses: Map<Expense["id"], Expense>
  updateExpense: (id: Expense["id"], exp: Expense) => void
  resetExpenses: (exps: Expense[]) => void
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: new Map(),
  updateExpense(id, exp) {
    set((state) => {
      state.expenses.set(id, exp)
      return { expenses: new Map(state.expenses) }
    })
  },
  resetExpenses(newExpenses) {
    set((state) => {
      return {
        expenses: new Map(newExpenses.map((exp) => [exp.id, exp])),
      }
    })
  },
  // ?  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}))
