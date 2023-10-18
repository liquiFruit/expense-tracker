"use client"

import { useForm } from "react-hook-form"
import { insertExpenseSchema, NewExpense } from "@/lib/db/schema/expenses"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Category } from "@/lib/db/schema/categories"
import { CategoryComboBox } from "./categories-combo-box"

const formSchema = insertExpenseSchema

type ExpenseCrudFormProps = {
  categories: Category[]
}

export function ExpenseCrudForm(props: ExpenseCrudFormProps) {
  const form = useForm<NewExpense>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      price: 0,
    },
  })

  function onSubmit(values: NewExpense) {
    console.table(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border p-4 shadow-lg"
      >
        <h2 className="text-xl font-bold">New Expense</h2>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Input placeholder="Drinks with Mat" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price in Rands</FormLabel>

              <FormControl>
                <Input
                  placeholder="R100,50"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <FormControl>
                <CategoryComboBox
                  categories={props.categories}
                  categoryId={field.value}
                  setCategoryId={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Create new expense
        </Button>
      </form>
    </Form>
  )
}
