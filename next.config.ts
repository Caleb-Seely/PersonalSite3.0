import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      // Cache static pages but exclude API routes
      source: '/((?!api).*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
        // Content Security Policy for Google Analytics
        {
          key: 'Content-Security-Policy',
          value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com https://stats.g.doubleclick.net; img-src 'self' data: https: https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com;",
        },
      ],
    },
    {
      // Ensure API routes are never cached
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
        {
          key: 'Pragma',
          value: 'no-cache',
        },
        {
          key: 'Expires',
          value: '0',
        },
        {
          key: 'Surrogate-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image-cdn-fa.spotifycdn.com',
        port: '',
        pathname: '/**',
      },
      // Add any other Spotify image domains you might encounter
    ],
  }
};

export default nextConfig;