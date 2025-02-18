"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ChevronUp, Mail, Github, FileText, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";

// Dark theme color palette
const colors = {
    primary: "bg-black",
    secondary: "bg-zinc-900",
    accent: "text-[#8DB7F5]",
    accentBg: "bg-[#8DB7F5]",
    accent2: "text-[#10B981]",
    text: "text-white",
    textMuted: "text-zinc-400",
    hover: "hover:bg-zinc-800",
  };

const RunningTimesDisplay = () => {
  const runningData = [
    { distance: '100m', meters: 100, time: "00:00:12.91", showButton: true, label: '100m' },
    { distance: '200m', meters: 200, time: "00:00:25.06", showButton: false },
    { distance: '400m', meters: 400, time: "00:00:52.51", showButton: false, label: '400m' },
    { distance: '800m', meters: 800, time: "00:01:52.62", showButton: true, label: '800m' },
    { distance: '1500m', meters: 1500, time: "00:03:51.58", showButton: true, label: '1500m' },
    { distance: '3000m', meters: 3000, time: "00:08:47.91", showButton: false },
    { distance: '5000m', meters: 5000, time: "00:15:47.00", showButton: true, label: '5K' },
    { distance: '8000m', meters: 8000, time: "00:24:39.00", showButton: false },
    { distance: '10000m', meters: 10000, time: "00:32:40.60", showButton: false, label: '10K' },
    { distance: 'a half marathon', meters: 21097.5, time: "01:14:47.00", showButton: true, label: 'Half' },
    { distance: 'a marathon', meters: 42195, time: "02:37:41.00", showButton: true, label: 'Full' }
  ];

  const [currentDistance, setCurrentDistance] = useState(null);
  const [displayTime, setDisplayTime] = useState('00:00:00.00');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Utility functions remain the same
  const timeToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(':');
    return parseFloat(hours) * 3600 + parseFloat(minutes) * 60 + parseFloat(seconds);
  };

  const secondsToTimeString = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toFixed(2).padStart(5, '0')}`;
  };

  const formatTimeForDisplay = (timeStr) => {
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

  // Rest of the utility functions remain the same as in your original code
  const interpolateTime = (distance) => {
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

  const animateToTime = (targetTime, duration = 1500) => {
    
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

  const handleSliderChange = (newValue) => {
    const distance = newValue[0];
    setCurrentDistance(distance);
    const newTime = interpolateTime(distance);
    animateToTime(newTime);
  };

  const handleDistanceClick = (meters) => {
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

  return (
    <div className="h-screen bg-black text-white overflow-auto scrollbar-none">
        {/* Navigation */}
        <div className="absolute top-0 w-full p-4 flex justify-between items-center">
            <div className="text-cream text-2xl font-bold">CS</div>
            <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50 text-cream"
            >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Menu Items */}
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-black bg-opacity-95 z-40 rounded-lg shadow-lg p-4">
            <nav className="text-white text-l space-y-1">
              <Link href="/" className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}>
                Home
              </Link>
              <Link href="/projects" className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}>
                Projects
              </Link>
              <Link href="/places" className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}>
                Places
              </Link>
              <a
                href="/misc/Caleb_Seely_Resume.pdf"
                className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </nav>
          </div>
        )}

      {/* Banner Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 z-10" />
        <Image
            src="/img/running_banner5.jpg"
            alt="Running Banner"
            layout="fill"
            objectFit="cover"
            unoptimized
            className="w-full h-full"
            />
      </div>

      <div className="max-w-4xl mx-auto p-5 space-y-8">
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

        {/* Experience Section with expand/collapse */}
        <Card className="p-4 pb-2 bg-gray-900 border-gray-800"> {/* Reduced bottom padding */}
            <p className="text-lg text-white">
                I <span className="text-[#8DB7F5]">❤</span> running.
            </p>
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-20'}`}>
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
                className="w-full p-1 h-5 text-gray-400 hover:text-gray-400 hover:bg-gray-700 duration-200"  // No color change on hover
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? (
                <ChevronUp className="h-6 w-6" />
                ) : (
                <ChevronDown className="h-6 w-6" />
                )}
            </Button>
        </Card>
        
        {/* Distance Buttons */}
        <div className="flex justify-between gap-2 overflow-x-auto pb-2">
          {runningData
            .filter(data => data.showButton)
            .map((data) => (
              <Button
                key={data.distance}
                variant={currentDistance === data.meters ? "default" : "outline"}
                onClick={() => handleDistanceClick(data.meters)}
                className="px-4 py-2 whitespace-nowrap bg-gray-900 border-gray-700 hover:bg-gray-800"
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
            className="py-4 [&>.relative>.bg-primary]:bg-emerald-500" // Added green color
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
            className="relative w-full h-80  rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
            <Image
                src={`/img/running${num}.jpg`}
                alt={`Running photo ${num}`}
                layout="fill"
                objectFit="contain"  // Changed to contain
                className="w-full h-full"
                unoptimized
            />
            </div>
        ))}
        </div>



        
      </div>

      {/* Footer */}
      <footer className={` text-cream py-12`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-12">
            <a href="mailto:calebseely@gmail.com" className="hover:text-sand transition-colors" target="_blank">
              <Mail size={28} />
            </a>
            <a href="https://www.linkedin.com/in/caleb-seely" className="hover:text-sand transition-colors" target="_blank">
              <Linkedin size={28} />
            </a>
            <a href="misc/Caleb_Seely_Resume.pdf" className="hover:text-sand transition-colors" target="_blank">
              <FileText size={28} />
            </a>
            <a href="https://github.com/Caleb-Seely" className="hover:text-sand transition-colors" target="_blank">
              <Github size={28} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RunningTimesDisplay;