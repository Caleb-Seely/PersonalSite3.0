"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MapPin, Clock, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

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
  const router = useRouter();

  useEffect(() => {
    const fetchLatestActivity = async () => {
      try {
        const response = await fetch('/api/strava/latest-activity');
        
        if (response.status === 401) {
          router.push('/api/strava/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch activity');
        }

        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Unable to load activity data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestActivity();
  }, [router]);

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

  const MetricDisplay = ({ 
    Icon, 
    value, 
    label 
  }: { 
    Icon: typeof MapPin; 
    value: string; 
    label: string; 
  }) => (
    <div className="flex flex-col items-center group">
      <Icon className="h-5 w-5 mb-1 text-sage transition-all duration-200 ease-in-out group-hover:text-emerald-500 group-hover:scale-110" />
      <span className="font-medium transition-all duration-200 ease-in-out group-hover:text-emerald-500 group-hover:scale-110">
        {value}
      </span>
      <span className="text-xs text-gray-500 transition-all duration-200 ease-in-out">
        {label}
      </span>
    </div>
  );

  return (
    <Card className="h-full">
      <CardHeader className="p-4 pb-2">
        <h3 className="text-lg font-semibold">{activity.name}</h3>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {activity.map && (
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
            <Image
                src={activity.map}
                alt="Activity route"
                width={640} // Adjust to your preferred width
                height={480} // Adjust to your preferred height
                className="w-full h-full object-contain md:object-cover" // Ensures full visibility on mobile and proper scaling on larger screens
            />
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <MetricDisplay 
            Icon={MapPin} 
            value={formatDistance(activity.distance)} 
            label="Distance" 
          />
          <MetricDisplay 
            Icon={Clock} 
            value={formatTime(activity.moving_time)} 
            label="Time" 
          />
          <MetricDisplay 
            Icon={ArrowUp} 
            value={formatElevation(activity.total_elevation_gain)} 
            label="Elevation" 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StravaWidget;