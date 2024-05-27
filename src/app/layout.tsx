import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create beautiful graphs - Firegraph",
  description: "Create beautiful graphs - Firegraph",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
      <Toaster />
    </html>
  );
}
