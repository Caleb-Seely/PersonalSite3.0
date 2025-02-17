import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // Handle 204 No Content (no song playing)
    if (response.status === 204 || response.status === 200 && response.headers.get('content-length') === '0') {
      return NextResponse.json({ isPlaying: false });
    }

    // Ensure response is valid JSON
    const text = await response.text();
    if (!text) {
      return NextResponse.json({ error: 'Empty response from Spotify' }, { status: 500 });
    }

    const data = JSON.parse(text);
    console.log('Successfully fetched Sptify data');
    return NextResponse.json({
      isPlaying: data.is_playing,
      songName: data.item?.name || 'Unknown',
      artist: data.item?.artists?.[0]?.name || 'Unknown',
      albumArt: data.item?.album?.images?.[0]?.url || ''
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch from Spotify' }, { status: 500 });
  }
}
