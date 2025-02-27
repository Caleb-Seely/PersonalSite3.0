import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CloudflareAnalytics from '../components/CloudflareAnalytics';

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
  description: "Built by AI and no sleep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/my-favicon/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/my-favicon/running-shoe-rotate1.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/my-favicon/icon-emerald30-96.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/my-favicon/icon-blue30-32.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/my-favicon/running-shoe-rotate1.png" />
        <link rel="apple-touch-icon" href="/my-favicon/apple-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <CloudflareAnalytics />
      </body>
    </html>
  );
}