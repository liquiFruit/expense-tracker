import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import {
  differenceInCalendarDays,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns"

export function humanDate(date: Date) {
  if (isToday(date)) return "Today"

  if (isTomorrow(date)) return "Tomorrow"

  if (isYesterday(date)) return "Yesterday"

  if (differenceInCalendarDays(new Date(), date) < 7) return format(date, "EEE")

  return format(date, "P")
}
