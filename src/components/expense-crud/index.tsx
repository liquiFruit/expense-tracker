import { getAllCategories } from "@/lib/api/categories/queries"
import { ExpenseCrudForm } from "./crud-form"

export async function ExpenseCrud() {
  const categories = await getAllCategories()

  return <ExpenseCrudForm categories={categories} />
}
