// app/api/spotify/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const scope = 'user-read-currently-playing playlist-modify-public';
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
  
  const state = Math.random().toString(36).substring(7);
  cookies().set('spotify_auth_state', state);
  console.log('Spotify/route makigng a request? Maybe?O');
  const authUrl = new URL('https://accounts.spotify.com/authorize')
  const params = {
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  }
  authUrl.search = new URLSearchParams(params).toString();

  return NextResponse.redirect(authUrl.toString());
}