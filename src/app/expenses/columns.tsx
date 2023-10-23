"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontalIcon, Trash2Icon, type LucideIcon } from "lucide-react"

import { humanDate } from "@/lib/utils"
import type { Expense } from "@/lib/db/schema/expenses"
import { useDeleteExpense } from "@/lib/hooks/mutations"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

export const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "description",

    header: () => <p className="text-md font-bold">Expense</p>,

    cell: ({ row: { original: expense } }) => (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg">{expense.description}</p>

          <p className="text-sm text-muted-foreground">
            {humanDate(expense.date)}
          </p>
        </div>

        <p className="self-end text-lg font-bold">
          R{expense.price.toFixed(2)}
        </p>
      </div>
    ),
  },

  {
    id: "actions",
    accessorFn: (expense) => expense,
    header: "",
    cell: ({ row: { original: expense } }) => <ActionMenu expense={expense} />,
  },
]

function ActionMenu({ expense }: { expense: Expense }) {
  const mutation = useDeleteExpense(expense)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full justify-center">
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => mutation.mutateAsync()}>
          <Trash2Icon className="mr-2 text-destructive" size={20} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
