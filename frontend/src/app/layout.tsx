"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>AgriConnect</title>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f4eb] text-[#004d2b] min-h-screen flex flex-col`}
      >
        {mounted ? (
          <SessionProvider>
            <I18nextProvider i18n={i18n}>
              <div className="flex flex-1 h-screen overflow-hidden bg-[#f0f4eb]">
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                  {children}
                </main>
              </div>
            </I18nextProvider>
          </SessionProvider>
        ) : null}
      </body>
    </html>
  );
}
