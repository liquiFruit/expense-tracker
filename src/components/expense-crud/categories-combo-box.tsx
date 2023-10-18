"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Category } from "@/lib/db/schema/categories"

type CategoryComboBoxProps = {
  categories: Category[]
  categoryId: Category["id"] | null
  setCategoryId: (id: Category["id"] | null) => void
}

export function CategoryComboBox({
  categories,
  categoryId,
  setCategoryId,
}: CategoryComboBoxProps) {
  const [open, setOpen] = useState(false)

  function updateSelected(newCategoryDescription: Category["description"]) {
    const newId = categories.find(
      (category) =>
        category.description.toLowerCase() === newCategoryDescription
    )?.id

    setCategoryId(!newId || newId === categoryId ? null : newId)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {categoryId
            ? categories.find((category) => category.id === categoryId)
                ?.description
            : "Select a category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search for a category..." />

          <CommandEmpty>No categories found.</CommandEmpty>

          <CommandGroup>
            {categories.map((category) => (
              <CommandItem
                key={category.id + category.description}
                onSelect={updateSelected}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    category.id === categoryId ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
