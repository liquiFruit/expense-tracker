"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { isFuture } from "date-fns"

import { insertExpenseSchema, NewExpense } from "@/lib/db/schema/expenses"
import { Category } from "@/lib/db/schema/categories"
import { createExpense } from "@/lib/api/expenses/mutations"
import { cn } from "@/lib/utils"
import { useExpenses } from "@/lib/hooks/queries"
import { useSetExpenses } from "@/lib/hooks/util"

import { ComboBox } from "@/components/ui/combo-box"
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
import { LoadingIcon } from "@/components/icons"

type ExpenseCrudFormProps = {
  categories: Category[]
}

const getInitialState = () => ({
  categoryId: -1,
  description: "",
  price: 0,
  date: new Date(),
})

export function ExpenseCrudForm(props: ExpenseCrudFormProps) {
  const { status, mutateAsync } = useMutation({
    mutationKey: ["expenses-crud"],
    mutationFn: createExpense,
  })
  const { data } = useExpenses()

  const form = useForm<NewExpense>({
    resolver: zodResolver(insertExpenseSchema),
    defaultValues: getInitialState(),
  })

  const { setExpenses } = useSetExpenses()

  async function onSubmit(newExpense: NewExpense) {
    if (status === "pending") return

    const originalExpenses = data?.expenses ?? []
    setExpenses(
      originalExpenses.concat([
        {
          ...newExpense,
          userId: "optimistic",
          date: newExpense.date ?? new Date(),
          id: -1,
        },
      ])
    )

    const { error, expense } = await mutateAsync(newExpense)

    if (error || !expense) {
      toast({ title: "An error occured!", description: error })
      setExpenses(originalExpenses)
    } else {
      form.reset(getInitialState())

      toast({
        title: "Success!",
        description: "Successfully created your expense.",
        className: "bg-primary text-white",
      })

      setExpenses(originalExpenses.concat([expense]))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 rounded-lg border p-4 shadow-lg"
      >
        <div className="flex flex-row items-center justify-between">
          <h2>New Expense</h2>

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    date={field.value}
                    setDate={(date) =>
                      !date || !isFuture(date)
                        ? field.onChange(date)
                        : field.onChange(new Date())
                    }
                  />
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
                <ComboBox
                  className={cn(error && "border-destructive")}
                  items={props.categories}
                  itemId={field.value}
                  setItemId={field.onChange}
                  getLabel={(item) => item.description}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {status === "pending" ? (
            <LoadingIcon className="mr-2 text-background" />
          ) : null}
          Create new expense
        </Button>
      </form>
    </Form>
  )
}
