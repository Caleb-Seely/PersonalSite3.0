// app/api/strava/callback/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log('Callback received. Code:', code, 'State:', state); // Debugging

  // Retrieve the stored state from cookies
  const cookieStore = await cookies();
  const storedState = cookieStore.get('strava_auth_state')?.value;

  // Verify the state
  if (!state || state !== storedState) {
    console.error('State mismatch. Stored:', storedState, 'Received:', state); // Debugging
    return NextResponse.json(
      { error: 'State mismatch - Possible CSRF attack' },
      { status: 400 }
    );
  }

  try {
    // Exchange the authorization code for an access token
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strava API error:', errorData); // Debugging
      throw new Error(errorData.message || 'Failed to fetch access token');
    }

    // Prints everything returned  
    // const data = await response.json();
    // console.log('Token Data:', data); // Debugging

    // Store the tokens securely
    cookieStore.set('strava_access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: data.expires_in,
    });

    cookieStore.set('strava_refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    cookieStore.set('strava_expires_at', (Math.floor(Date.now() / 1000) + data.expires_in).toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to complete Strava login' },
      { status: 500 }
    );
  }
}