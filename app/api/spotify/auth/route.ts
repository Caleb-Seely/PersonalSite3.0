//api/spotify/auth.ts || Should only need one activation and use this to get a new code
import querystring from 'querystring';
import { serialize } from 'cookie';

// Store these securely in your environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;
// Store your refresh token securely after initial authentication
const STORED_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Helper to get new access token using refresh token
async function getAccessToken() {
    console.log('Spotify/auth/route getAcessToken');
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: STORED_REFRESH_TOKEN,
    }),
  });

  return response.json();
}

// API route to handle token refresh
export default async function handler(req, res) {
  try {
    const { access_token } = await getAccessToken();
    console.log('Spotify/auth/route is being called!');
    // Set access token in an HTTP-only cookie
    res.setHeader('Set-Cookie', serialize('spotify_access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 3600 // 1 hour
    }));

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}