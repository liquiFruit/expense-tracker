import { cn } from "@/lib/utils"
import { Loader2, LucideProps } from "lucide-react"

export function LoadingIcon({ className, ...props }: LucideProps) {
  return (
    <Loader2
      className={cn("animate-spin text-primary", className)}
      {...props}
    />
  )
}
