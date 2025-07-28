import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "../components/google-analytics";



// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Use 'swap' to show text while font loads
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Caleb Seely",
  description: "Building solutions",
  // Add additional metadata for better SEO
  metadataBase: new URL('https://calebseely.com'), 
  openGraph: {
    title: "Caleb Seely",
    description: "Personal website of Caleb Seely - Solutions Developer",
    images: [
      {
        url: '/img/headshot.webp',
        width: 1200,
        height: 630,
        alt: 'Caleb Seely'
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caleb Seely",
    description: "Personal website of Caleb Seely - Solutions Developer",
    images: ['/img/headshot.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        {/* Favicon configuration */}
        <link rel="manifest" href="/my-favicon/manifest.json" />
        <link rel="icon" type="image/png" sizes="192x192" href="/my-favicon/running-shoe-rotate1.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/my-favicon/icon-emerald30-96.webp" />
        <link rel="icon" type="image/png" sizes="32x32" href="/my-favicon/icon-blue30-32.webp" />
        <link rel="icon" type="image/png" sizes="16x16" href="/my-favicon/running-shoe-rotate1.png" />
        <link rel="apple-touch-icon" href="/my-favicon/apple-icon.png" />
        
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-1ZZLC2GJW9`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1ZZLC2GJW9');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}