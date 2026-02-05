//Spotiry/add-songs/route
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  // Access the cookie store
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('spotify_access_token')?.value;

  // Validate access token
  if (!accessToken) {
    return NextResponse.json({ error: 'No access token' }, { status: 401 });
  }

  // Parse request body
  let songUrl: string;
  try {
    const body = await request.json();
    songUrl = body.songUrl;

    // Validate song URL exists and is a string
    if (!songUrl || typeof songUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid song input' }, { status: 400 });
    }

    // Limit input length to prevent abuse
    if (songUrl.length > 500) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // If it looks like a URL, validate it's from Spotify
    if (songUrl.startsWith('http') && !songUrl.includes('spotify.com') && !songUrl.includes('spotify:')) {
      return NextResponse.json({ error: 'Only Spotify URLs or song names accepted' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    let trackUri: string;

    // If the song URL is not a Spotify track URI, search for the track
    if (!songUrl.includes('spotify:track:')) {
      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(songUrl)}&type=track&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle search errors
      if (!searchResponse.ok) {
        const errorData = await searchResponse.json();
        throw new Error(errorData.error?.message || 'Failed to search for track');
      }

      const searchData = await searchResponse.json();

      // Handle case where no track is found
      if (searchData.tracks.items.length === 0) {
        return NextResponse.json({ error: 'Song not found' }, { status: 404 });
      }

      trackUri = searchData.tracks.items[0].uri;
    } else {
      trackUri = songUrl;
    }

    // Add the track to the playlist
    const addTrackResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${process.env.SPOTIFY_PLAYLIST_ID}/tracks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uris: [trackUri],
        }),
      }
    );

    // Handle add track errors
    if (!addTrackResponse.ok) {
      const errorData = await addTrackResponse.json();
      throw new Error(errorData.error?.message || 'Failed to add track');
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message); // Log the error message for debugging
      return NextResponse.json(
        { error: error.message || 'Failed to add song' },
        { status: 500 }
      );
    } else {
      console.error('Error:', error); // Handle non-Error cases if necessary
      return NextResponse.json(
        { error: 'Failed to add song' },
        { status: 500 }
      );
    }
  }
  
}