// app/api/spotify/refresh/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Define specific types for debug information
interface DebugInfo {
  timestamp: string;
  steps: DebugStep[];
}

interface DebugStep {
  step: string;
  details?: unknown; // Using unknown instead of any
  time: string;
}

// Define response type
interface RefreshResponse {
  success: boolean;
  access_token?: string;
  expires_in?: number;
  timestamp?: number;
  error?: string;
  debug?: DebugInfo;
}

export async function GET() {
  // Debug info container
  const debugInfo: DebugInfo = {
    timestamp: new Date().toISOString(),
    steps: []
  };

  // Helper to add debug step
  const addDebugStep = (step: string, details?: unknown) => {
    console.log(`[Spotify Refresh Debug] ${step}`, details || '');
    debugInfo.steps.push({ step, details, time: new Date().toISOString() });
  };

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    const missingVars = [
      !CLIENT_ID && 'SPOTIFY_CLIENT_ID',
      !CLIENT_SECRET && 'SPOTIFY_CLIENT_SECRET',
      !REFRESH_TOKEN && 'SPOTIFY_REFRESH_TOKEN'
    ].filter(Boolean);
    
    addDebugStep('Missing environment variables', { missing: missingVars });
    
    return NextResponse.json(
      { 
        error: 'Missing environment variables',
        debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined
      } as RefreshResponse,
      { status: 500 }
    );
  }

  try {
    addDebugStep('Starting token refresh');
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
      const errorText = await response.text();
      addDebugStep('Token refresh request failed', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Define response data type
    interface SpotifyTokenResponse {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope?: string;
    }

    const data = await response.json() as SpotifyTokenResponse;
    
    if (!data.access_token) {
      addDebugStep('No access token in response', { responseData: data });
      throw new Error('No access token in response');
    }

    addDebugStep('Successfully received new access token', {
      tokenLength: data.access_token.length
    });

    // Get cookie store and set cookie as backup
    const cookieStore = await cookies();
    
    // Set the cookie with specific options
    cookieStore.set('spotify_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600 // 1 hour
    });

    // Create response with the access token
    const responseData: RefreshResponse = {
      success: true,
      access_token: data.access_token,
      expires_in: 3600,
      timestamp: Date.now(),
      debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined
    };

    // Return both the token and success status
    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    addDebugStep('Error in refresh process', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to refresh token',
        debug: process.env.NODE_ENV === 'development' ? debugInfo : undefined
      } as RefreshResponse,
      { status: 500 }
    );
  }
}