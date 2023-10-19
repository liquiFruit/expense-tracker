"use client"

import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ZustandErrorHandler({ error }: { error: string }) {
  const { refresh } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => setIsOpen(true), [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full">
        <div className="p-1">
          <Button variant={"destructive"} size={"sm"} className="w-full">
            View error
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fatal error occured</DialogTitle>

          <DialogDescription className="flex flex-col gap-4">
            <p>
              The app might not function correctly until this error is resolved.
            </p>

            <code className="w-full rounded-sm border border-red-500 p-1 text-center text-red-500">
              {error}
            </code>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={refresh} variant={"outline"}>
            Retry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
