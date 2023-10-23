"use client"

import { useExpenses } from "@/lib/hooks/queries"
import {
  format,
  isAfter,
  isBefore,
  isToday,
  startOfDay,
  subDays,
} from "date-fns"
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  TooltipProps,
} from "recharts"

import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

export function Chart() {
  const query = useExpenses()

  if (query.isLoading || query.isFetching || query.isRefetching)
    return "loading..."

  if (query.error || !query.data || query.data.error || !query.data.expenses)
    return "An error occured while fetching the data"

  const today = startOfDay(new Date())
  const ONE_WEEK_AGO = subDays(today, 6)
  const TWO_WEEKS_AGO = subDays(today, 13)
  const totals = new Map<number, { purchases: number; amount: number }>()

  for (var i = 0; i < 7; i++) {
    totals.set(startOfDay(subDays(today, i)).getTime(), {
      amount: 0,
      purchases: 0,
    })
  }

  query.data.expenses.forEach((exp) => {
    if (isBefore(exp.date, ONE_WEEK_AGO)) return

    const day = startOfDay(exp.date)
    const previous = totals.get(day.getTime())!

    totals.set(day.getTime(), {
      amount: previous.amount + exp.price,
      purchases: previous.purchases + 1,
    })
  })

  const data = [...totals]
    .sort((first, second) => first[0] - second[0])
    .map(([day, totals]) => ({
      day: isToday(day) ? "Today" : format(day, "EEE"),
      totals,
    }))

  const weekTotal = data.reduce((p, v) => ({
    day: "",
    totals: {
      amount: p.totals.amount + v.totals.amount,
      purchases: p.totals.purchases + v.totals.purchases,
    },
  })).totals

  // Reduce last week
  const lastWeekExpenses = query.data.expenses.filter(
    (exp) =>
      isBefore(exp.date, ONE_WEEK_AGO) && isAfter(exp.date, TWO_WEEKS_AGO)
  )

  const lastWeekTotalAmount =
    lastWeekExpenses.length === 0
      ? 0
      : lastWeekExpenses.reduce((result, entry) => ({
          ...result,
          price: result.price + entry.price,
        })).price

  const weeklyChange =
    100 *
    (lastWeekTotalAmount === 0
      ? 0
      : (weekTotal.amount - lastWeekTotalAmount) / lastWeekTotalAmount)

  return (
    <div className="my-4 rounded-md border border-primary bg-primary/5 p-4 shadow-lg">
      <div>
        <p className="text-sm">Week total:</p>
        <p className="text-xl font-bold">R{weekTotal.amount.toFixed(2)}</p>

        {weeklyChange > 0 ? (
          <p className="text-md text-rose-400">+{weeklyChange.toFixed(2)}%</p>
        ) : weeklyChange < 0 ? (
          <p className="text-md text-emerald-400">{weeklyChange.toFixed(2)}%</p>
        ) : (
          <p className="text-md text-muted-foreground">
            {weeklyChange.toFixed(2)}%
          </p>
        )}
      </div>

      <ResponsiveContainer aspect={16 / 9} width="100%" className="">
        <LineChart data={data} className="">
          <Line
            type="bump"
            dataKey="totals.amount"
            stroke="hsl(var(--primary))"
          />

          <Tooltip label="test" content={<TooltipComponent />} />

          <XAxis
            dataKey="day"
            fontSize={12}
            height={12}
            axisLine={false}
            tickLine={false}
            padding={{ left: 8, right: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function TooltipComponent(datum: TooltipProps<ValueType, NameType> | null) {
  if (!datum || !datum.payload || !datum.payload[0]) return

  const day = datum.label
  const amount = datum.payload[0].value

  return (
    <div className="rounded bg-background p-2 shadow">
      <span className="mr-2 font-semibold">{day}:</span>R
      {(amount as Number).toFixed(2)}
    </div>
  )
}
