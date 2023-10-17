"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { LoadingIcon } from "@/components/icons"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import DefaultImage from "@/../public/default_img.png"

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="flex flex-row justify-between items-center p-4 shadow">
      <Logo />

      {status === "authenticated" && session && session.user ? (
        <Popover>
          <PopoverTrigger>
            <div className="relative overflow-hidden w-8 aspect-square rounded-full border-2 border-primary">
              <Image
                alt="User profile pic"
                src={session.user.image || DefaultImage.src}
                fill
                className="object-cover"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col w-48 mt-4">
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Button>
          </PopoverContent>
        </Popover>
      ) : status === "loading" ? (
        <LoadingIcon size={36} />
      ) : (
        <Button size={"sm"} onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </nav>
  )
}
