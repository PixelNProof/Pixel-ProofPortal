import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Pixel & Proof HQ",
  description: "Internal operating system for Pixel & Proof",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
