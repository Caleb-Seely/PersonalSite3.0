"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin, Clock, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Activity {
  name: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  map: string | null;
}

const StravaWidget = () => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Use the Next.js router

  useEffect(() => {
    const fetchLatestActivity = async () => {
      try {
        const response = await fetch('/api/strava/latest-activity');
        
        // Handle 401 Unauthorized
        if (response.status === 401) {
          router.push('/api/strava/login'); // Redirect to Strava login
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch activity');
        }

        const data = await response.json();
        setActivity(data);
      } catch (err) {
        setError('Unable to load activity data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestActivity();
  }, [router]); // Add router to dependency array

  const formatDistance = (meters: number) => {
    const miles = meters / 1609.34;
    return `${miles.toFixed(1)} mi`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 
      ? `${hours}h ${minutes}m`
      : `${minutes}m`;
  };

  const formatElevation = (meters: number) => {
    const feet = meters * 3.28084;
    return `${Math.round(feet)} ft`;
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !activity) {
    return (
      <Card className="h-full">
        <CardContent className="p-6 flex items-center justify-center">
          <p className="text-gray-500">No activity data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">{activity.name}</h3>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {activity.map && (
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
            <img 
              src={activity.map} 
              alt="Activity route"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center">
            <MapPin className="h-5 w-5 mb-1 text-sage" />
            <span className="font-medium">{formatDistance(activity.distance)}</span>
            <span className="text-xs text-gray-500">Distance</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Clock className="h-5 w-5 mb-1 text-sage" />
            <span className="font-medium">{formatTime(activity.moving_time)}</span>
            <span className="text-xs text-gray-500">Time</span>
          </div>
          
          <div className="flex flex-col items-center">
            <ArrowUp className="h-5 w-5 mb-1 text-sage" />
            <span className="font-medium">{formatElevation(activity.total_elevation_gain)}</span>
            <span className="text-xs text-gray-500">Elevation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StravaWidget;