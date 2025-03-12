import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'maps.googleapis.com',
            },
            {
            protocol: 'https',
            hostname: 'i.scdn.co',
            },
        ],
        },
};

module.exports = {
   headers: async () => [
     {
       source: '/(.*)',
       headers: [
         {
           key: 'Cache-Control',
           value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
         },
       ],
     },
   ],
 }

export default nextConfig;

