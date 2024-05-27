import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

const meta = {
  title: 'Firegraph',
  description: 'Create beautiful graphs. From GitHub star charts to custom data. Made by Firecrawl.',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: 'https://www.firegraph.so/'
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['Firegraph', 'Graphs', 'Data Visualization', 'GitHub', 'Firecrawl'],
    authors: [{ name: 'Firecrawl', url: 'https://www.firecrawl.dev/' }],
    creator: 'Firecrawl',
    publisher: 'Firecrawl',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vercel',
      creator: '@Vercel',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    }
  };
}

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
