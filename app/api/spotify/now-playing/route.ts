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
  debug?: DebugInfo; // Changed from any to DebugInfo
}

// Added a specific type for debug information
interface DebugInfo {
  timestamp: string;
  steps: DebugStep[];
}

interface DebugStep {
  step: string;
  details?: unknown; // Using unknown instead of any
  time: string;
}

export async function GET() {
  const defaultResponse: NowPlayingResponse = {
    isPlaying: false,
    songName: 'I\'m not playing music right now.',
    artist: 'Spotify paused',
    albumArt: '/my-favicon/icon-emerald-30.webp'
  };
  
  // Debug info container - updated type
  const debugInfo: DebugInfo = {
    timestamp: new Date().toISOString(),
    steps: []
  };
  
  // Helper to add debug step - updated parameter type
  const addDebugStep = (step: string, details?: unknown) => {
    console.log(`[Spotify Debug] ${step}`, details || '');
    debugInfo.steps.push({ step, details, time: new Date().toISOString() });
  };
  
  // Create the response with no-cache headers
  const createResponse = (data: NowPlayingResponse, status = 200, includeDebug = false) => {
    // Only include debug info in development
    const responseData = includeDebug 
      ? { ...data, debug: debugInfo }
      : data;
      
    return NextResponse.json(responseData, {
      status,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'CDN-Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  };

  // Check if we're in development mode
  const isDev = process.env.NODE_ENV === 'development';
  
  // Function to call the refresh endpoint
  const refreshSpotifyToken = async () => {
    try {
      addDebugStep('Calling Spotify token refresh endpoint');
      
      const refreshResponse = await fetch(new URL('/api/spotify/refresh', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').toString(), {
        method: 'GET',
        cache: 'no-store',
      });
      
      if (!refreshResponse.ok) {
        addDebugStep('Token refresh request failed', { 
          status: refreshResponse.status, 
          statusText: refreshResponse.statusText 
        });
        return { success: false };
      }
      
      const refreshData = await refreshResponse.json();
      
      if (refreshData.success && refreshData.access_token) {
        addDebugStep('Token refresh successful with new token');
        return {
          success: true,
          access_token: refreshData.access_token,
          expires_in: refreshData.expires_in,
          timestamp: refreshData.timestamp
        };
      } else {
        addDebugStep('Token refresh returned error', { error: refreshData.error });
        return { success: false };
      }
    } catch (error) {
      addDebugStep('Error during token refresh request', {
        error: (error as Error).message
      });
      return { success: false };
    }
  };

  try {
    // Get access token from cookies as fallback
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('spotify_access_token')?.value;

    // If no access token, try refreshing
    if (!accessToken) {
      addDebugStep('No access token found in cookies, attempting refresh');
      
      const refreshResult = await refreshSpotifyToken();
      
      if (!refreshResult.success) {
        addDebugStep('Token refresh failed');
        return createResponse({
          ...defaultResponse,
          songName: 'Spotify not connected',
          artist: 'Please connect your account'
        }, 200, isDev);
      }

      accessToken = refreshResult.access_token;
      addDebugStep('Successfully retrieved new access token after refresh');
    }

    // Now fetch the currently playing track
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'no-store'
      }
    });

    addDebugStep('Spotify API response received', { 
      status: response.status,
      statusText: response.statusText,
      contentLength: response.headers.get('content-length')
    });

    // If unauthorized, try refreshing token and retry
    if (response.status === 401) {
      addDebugStep('Received 401 Unauthorized, attempting token refresh');
      
      const refreshResult = await refreshSpotifyToken();
      
      if (!refreshResult.success) {
        addDebugStep('Token refresh failed after 401');
        return createResponse({
          ...defaultResponse,
          songName: 'Spotify authentication needed',
          artist: 'Please reconnect your account'
        }, 200, isDev);
      }

      accessToken = refreshResult.access_token;
      addDebugStep('Successfully retrieved new access token, retrying request');
      
      // Retry with new token
      const retryResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Cache-Control': 'no-store'
        }
      });

      addDebugStep('Retry response received', { 
        status: retryResponse.status,
        contentLength: retryResponse.headers.get('content-length')
      });
      
      // If still unauthorized even after refresh
      if (retryResponse.status === 401) {
        addDebugStep('Still unauthorized after token refresh');
        return createResponse({
          ...defaultResponse,
          songName: 'Spotify authentication failed',
          artist: 'Please reconnect your account'
        }, 200, isDev);
      }
      
      // Continue with retry response
      if (retryResponse.status === 204 || (retryResponse.status === 200 && retryResponse.headers.get('content-length') === '0')) {
        addDebugStep('No content in retry response - nothing playing');
        return createResponse(defaultResponse, 200, isDev);
      }
      
      if (!retryResponse.ok) {
        addDebugStep('Retry request failed', { status: retryResponse.status });
        return createResponse(defaultResponse, 200, isDev);
      }
      
      const retryText = await retryResponse.text();
      
      try {
        const retryData = JSON.parse(retryText) as SpotifyResponse;
        
        if (!retryData || !retryData.item) {
          addDebugStep('No valid data in retry response');
          return createResponse(defaultResponse, 200, isDev);
        }
        
        addDebugStep('Successfully retrieved track data after token refresh');
        
        if (retryData.currently_playing_type === 'episode') {
          return createResponse({
            isPlaying: retryData.is_playing,
            songName: 'Listening to a podcast',
            artist: 'Podcast',
            albumArt: retryData.item.album?.images?.[0]?.url || '/my-favicon/icon-emerald-30.webp'
          }, 200, isDev);
        } else {
          return createResponse({
            isPlaying: retryData.is_playing,
            songName: retryData.item.name || 'Unknown',
            artist: retryData.item.artists?.[0]?.name || 'Unknown Artist',
            albumArt: retryData.item.album?.images?.[0]?.url || '/my-favicon/icon-emerald-30.webp'
          }, 200, isDev);
        }
      } catch (parseError) {
        addDebugStep('Error parsing retry response', {
          error: (parseError as Error).message
        });
        return createResponse(defaultResponse, 200, isDev);
      }
    }

    // Handle 204 No Content (no song playing)
    if (response.status === 204 || (response.status === 200 && response.headers.get('content-length') === '0')) {
      addDebugStep('No content returned - nothing playing');
      return createResponse(defaultResponse, 200, isDev);
    }

    // Handle other non-200 responses
    if (!response.ok) {
      addDebugStep('Spotify API error', { 
        status: response.status, 
        statusText: response.statusText 
      });
      return createResponse(defaultResponse, 200, isDev);
    }

    // Ensure response is valid JSON
    const text = await response.text();
    
    addDebugStep('Response text received', { 
      textLength: text.length,
      textPreview: text.substring(0, 100) + (text.length > 100 ? '...' : '')
    });
    
    if (!text) {
      addDebugStep('Empty response text');
      return createResponse(defaultResponse, 200, isDev);
    }

    try {
      const data = JSON.parse(text) as SpotifyResponse;
      
      addDebugStep('JSON parsed successfully', { 
        isPlaying: data.is_playing,
        contentType: data.currently_playing_type,
        hasItem: !!data.item
      });

      // Make sure data and required properties exist
      if (!data) {
        addDebugStep('Data is null or undefined');
        return createResponse(defaultResponse, 200, isDev);
      }
      
      if (!data.item) {
        addDebugStep('No item in response', { responseKeys: Object.keys(data) });
        return createResponse(defaultResponse, 200, isDev);
      }

      if (data.currently_playing_type === 'episode') {
        // Handle podcast episode
        addDebugStep('Podcast episode detected');
        return createResponse({
          isPlaying: data.is_playing,
          songName: 'Listening to a podcast',
          artist: 'Podcast',
          albumArt: data.item.album?.images?.[0]?.url || '/my-favicon/icon-emerald-30.webp'
        }, 200, isDev);
      } else {
        // Handle music track (default case)
        addDebugStep('Music track detected', {
          trackName: data.item.name,
          artist: data.item.artists?.[0]?.name,
          hasAlbumArt: !!data.item.album?.images?.[0]?.url
        });
        
        return createResponse({
          isPlaying: data.is_playing,
          songName: data.item.name || 'Unknown',
          artist: data.item.artists?.[0]?.name || 'Unknown Artist',
          albumArt: data.item.album?.images?.[0]?.url || '/my-favicon/icon-emerald-30.webp'
        }, 200, isDev);
      }
    } catch (parseError) {
      addDebugStep('JSON parse error', { 
        error: (parseError as Error).message,
        stack: (parseError as Error).stack
      });
      
      return createResponse(defaultResponse, 200, isDev);
    }
  } catch (error) {
    addDebugStep('Fatal error', { 
      error: (error as Error).message,
      stack: (error as Error).stack
    });
    
    // Return the default response instead of an error message
    return createResponse(defaultResponse, 200, isDev);
  }
}