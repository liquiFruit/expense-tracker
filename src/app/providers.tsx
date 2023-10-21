"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import NextAuthProvider from "@/lib/auth/Provider"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <NextAuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextAuthProvider>
  )
}
