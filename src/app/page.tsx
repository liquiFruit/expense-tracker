import { Button } from "@/components/ui/button"
import {
  BadgeCentIcon,
  BadgeDollarSignIcon,
  BadgeEuroIcon,
  BadgeIndianRupeeIcon,
} from "lucide-react"
import Link from "next/link"

const classes = "absolute -translate-x-1/2 -translate-y-1/2"
function randomCoordinates(percent: number) {
  const radius = 30

  return {
    left: `${radius * Math.cos(percent * 2 * Math.PI) + 50}%`,
    top: `${radius * Math.sin(percent * 2 * Math.PI) + 50}%`,
  }
}

export default async function Home() {
  return (
    <main className="my-16">
      <h1 className="text-center text-3xl font-black underline decoration-primary">
        Track Every Penny
      </h1>

      <div className="relative mx-auto aspect-square w-full max-w-xs animate-[spin_10s_linear_infinite]">
        <div className={classes} style={randomCoordinates(0)}>
          <BadgeDollarSignIcon
            size={50}
            className="animate-[spin_10s_linear_infinite_reverse] text-primary drop-shadow-xl"
          />
        </div>

        <div className={classes} style={randomCoordinates(0.25)}>
          <BadgeEuroIcon
            size={50}
            className="animate-[spin_10s_linear_infinite_reverse] text-primary drop-shadow-xl"
          />
        </div>

        <div className={classes} style={randomCoordinates(0.5)}>
          <BadgeCentIcon
            size={50}
            className="animate-[spin_10s_linear_infinite_reverse] text-primary drop-shadow-xl"
          />
        </div>

        <div className={classes} style={randomCoordinates(0.75)}>
          <BadgeIndianRupeeIcon
            size={50}
            className="animate-[spin_10s_linear_infinite_reverse] text-primary drop-shadow-xl"
          />
        </div>
      </div>

      <Button className="mx-auto block w-full max-w-xs text-center" asChild>
        <Link href={"/dashboard"}>Get Started</Link>
      </Button>
    </main>
  )
}
