import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('spotify_access_token')?.value;
  
  if (!accessToken) {
    return NextResponse.json({ 
      isPlaying: false,
      songName: "I'm not playing music right now.",
      artist: 'Spotify paused',
      albumArt: '/my-favicon/icon-emerald-30.webp',
      error: 'No access token'
    }, { status: 401 });
  }
  
  const timestamp = new Date().getTime();
  try {
   const response = await fetch(`https://api.spotify.com/v1/me/player/currently-playing?_t=${timestamp}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
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
    console.log('Successfully fetched Spotify data');

    //Podcast 
    if (data.currently_playing_type === 'episode'){
      return NextResponse.json({ 
         isPlaying: false,
         songName: "I'm not playing music right now.",
         artist: 'Spotify paused.',
         albumArt: '/my-favicon/icon-emerald-30.webp',
         error: 'Podcast returned'
       }, { status: 202 });
    }
    
    return NextResponse.json({
      isPlaying: data.is_playing,
      songName: data.item?.name || 'Unknown',
      artist: data.item?.artists?.[0]?.name || 'Unknown',
      albumArt: data.item?.album?.images?.[0]?.url || ''
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