'use client';

import Script from 'next/script';

export default function CloudflareAnalytics() {
  const CLOUDFLARE_SITE_ID = process.env.CLOUDFLARE_SITE_ID;
  
  if (!CLOUDFLARE_SITE_ID) {
    return null;
  }
  
  return (
    <Script
      id="cloudflare-analytics"
      strategy="afterInteractive"
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={`{"token": "${CLOUDFLARE_SITE_ID}"}`}
    />
  );
}