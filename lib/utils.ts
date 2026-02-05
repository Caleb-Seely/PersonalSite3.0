import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format utilities for activity data
export const formatDistance = (meters: number): string => {
  const miles = meters / 1609.34;
  return `${miles.toFixed(1)} mi`;
};

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatElevation = (meters: number): string => {
  const feet = meters * 3.28084;
  return `${Math.round(feet)} ft`;
};
