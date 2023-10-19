"use client"

import { Calendar as CalendarIcon } from "lucide-react"

import { cn, humanDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

type DatePickerProps = {
  className?: string
  date: Date | undefined
  setDate: (date: DatePickerProps["date"]) => void
}

export function DatePicker({ className, date, setDate }: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            className,
            "w-fit justify-start items-center text-left font-normal text-xs",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-1 aspect-square h-4" />
          {date ? humanDate(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
