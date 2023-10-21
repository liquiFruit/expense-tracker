import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { Providers } from "@/app/providers"
import { Toaster } from "@/components/ui/toaster"
import { Navbar } from "@/components/layout/navbar"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ExpenseTracker",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
