"use server"

import { db } from "@/lib/db"
import { categories } from "@/lib/db/schema/categories"

export async function getAllCategories() {
  return await db.select().from(categories)
}
