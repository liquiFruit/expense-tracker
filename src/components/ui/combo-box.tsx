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

type Item = { id: any }
type ComboBoxProps<T extends Item> = {
  items: T[]
  itemId: T["id"] | null
  setItemId: (id: T["id"] | null) => void
  getLabel: (item: T) => string
  className?: string
}

export function ComboBox<T extends Item>({
  items,
  itemId,
  setItemId,
  className,
  getLabel,
}: ComboBoxProps<T>) {
  const [open, setOpen] = useState(false)

  function updateSelected(newLabel: ReturnType<ComboBoxProps<T>["getLabel"]>) {
    const newId = items.find(
      (item) => getLabel(item).toLowerCase() === newLabel
    )?.id

    setItemId(!newId || newId === itemId ? null : newId)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(className, "w-full justify-between")}
        >
          {itemId && items.find((item) => item.id === itemId)
            ? getLabel(items.find((item) => item.id === itemId)!)
            : "Select an item..."}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search for an item..." />

          <CommandEmpty>No items found.</CommandEmpty>

          <CommandGroup>
            {items.map((item) => (
              <CommandItem key={item.id} onSelect={updateSelected}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    item.id === itemId ? "opacity-100" : "opacity-0"
                  )}
                />
                {getLabel(item)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
