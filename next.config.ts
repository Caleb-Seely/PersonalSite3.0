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

export default nextConfig;

