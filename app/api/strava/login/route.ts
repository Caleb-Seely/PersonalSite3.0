// app/api/strava/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Generate a random state value
    const state = Math.random().toString(36).substring(7);
    console.log('Strava/login/route attempting to login');
    // Store the state in a cookie
    const cookieStore = await cookies();
    cookieStore.set('strava_auth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    // Redirect to Strava's authorization page
    const authUrl = `https://www.strava.com/oauth/authorize?${new URLSearchParams({
      client_id: process.env.STRAVA_CLIENT_ID,
      redirect_uri: process.env.STRAVA_REDIRECT_URI,
      response_type: 'code',
      scope: 'activity:read_all',
      state: state,
    })}`;

    console.log('Redirecting to Strava:', authUrl); // Debugging
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Strava login' },
      { status: 500 }
    );
  }
}