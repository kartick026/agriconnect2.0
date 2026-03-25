import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriConnect – Transparent Crop Pricing for Farmers",
  description:
    "Compare real-time market prices, calculate profits, detect crop diseases, and connect with a community of farmers across India.",
  manifest: "/manifest.json",
  keywords: [
    "agriculture",
    "crop prices",
    "farmer",
    "market prices",
    "AgriConnect",
  ],
  openGraph: {
    title: "AgriConnect",
    description: "Transparent Crop Pricing for Farmers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f4eb] text-[#004d2b] min-h-screen flex flex-col`}
      >
        <Providers>
          <div className="flex flex-1 h-screen overflow-hidden bg-[#f0f4eb]">
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
