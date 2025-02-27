"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID, pageview } from "../lib/gtag"; // Import tracking functions

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caleb Seely",
  description: "Built by AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      pageview(pathname);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/my-favicon/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/my-favicon/running-shoe-rotate1.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/my-favicon/icon-emerald30-96.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/my-favicon/icon-blue30-32.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/my-favicon/running-shoe-rotate1.png" />
        <link rel="apple-touch-icon" href="/my-favicon/apple-icon.png" />

        {/* Google Analytics */}
        <Script 
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
