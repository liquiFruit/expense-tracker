import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { format, isThisWeek, isToday, isTomorrow, isYesterday } from "date-fns"

export function humanDate(date: Date) {
  if (isToday(date)) return "Today"

  if (isTomorrow(date)) return "Tomorrow"

  if (isYesterday(date)) return "Yesterday"

  if (isThisWeek(date)) return format(date, "EEEE")

  return format(date, "P")
}
