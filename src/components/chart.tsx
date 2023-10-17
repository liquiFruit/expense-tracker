"use client"

import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts"

export function Chart() {
  const data = [
    {
      name: "Page A",
      uv: Math.floor(Math.random() * 1000),
    },
    {
      name: "Page B",
      uv: Math.floor(Math.random() * 1000),
    },
    {
      name: "Page C",
      uv: Math.floor(Math.random() * 1000),
    },
  ]
  return (
    // <div className="w- aspect-video bg-primary/10">
    <ResponsiveContainer aspect={16 / 9} width="100%" className="">
      <LineChart data={data} className="">
        <Line type="monotone" dataKey="uv" className="stroke-primary" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
    // </div>
  )
}
