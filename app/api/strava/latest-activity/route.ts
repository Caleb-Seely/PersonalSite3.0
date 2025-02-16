// app/api/strava/latest-activity/route.ts
import { NextResponse } from 'next/server';

const STRAVA_API_URL = 'https://www.strava.com/api/v3';
const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

async function getAccessToken() {
  try {
    console.log('Strava/latests-activity/route using refresh_token for n access_token');
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
    const mapResponse = await fetch(mapUrl);
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
    const response = await fetch(`${STRAVA_API_URL}/athlete/activities?per_page=1`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
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
    
    console.log('Successfully fetched activities:', {
      count: activities.length,
      hasData: Boolean(activities[0]),
    });

    if (activities.length === 0) {
      return null;
    }

    const activity = activities[0];
    
    // Validate required fields
    const requiredFields = ['name', 'distance', 'moving_time', 'total_elevation_gain', 'map'];
    const missingFields = requiredFields.filter(field => !(field in activity));

    if (missingFields.length > 0) {
      console.error('Missing required fields in activity:', missingFields);
      throw new Error(`Activity missing required fields: ${missingFields.join(', ')}`);
    }

    // Handle map polyline and Google Maps validation
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
    };
  } catch (error) {
    console.error('Error fetching latest activity:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const activity = await getLatestActivity(accessToken);

    if (!activity) {
      return NextResponse.json(
        { message: 'No activities found' },
        { status: 404 }
      );
    }

    console.log('Successfully transformed activity data');
    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity data', details: error.message },
      { status: 500 }
    );
  }
}