"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { insertExpenseSchema, NewExpense } from "@/lib/db/schema/expenses"
import { Category } from "@/lib/db/schema/categories"
import { createExpense } from "@/lib/api/expenses/mutations"
import { cn } from "@/lib/utils"

import { CategoryComboBox } from "@/components/expense-crud/categories-combo-box"
import { DatePicker } from "@/components/date-picker"
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
import { toast } from "@/components/ui/use-toast"

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
      date: new Date(),
    },
  })

  async function onSubmit(newExpense: NewExpense) {
    const { error } = await createExpense(newExpense)

    if (error) {
      toast({ title: "An error occured!", description: error })
    } else {
      form.reset()

      toast({
        title: "Success!",
        description: "Successfully created your expense.",
        className: "bg-primary text-white",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border p-4 shadow-lg"
      >
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold">New Expense</h2>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker date={field.value} setDate={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Input
                  className={cn(error && "border-destructive")}
                  placeholder="Drinks with Mat"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Price in Rands</FormLabel>

              <FormControl>
                <Input
                  className={cn(error && "border-destructive")}
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
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <FormControl>
                <CategoryComboBox
                  className={cn(error && "border-destructive")}
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
