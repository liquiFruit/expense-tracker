"use client"

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
  const data = [
    {
      day: "Mon",
      amount: 350,
    },
    {
      day: "Tues",
      amount: 50,
    },
    {
      day: "Wed",
      amount: 200,
    },
    {
      day: "Thurs",
      amount: 50,
    },
    {
      day: "Fri",
      amount: 100,
    },
    {
      day: "Sat",
      amount: 550,
    },
    {
      day: "Sun",
      amount: 200,
    },
  ]

  return (
    <div className="m-4 p-4 border border-primary bg-primary/5 rounded-md shadow-lg">
      <div>
        <p className="text-sm">Week total:</p>
        <p className="font-bold text-xl">R15,505.50</p>
        <p className="text-md text-rose-400">+201.5%</p>
      </div>

      <ResponsiveContainer aspect={16 / 9} width="100%" className="">
        <LineChart data={data} className="">
          <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" />

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
    <div className="rounded bg-background p-2 drop-shadow">
      <span className="mr-2 font-semibold">{day}:</span>R
      {(amount as Number).toFixed(2)}
    </div>
  )
}
