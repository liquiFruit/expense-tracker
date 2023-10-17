"use client"

import { useSession, signIn, signOut } from "next-auth/react"

import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"
import { LoadingIcon } from "@/components/icons"
import Image from "next/image"

import DefaultImage from "@/../public/default_img.png"

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="flex flex-row justify-between items-center p-4 shadow">
      <Logo />

      {status === "authenticated" && session && session.user ? (
        <div className="relative overflow-hidden w-8 aspect-square rounded-full border-2 border-primary">
          <Image
            alt="User profile pic"
            src={session.user.image || DefaultImage.src}
            fill
            className="object-cover"
          />
        </div>
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
