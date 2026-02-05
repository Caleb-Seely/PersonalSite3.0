// app/api/strava/default-map/route.ts
// Returns a default static map for when Strava activity is unavailable
import { NextResponse } from 'next/server';

// Default location: Portland, OR (Forest Park area - great running spot)
const DEFAULT_LAT = 43.9620;
const DEFAULT_LNG = -122.0874;
const DEFAULT_ZOOM = 6;

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return new NextResponse(
      JSON.stringify({ error: 'Google Maps API key not configured' }),
      { status: 500 }
    );
  }

  // Generate a static map URL centered on Portland with terrain style
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?` +
    `center=${DEFAULT_LAT},${DEFAULT_LNG}` +
    `&zoom=${DEFAULT_ZOOM}` +
    `&size=400x400` +
    `&maptype=terrain` +
    `&style=feature:poi|visibility:off` +
    `&style=feature:transit|visibility:off` +
    `&key=${apiKey}`;

  try {
    // Fetch the map image and proxy it (keeps API key server-side)
    const response = await fetch(mapUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch map');
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching default map:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch map' }),
      { status: 500 }
    );
  }
}
