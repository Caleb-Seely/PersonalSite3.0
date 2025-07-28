"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp} from 'lucide-react';
import Image from "next/image";
import NavMenu from "../components/nav_menu";
import Footer from "@/components/footer";
import { colors } from '@/app/styles/colors';

const navLinks = [
   { href: "/", label: "Home" },
   { href: "/projects", label: "Projects" },
   { href: "/places", label: "Places" },
   { href: "/misc/Caleb_Seely_Resume.pdf", label: "Resume", target: "_blank", rel: "noopener noreferrer" },
];

const RunningTimesDisplay = () => {
  const runningData = [
    { distance: '100m', meters: 100, time: "00:00:12.91", showButton: true, label: '100m' },
    { distance: '200m', meters: 200, time: "00:00:25.06", showButton: false },
    { distance: '400m', meters: 400, time: "00:00:52.51", showButton: true, label: '400m' },
    { distance: '800m', meters: 800, time: "00:01:52.62", showButton: true, label: '800m' },
    { distance: '1500m', meters: 1500, time: "00:03:51.58", showButton: true, label: '1500m' },
    { distance: '3000m', meters: 3000, time: "00:08:47.91", showButton: true, label: '3k' },
    { distance: '5000m', meters: 5000, time: "00:15:47.00", showButton: true, label: '5K' },
    { distance: '8000m', meters: 8000, time: "00:24:39.00", showButton: true, label: '8k' },
    { distance: '10000m', meters: 10000, time: "00:32:40.60", showButton: true, label: '10K' },
    { distance: 'a half marathon', meters: 21097.5, time: "01:14:47.00", showButton: true, label: 'Half' },
    { distance: 'a marathon', meters: 42195, time: "02:37:41.00", showButton: true, label: 'Full' }
  ];

  const [currentDistance, setCurrentDistance] = useState<number | null>(null);
  const [displayTime, setDisplayTime] = useState('00:00:00.00');
  const [isExpanded, setIsExpanded] = useState(false);

  // Utility functions with added type annotations
  const timeToSeconds = (timeStr: string): number => {
    const [hours, minutes, seconds] = timeStr.split(':');
    return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
  };

  const secondsToTimeString = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
  };

  const formatTimeForDisplay = (timeStr: string): string => {
    if (!timeStr) return '';
    const [hours, minutes, seconds] = timeStr.split(':');
    if (hours === "00") {
      if (minutes === "00") {
        return parseFloat(seconds).toFixed(2);
      }
      return `${parseInt(minutes)}:${parseFloat(seconds).toFixed(2).padStart(5, '0')}`;
    }
    return timeStr;
  };

  const interpolateTime = (distance: number): string => {
    let lower = runningData[0];
    let upper = runningData[runningData.length - 1];

    for (let i = 0; i < runningData.length - 1; i++) {
      if (runningData[i].meters <= distance && runningData[i + 1].meters >= distance) {
        lower = runningData[i];
        upper = runningData[i + 1];
        break;
      }
    }

    const lowerSeconds = timeToSeconds(lower.time);
    const upperSeconds = timeToSeconds(upper.time);
    
    const ratio = (distance - lower.meters) / (upper.meters - lower.meters);
    const interpolatedSeconds = lowerSeconds + (upperSeconds - lowerSeconds) * ratio;
    
    return secondsToTimeString(interpolatedSeconds);
  };

  const animateToTime = (targetTime: string, duration = 1500): void => {
    const startSeconds = timeToSeconds(displayTime || "00:00:00.00");
    const endSeconds = timeToSeconds(targetTime);
    const startTimestamp = Date.now();

    const updateNumber = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const currentSeconds = startSeconds + (endSeconds - startSeconds) * progress;
        setDisplayTime(secondsToTimeString(currentSeconds));
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayTime(targetTime);
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const handleSliderChange = (newValue: number[]): void => {
    const distance = newValue[0];
    setCurrentDistance(distance);
    const newTime = interpolateTime(distance);
    animateToTime(newTime);
  };

  const handleDistanceClick = (meters: number): void => {
    setCurrentDistance(meters);
    const newTime = interpolateTime(meters);
    animateToTime(newTime);
  };

  const getCurrentLabel = () => {
    if (!currentDistance) return '';
    const nearest = runningData.reduce((prev, curr) => 
      Math.abs(curr.meters - currentDistance) < Math.abs(prev.meters - currentDistance) ? curr : prev
    );
    
    if (Math.abs(nearest.meters - currentDistance) < 50) {
      return nearest.distance;
    }
    return currentDistance >= 1000 
      ? `${(currentDistance/1000).toFixed(1)}km`
      : `${Math.round(currentDistance)}m`;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative h-screen bg-black text-white overflow-auto">
        <NavMenu links={navLinks} />

      {/* Banner Image - added padding-top to account for fixed header */}
      <div className="relative h-48 w-full overflow-hidden pt-16">
        <div className="absolute inset-0 z-10" />
        <Image
          src="/img/Hayward_Banner.webp"
          alt="Running Banner"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          unoptimized={true}
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTAxMTMwNjs7PjU1OjxKRkZKdEVDRVlZW1xfYWFXYWhpYWH/2wBDARUXFx4aHR4eHWFgOSFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          sizes="100vw"
          className="w-full h-full"
        />
      </div>

      <div className="max-w-4xl mx-auto p-2 space-y-4">
        {/* Header Section with fixed height */}
        <div className="text-left min-h-[160px] flex flex-col justify-start">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            How fast can I run {currentDistance && <span className="font-bold">{getCurrentLabel()}</span>}
          </h1>
          <div className="h-10 flex items-center"> {/* Increased height for time display */}
            {displayTime && (
              <p className="text-5xl font-bold">
                <span className="font-mono font-bold text-[#8DB7F5]">
                  {formatTimeForDisplay(displayTime)}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Experience Section with expand/collapse - clickable card */}
        <Card 
          className="p-4 pb-2 bg-gray-900 border-gray-800 cursor-pointer" 
          onClick={toggleExpand}
        >
            <p className="text-lg text-white">
                I <span className="text-[#8DB7F5]">❤</span> running.
            </p>
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-20'}`}>
              <p className="text-gray-400 mt-2">
                  Running has been more than a sport to me&mdash;it&apos;s been a constant. From the first awkward, lung-burning laps in middle school to the crisp, predawn slogs through winter rain, this sport has shaped my days, my mindset, and my ambitions.
              </p>
              <div className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  <p className="text-gray-400 mt-2">
                  For over a decade, I&apos;ve chased every experience running has will offer me. The anxious thrill of race day. The quiet meditation of solo miles. The unshakable camaraderie of teammates and training partners. Every step&mdash;easy or injured&mdash;has added to the story.
                  </p>
                  <p className="text-gray-400 mt-2">
                  I&apos;m endlessly grateful for the coaches who have challenged me, the friends who have pushed me, and the countless roads and trails that have left their mark on me as much as I have on them. Running isn&apos;t just something I do; it&apos;s a part of who I am.
                  </p>
              </div>
            </div>
            <Button 
                variant="ghost" 
                className="w-full p-1 h-5 text-gray-400 hover:text-gray-400 hover:bg-gray-700 duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event
                  toggleExpand();
                }}
            >
                {isExpanded ? (
                <ChevronUp className="h-6 w-6" />
                ) : (
                <ChevronDown className="h-6 w-6" />
                )}
            </Button>
        </Card>
        
      {/* Distance Buttons - using flex-wrap to allow buttons to wrap to next line */}
      <div className="flex flex-wrap gap-2 pb-2">
      {runningData
         .filter(data => data.showButton)
         .map((data) => (
            <Button
            key={data.distance}
            variant={currentDistance === data.meters ? "default" : "outline"}
            onClick={() => handleDistanceClick(data.meters)}
            className={`
               px-4 py-2 whitespace-nowrap 
               bg-gray-900 border-gray-700 
               hover:bg-gray-900 hover:${colors.accent2}
               ${currentDistance === data.meters ? colors.accent2 : colors.text}
               mb-1
            `}
            size="sm"
            >
            {data.label}
            </Button>
         ))}
      </div>

        {/* Slider Section */}
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-300">
            Slide to see (almost) any distance
          </p>
          <Slider
            value={[currentDistance || 100]}
            max={42195}
            min={100}
            step={0.01}
            onValueChange={handleSliderChange}
            className="py-4 [&>.relative>.bg-primary]:bg-[#10B981]"
            />
          <div className="flex justify-between text-sm text-gray-400">
            <span>100m</span>
            <span>Marathon</span>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((num) => (
            <div 
            key={num}
            className="relative w-full h-80 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
            <Image
                src={`/img/running${num}.webp`}
                alt={`Running photo ${num}`}
                fill
                style={{ objectFit: 'contain' }}
                className="w-full h-full"
                unoptimized
            />
            </div>
        ))}
        </div>
      </div>

      {/* Footer with improved hover effects */}
      <Footer/>
    </div>
  );
};

export default RunningTimesDisplay;