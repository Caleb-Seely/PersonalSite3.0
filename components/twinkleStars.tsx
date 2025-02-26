import React, { useState, useEffect, useRef } from 'react';

// Define proper types
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface Beam {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  duration: number;
  startTime: number;
}

// Adjustable configuration variables
const TWINKLE_SPEED_FACTOR = 0.01; // Lower value = slower twinkling
const BEAM_FREQUENCY = 800; // Higher value = less frequent beams (in ms)
const MIN_STAR_DISTANCE = 15; // Minimum distance between stars
const BEAM_COLOR = "#FFFFFF"; // Color of the beam
const BEAM_LENGTH = 40; // Length of beam in pixels

const InteractiveConstellation = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [beams, setBeams] = useState<Beam[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastBeamTimeRef = useRef<number>(0);
  
  // Generate stars on mount and when window resizes
  useEffect(() => {
    const generateStars = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const width = containerRect.width;
      // Only use the top portion of the container, above the filters
      const height = Math.min(containerRect.height, 300);
      
      // Temporary array to check distances
      const tempStars: Star[] = [];
      
      // Create more stars but make them smaller
      const maxStars = Math.floor((width * height) / 5000) + 30;
      
      // Try to create maxStars, but with minimum distance check
      let attempts = 0;
      const maxAttempts = maxStars * 5; // Limit attempts to avoid infinite loop
      
      while (tempStars.length < maxStars && attempts < maxAttempts) {
        attempts++;
        
        const newStar: Star = {
          id: tempStars.length,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.1 + 0.5, // Smaller stars: 0.5 to 2px
          opacity: Math.random() * 0.9 + 0.9,
          twinkleSpeed: Math.random() * 2 + 0.5, // Slower speed range
          twinklePhase: Math.random() * Math.PI * 2,
        };
        
        // Check if this star is too close to any existing star
        const isTooClose = tempStars.some(existingStar => {
          const distance = Math.sqrt(
            Math.pow(existingStar.x - newStar.x, 2) + 
            Math.pow(existingStar.y - newStar.y, 2)
          );
          return distance < MIN_STAR_DISTANCE;
        });
        
        // If not too close to any other star, add it
        if (!isTooClose) {
          tempStars.push(newStar);
        }
      }
      
      setStars(tempStars);
    };
    
    // Initial generation
    generateStars();
    
    // Update on resize
    const handleResize = () => {
      generateStars();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle twinkling animation and beam lifecycle
  useEffect(() => {
    const updateAnimation = (timestamp: number) => {
      // Update star twinkling
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          twinklePhase: (star.twinklePhase + TWINKLE_SPEED_FACTOR * star.twinkleSpeed) % (Math.PI * 2)
        }))
      );
      
      // Clean up finished beams
      setBeams(prevBeams => 
        prevBeams.filter(beam => timestamp - beam.startTime < beam.duration)
      );
      
      // Create a new beam if hovering and enough time has passed
      if (hoveredStar !== null && timestamp - lastBeamTimeRef.current > BEAM_FREQUENCY) {
        const sourceIdx = stars.findIndex(s => s.id === hoveredStar);
        if (sourceIdx >= 0) {
          const source = stars[sourceIdx];
          
          // Find a random target star (not the hovered one)
          const availableTargets = stars.filter(s => {
            if (s.id === hoveredStar) return false;
            
            // Calculate distance
            const distance = Math.sqrt(
              Math.pow(source.x - s.x, 2) + 
              Math.pow(source.y - s.y, 2)
            );
            
            // Only connect to stars within a reasonable distance
            return distance > 20 && distance < 150;
          });
          
          if (availableTargets.length > 0) {
            const targetIdx = Math.floor(Math.random() * availableTargets.length);
            const target = availableTargets[targetIdx];
            
            // Calculate vector from source to target
            const dx = target.x - source.x;
            const dy = target.y - source.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Normalize the vector
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Calculate beam endpoint (shorter than full distance)
            const beamLength = Math.min(BEAM_LENGTH, distance * 0.7);
            const endX = source.x + nx * beamLength;
            const endY = source.y + ny * beamLength;
            
            // Add new beam
            setBeams(prevBeams => [
              ...prevBeams,
              {
                id: `beam-${hoveredStar}-${target.id}-${timestamp}`,
                fromX: source.x,
                fromY: source.y,
                toX: endX,
                toY: endY,
                duration: 600, // Short duration for quick beam effect
                startTime: timestamp
              }
            ]);
            
            lastBeamTimeRef.current = timestamp;
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateAnimation);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hoveredStar, stars]);
  
  return (
    <div 
      ref={containerRef}
      className="absolute top-0 left-0 right-0 h-52 overflow-hidden z-0"
      style={{ pointerEvents: 'none' }}
    >
      <svg width="100%" height="100%"  style={{ position: 'absolute'}}>
        {/* Animated beams */}
        {beams.map(beam => {
          const progress = (performance.now() - beam.startTime) / beam.duration;
          
          // Fade in and out
          const opacity = progress < 0.2 
            ? progress / 0.2 // Fade in quickly
            : progress > 0.8 
              ? (1 - progress) / 0.2 // Fade out quickly
              : 1; // Full opacity in the middle
          
          return (
            <line
              key={beam.id}
              x1={beam.fromX}
              y1={beam.fromY}
              x2={beam.toX}
              y2={beam.toY}
              stroke={BEAM_COLOR}
              strokeWidth={0.8}
              strokeOpacity={opacity}
            />
          );
        })}
        
        {/* Stars */}
        {stars.map(star => {
          // Calculate twinkling effect
          const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6; // More subtle twinkling
          
          return (
            <circle
              key={`star-${star.id}`}
              cx={star.x}
              cy={star.y}
              r={star.size}
              fill={hoveredStar === star.id ? "#10B981" : "#FFFFFF"}
              opacity={star.opacity * twinkle}
            //   style={{ pointerEvents: 'auto', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredStar(star.id)}
              onMouseLeave={() => setHoveredStar(null)}
              
            />
          );
        })}
      </svg>
    </div>
  );
};

export default InteractiveConstellation;