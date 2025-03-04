import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  name: string;
  id: string;
}

interface SpotifyAlbum {
  images: SpotifyImage[];
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

interface SpotifyResponse {
  is_playing: boolean;
  currently_playing_type: string;
  item: SpotifyTrack;
}

interface NowPlayingResponse {
  isPlaying: boolean;
  songName: string;
  artist: string;
  albumArt: string;
}

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
    const createResponse = (data: NowPlayingResponse) => {
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
      return createResponse({ 
        isPlaying: false,
        songName: 'Error fetching song data',
        artist: 'Spotify error',
        albumArt: '/my-favicon/icon-emerald-30.webp'
      });
    }

    const data = JSON.parse(text) as SpotifyResponse;

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