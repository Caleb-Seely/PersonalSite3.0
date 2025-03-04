import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { 
      status: 401,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'CDN-Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'no-store'
      }
    });

    // Create the response with no-cache headers
    const createResponse = (data: any) => {
      return NextResponse.json(data, {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'CDN-Cache-Control': 'no-store',
          'Surrogate-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    };

    // Handle 204 No Content (no song playing)
    if (response.status === 204 || (response.status === 200 && response.headers.get('content-length') === '0')) {
      return createResponse({ 
        isPlaying: false,
        songName: 'I\'m not playing music right now.',
        artist: 'Spotify paused',
        albumArt: '/my-favicon/icon-emerald-30.webp'
      });
    }

    // Ensure response is valid JSON
    const text = await response.text();
    if (!text) {
      return createResponse({ error: 'Empty response from Spotify' });
    }

    const data = JSON.parse(text);

    if (data.currently_playing_type === 'episode') {
      // Handle podcast episode
      return createResponse({
        isPlaying: data.is_playing,
        songName: 'I\'m not playing music right now.',
        artist: 'Spotify paused',
        albumArt: '/my-favicon/icon-emerald-30.webp'
      });
    } else {
      // Handle music track (default case)
      return createResponse({
        isPlaying: data.is_playing,
        songName: data.item.name || 'Unknown',
        artist: data.item.artists?.[0]?.name || 'Unknown Artist',
        albumArt: data.item.album?.images?.[0]?.url || '/my-favicon/icon-emerald-30.webp'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch from Spotify' }, { 
      status: 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'CDN-Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}