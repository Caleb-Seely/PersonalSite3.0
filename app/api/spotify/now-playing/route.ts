import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Helper function to refresh the Spotify token
async function refreshSpotifyToken(): Promise<string | null> {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Missing Spotify environment variables');
    }
    return null;
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to refresh Spotify token:', response.status);
      }
      return null;
    }

    const data = await response.json();
    
    if (!data.access_token) {
      if (process.env.NODE_ENV === 'development') {
        console.error('No access token in refresh response');
      }
      return null;
    }

    // Set the new token in cookies
    const cookieStore = await cookies();
    cookieStore.set('spotify_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600 // 1 hour
    });

    return data.access_token;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error refreshing Spotify token:', error);
    }
    return null;
  }
}

// Helper function to make authenticated Spotify API request
async function makeSpotifyRequest(accessToken: string, url: string) {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

export async function GET() {
  // Check environment variables first
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({ 
      isPlaying: false,
      songName: "I'm not playing music right now.",
      artist: 'Spotify paused',
      albumArt: '/my-favicon/icon-emerald-30.webp',
      error: 'Service configuration error'
    }, { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }

  const cookieStore = cookies();
  let accessToken: string | undefined = (await cookieStore).get('spotify_access_token')?.value;
  
  // If no access token, try to refresh
  if (!accessToken) {
    const refreshedToken = await refreshSpotifyToken();
    accessToken = refreshedToken || undefined;
    
    if (!accessToken) {
      return NextResponse.json({ 
        isPlaying: false,
        songName: "I'm not playing music right now.",
        artist: 'Spotify paused',
        albumArt: '/my-favicon/icon-emerald-30.webp',
        error: 'Unable to authenticate with Spotify'
      }, { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
  }
  
  const timestamp = new Date().getTime();
  const spotifyUrl = `https://api.spotify.com/v1/me/player/currently-playing?_t=${timestamp}`;
  
  try {
    let response = await makeSpotifyRequest(accessToken, spotifyUrl);
    
    // If we get a 401, the token might be expired - try refreshing once
    if (response.status === 401) {
      const newAccessToken = await refreshSpotifyToken();
      
      if (newAccessToken) {
        response = await makeSpotifyRequest(newAccessToken, spotifyUrl);
        accessToken = newAccessToken; // Update for subsequent use
      } else {
        return NextResponse.json({ 
          isPlaying: false,
          songName: "I'm not playing music right now.",
          artist: 'Spotify paused',
          albumArt: '/my-favicon/icon-emerald-30.webp',
          error: 'Authentication failed'
        }, { status: 401 });
      }
    }
    
    // Handle 204 No Content (no song playing)
    if (response.status === 204 || (response.status === 200 && response.headers.get('content-length') === '0')) {
      return NextResponse.json({
        isPlaying: false,
        songName: "I'm not playing music right now.",
        artist: 'Spotify paused',
        albumArt: '/my-favicon/icon-emerald-30.webp'
      });
    }
    
    // Handle other HTTP error statuses
    if (!response.ok) {
      return NextResponse.json({ 
        isPlaying: false,
        songName: "I'm not playing music right now.",
        artist: 'Spotify paused',
        albumArt: '/my-favicon/icon-emerald-30.webp',
        error: `Spotify API error: ${response.status}`
      }, { status: 401 });
    }
    
    // Ensure response is valid JSON
    const text = await response.text();
    if (!text) {
      return NextResponse.json({ 
        isPlaying: false,
        songName: "I'm not playing music right now.",
        artist: 'Spotify paused',
        albumArt: '/my-favicon/icon-emerald-30.webp',
        error: 'Empty response from Spotify'
      }, { status: 500 });
    }
    
    const data = JSON.parse(text);

    // Handle podcasts/episodes (return as not playing music)
    if (data.currently_playing_type === 'episode'){
      return NextResponse.json({ 
         isPlaying: false,
         songName: "I'm not playing music right now.",
         artist: 'Spotify paused',
         albumArt: '/my-favicon/icon-emerald-30.webp'
       });
    }
    
    return NextResponse.json({
      isPlaying: data.is_playing,
      songName: data.item?.name || 'Unknown',
      artist: data.item?.artists?.[0]?.name || 'Unknown',
      albumArt: data.item?.album?.images?.[0]?.url || '',
      timestamp: Date.now() // Add timestamp for cache busting
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
        'Vary': 'Accept-Encoding',
        'Last-Modified': new Date().toUTCString()
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      isPlaying: false,
      songName: "I'm not playing music right now.",
      artist: 'Spotify paused',
      albumArt: '/my-favicon/icon-emerald-30.webp',
      error: 'Failed to fetch from Spotify'
    }, { status: 500 });
  }
}