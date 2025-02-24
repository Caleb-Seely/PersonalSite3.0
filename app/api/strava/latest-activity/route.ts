// app/api/strava/latest-activity/route.ts
// This is what we need to reverify Strava access 
import { NextResponse } from 'next/server';

const STRAVA_API_URL = 'https://www.strava.com/api/v3';
const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  try {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
      // Add cache: 'no-store' to prevent caching of the token request
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to refresh access token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

async function validateGoogleMapsUrl(polyline: string) {
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=enc:${encodeURIComponent(polyline)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  
  try {
    const mapResponse = await fetch(mapUrl, {
      // Add cache: 'no-store' to prevent caching of Google Maps requests
      cache: 'no-store',
    });
    if (!mapResponse.ok) {
      console.error('Google Maps API Error:', {
        status: mapResponse.status,
        statusText: mapResponse.statusText
      });
      return null;
    }
    return mapUrl;
  } catch (error) {
    console.error('Error validating Google Maps URL:', error);
    return null;
  }
}

async function getLatestActivity(accessToken: string) {
  try {
    // Add timestamp to URL to prevent caching
    const timestamp = Date.now();
    const response = await fetch(`${STRAVA_API_URL}/athlete/activities?per_page=1&_t=${timestamp}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
      // Add cache: 'no-store' to prevent fetch-level caching
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strava API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });

      if (response.status === 401) {
        throw new Error('Unauthorized - Token may be expired');
      }

      throw new Error(`Strava API returned ${response.status}: ${errorText}`);
    }

    const activities = await response.json();
    
    console.log('Successfully fetched Strava activities:', {
      count: activities.length,
      hasData: Boolean(activities[0]),
      timestamp: new Date().toISOString(), // Add timestamp to logs
    });

    if (activities.length === 0) {
      return null;
    }

    const activity = activities[0];
    
    const requiredFields = ['name', 'distance', 'moving_time', 'total_elevation_gain', 'map'];
    const missingFields = requiredFields.filter(field => !(field in activity));

    if (missingFields.length > 0) {
      console.error('Missing required fields in activity:', missingFields);
      throw new Error(`Activity missing required fields: ${missingFields.join(', ')}`);
    }

    let mapUrl = null;
    if (activity.map?.summary_polyline) {
      mapUrl = await validateGoogleMapsUrl(activity.map.summary_polyline);
    }

    return {
      name: activity.name,
      distance: activity.distance,
      moving_time: activity.moving_time,
      total_elevation_gain: activity.total_elevation_gain,
      map: mapUrl,
      // Add fetched timestamp to response
      fetched_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching latest activity:', error);
    throw error;
  }
}

export async function GET() {
  try {
    // Add response headers to prevent caching
    const headers = new Headers({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });

    const accessToken = await getAccessToken();
    const activity = await getLatestActivity(accessToken);

    if (!activity) {
      return new NextResponse(
        JSON.stringify({ message: 'No activities found' }),
        { status: 404, headers }
      );
    }

    console.log('Successfully transformed Strava activity data');
    return new NextResponse(JSON.stringify(activity), { 
      status: 200,
      headers 
    });
  } catch (error: unknown) {
    const headers = new Headers({
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });

    if (error instanceof Error) {
      console.error('Error in API route:', error.message);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch activity data', details: error.message }),
        { status: 500, headers }
      );
    } else {
      console.error('Unknown error:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to fetch activity data', details: 'Unknown error' }),
        { status: 500, headers }
      );
    }
  }
}