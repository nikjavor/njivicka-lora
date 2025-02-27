import type { Metadata } from "next";
import { spaceMono } from "@/app/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Njivička lora",
  description: "Lora scorekeeper for people that like the town Njivice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.className} antialiased text-neutral`}
      >
        {children}
      </body>
    </html>
  );
}
