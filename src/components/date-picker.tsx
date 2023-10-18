"use client"

import { format, isThisWeek, isToday, isTomorrow, isYesterday } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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

function formatDate(date: Date) {
  if (isToday(date)) return "Today"

  if (isTomorrow(date)) return "Tomorrow"

  if (isYesterday(date)) return "Yesterday"

  if (isThisWeek(date)) return format(date, "EEEE")

  return format(date, "P")
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
          {date ? formatDate(date) : <span>Pick a date</span>}
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
