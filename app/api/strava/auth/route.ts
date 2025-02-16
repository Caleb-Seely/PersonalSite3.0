// app/api/strava/auth/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const clientId = process.env.STRAVA_CLIENT_ID;
  const redirectUri = process.env.STRAVA_REDIRECT_URI;
  
  const state = Math.random().toString(36).substring(7);
  cookies().set('strava_auth_state', state);

  const authUrl = new URL('https://www.strava.com/oauth/authorize');
  const params = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'activity:read_all',
    state: state
  };
  authUrl.search = new URLSearchParams(params).toString();

  return NextResponse.redirect(authUrl.toString());
}