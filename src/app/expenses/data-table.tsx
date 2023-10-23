"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface DataTableProps<Expense, TValue> {
  columns: ColumnDef<Expense, TValue>[]
  data: Expense[]
  isLoading: boolean
}

export function DataTable<Expense, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<Expense, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  let total = 0
  table.getSelectedRowModel().rows.forEach(({ original: expense }) => {
    // @ts-ignore
    total += expense.price
  })

  useEffect(() => table.setPageSize(3), [table])

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton className="h-7 w-24 rounded-full" />

                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>

                      <Skeleton className="h-7 w-16 self-end rounded-full" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton className="h-7 w-24 rounded-full" />

                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>

                      <Skeleton className="h-7 w-16 self-end rounded-full" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton className="h-7 w-24 rounded-full" />

                        <Skeleton className="h-5 w-10 rounded-full" />
                      </div>

                      <Skeleton className="h-7 w-16 self-end rounded-full" />
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="my-2 flex flex-row items-center justify-between">
        <p>Total selected:</p>
        <p className="font-bold">R{total.toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          className="w-full"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          className="w-full"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
