import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saan-market.vercel.app"),
  title: {
    default: "Saan Market",
    template: "%s | Saan Market",
  },
  description:
    "A curated storefront for contemporary Thai home and lifestyle goods.",
  applicationName: "Saan Market",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "Saan Market",
    title: "Saan Market",
    description: "A fictional storefront for contemporary Thai home and lifestyle goods.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saan Market",
    description: "A fictional storefront for contemporary Thai home and lifestyle goods.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
