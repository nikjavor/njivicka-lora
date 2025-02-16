import type { Metadata } from "next";
import { spaceMono } from "@/app/ui/fonts";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: "Njivička lora",
  description: "Lora scorekeeper for people that like the town Njivice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${spaceMono.className} antialiased bg-background-color text-text-color`}>
          {children}
        </body >
      </html>
    </ClerkProvider>
  )
}
