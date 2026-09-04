import React, { useState, useEffect, useRef, useId } from 'react';

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

interface Meteor {
  id: number;
  x: number;          // ignition point
  y: number;
  dx: number;         // unit direction
  dy: number;
  distance: number;   // total px travelled over its life
  trail: number;      // full trail length in px
  width: number;      // head width in px
  peak: number;       // peak brightness 0-1
  flickerPhase: number;
  flickerRate: number; // flicker cycles over the meteor's life
  life: number;       // ms
  born: number;       // timestamp
}

// Adjustable configuration variables
const TWINKLE_SPEED_FACTOR = 0.01; // Lower value = slower twinkling
const MIN_STAR_DISTANCE = 20; // Minimum distance between stars
const STAR_DENSITY = 8000; // Higher value = fewer stars (area per star in px²)

// --- Shooting star configuration ---
// Meteors arrive as a Poisson process, so gaps are exponentially distributed:
// mostly quiet sky, with the occasional long lull or close pair.
const METEOR_MEAN_INTERVAL = 6500;    // Average ms between meteors
const METEOR_MIN_INTERVAL = 1400;     // Never closer together than this
const METEOR_MAX_INTERVAL = 20000;    // Never further apart than this
const METEOR_FIRST_DELAY_MIN = 2000;  // Quiet beat after the page loads
const METEOR_FIRST_DELAY_MAX = 6000;
// Each meteor picks its own heading from the full circle, so they travel in
// genuinely every direction rather than all sliding down the screen together.
const METEOR_ANGLE_MIN = 0;           // Degrees. 0 = rightward, 90 = downward,
const METEOR_ANGLE_MAX = 360;         //   180 = leftward, 270 = upward. Narrow
                                      //   this range to bias the sky one way.
const METEOR_SPEED_MIN = 700;         // px per second
const METEOR_SPEED_MAX = 1300;
const METEOR_TRAVEL_MIN = 0.22;       // Distance travelled, as a fraction of the
const METEOR_TRAVEL_MAX = 0.48;       //   viewport diagonal
const METEOR_TRAIL_MIN = 0.35;        // Trail length, as a fraction of the travel
const METEOR_TRAIL_MAX = 0.55;
const METEOR_TINT = "#8DB7F5";        // Colour the tail cools into
const METEOR_FIREBALL_CHANCE = 0.12;  // Odds of a fatter, slower, brighter one
const METEOR_FLICKER = 0.16;          // How much the head shimmers (0-1)
const METEOR_MAX_ACTIVE = 4;          // Safety cap on simultaneous meteors

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

// Smooth 0->1 ramp, used for brightness envelopes
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

// Exponentially distributed gap - the natural spacing for random arrivals.
// The floor is added to the distribution rather than clamped onto it, so gaps
// never pile up on one mechanical-looking value.
const nextMeteorDelay = () => {
  const spread = METEOR_MEAN_INTERVAL - METEOR_MIN_INTERVAL;
  const gap = METEOR_MIN_INTERVAL - spread * Math.log(1 - Math.random());
  return Math.min(METEOR_MAX_INTERVAL, gap);
};

let meteorCounter = 0;

const createMeteor = (width: number, height: number, now: number): Meteor => {
  const diagonal = Math.sqrt(width * width + height * height);
  const isFireball = Math.random() < METEOR_FIREBALL_CHANCE;

  const distance = diagonal * randomBetween(METEOR_TRAVEL_MIN, METEOR_TRAVEL_MAX) * (isFireball ? 1.25 : 1);
  const speed = randomBetween(METEOR_SPEED_MIN, METEOR_SPEED_MAX) * (isFireball ? 0.75 : 1);

  const angle = randomBetween(METEOR_ANGLE_MIN, METEOR_ANGLE_MAX) * Math.PI / 180;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);

  // Pick a point the meteor is guaranteed to pass through, then walk backwards
  // along its path to find where it should ignite. Meteors appear mid-sky the
  // way real ones do, rather than sliding in from an edge. Because headings are
  // unconstrained, that point can sit anywhere on the screen.
  const throughX = randomBetween(0.08, 0.92) * width;
  const throughY = randomBetween(0.08, 0.92) * height;
  const backoff = randomBetween(0.3, 0.7);

  return {
    id: meteorCounter++,
    x: throughX - dx * distance * backoff,
    y: throughY - dy * distance * backoff,
    dx,
    dy,
    distance,
    trail: distance * randomBetween(METEOR_TRAIL_MIN, METEOR_TRAIL_MAX),
    width: isFireball ? randomBetween(2.2, 3.2) : randomBetween(1.0, 1.8),
    peak: isFireball ? 1 : randomBetween(0.55, 0.9),
    flickerPhase: Math.random() * Math.PI * 2,
    flickerRate: randomBetween(3, 7),
    life: (distance / speed) * 1000,
    born: now,
  };
};

// Everything needed to draw one meteor at a moment in time
const meteorFrame = (meteor: Meteor, now: number) => {
  const progress = (now - meteor.born) / meteor.life;
  if (progress < 0 || progress > 1) return null;

  const travelled = meteor.distance * progress;
  const headX = meteor.x + meteor.dx * travelled;
  const headY = meteor.y + meteor.dy * travelled;

  // The trail can never be longer than the ground actually covered, so it
  // grows out of the ignition point instead of appearing fully formed.
  const trail = Math.min(meteor.trail, travelled);
  const tailX = headX - meteor.dx * trail;
  const tailY = headY - meteor.dy * trail;

  // Flare up fast, burn out slowly, shimmering the whole way
  const flicker = 1 - METEOR_FLICKER * (0.5 + 0.5 * Math.sin(progress * meteor.flickerRate * Math.PI * 2 + meteor.flickerPhase));
  const opacity = meteor.peak * smoothstep(0, 0.12, progress) * (1 - smoothstep(0.5, 1, progress)) * flicker;

  // A rounded nose tapering to a point at the tail
  const perpX = -meteor.dy;
  const perpY = meteor.dx;
  const halfWidth = meteor.width / 2;
  const nose = meteor.width * 0.9;
  const path =
    `M ${headX + perpX * halfWidth} ${headY + perpY * halfWidth} ` +
    `Q ${headX + meteor.dx * nose} ${headY + meteor.dy * nose} ` +
    `${headX - perpX * halfWidth} ${headY - perpY * halfWidth} ` +
    `L ${tailX} ${tailY} Z`;

  return { headX, headY, tailX, tailY, opacity, path, glow: meteor.width * 3.2 };
};

const InteractiveConstellation = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const nextMeteorTimeRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  // Gradient ids have to be unique per mount; strip the colons React puts in
  // them so they stay valid inside url(#...) references.
  const gradientId = useId().replace(/:/g, '');
  
  // Generate stars on mount and when window resizes
  useEffect(() => {
    const generateStars = () => {
      if (!containerRef.current) return;
      
      // Use full viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Temporary array to check distances
      const tempStars: Star[] = [];

      // Calculate stars based on viewport area
      const maxStars = Math.floor((width * height) / STAR_DENSITY) + 50;
      
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
  
  // Sit the shooting stars out for anyone who asked for less motion
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = query.matches;

    const handleChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      if (event.matches) setMeteors([]);
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);
  
  // Drive the twinkling and the shooting stars
  useEffect(() => {
    const updateAnimation = (timestamp: number) => {
      // Update star twinkling
      setStars(prevStars => 
        prevStars.map(star => ({
          ...star,
          twinklePhase: (star.twinklePhase + TWINKLE_SPEED_FACTOR * star.twinkleSpeed) % (Math.PI * 2)
        }))
      );
      
      // Shooting stars: retire the burnt-out ones, occasionally light a new one
      let spawn: Meteor | null = null;
      if (!reducedMotionRef.current) {
        if (nextMeteorTimeRef.current === null) {
          nextMeteorTimeRef.current = timestamp + randomBetween(METEOR_FIRST_DELAY_MIN, METEOR_FIRST_DELAY_MAX);
        } else if (timestamp >= nextMeteorTimeRef.current) {
          spawn = createMeteor(window.innerWidth, window.innerHeight, timestamp);
          nextMeteorTimeRef.current = timestamp + nextMeteorDelay();
        }
      }

      setMeteors(prevMeteors => {
        const alive = prevMeteors.filter(meteor => timestamp - meteor.born < meteor.life);
        if (spawn && alive.length < METEOR_MAX_ACTIVE) return [...alive, spawn];
        return alive.length === prevMeteors.length ? prevMeteors : alive;
      });
      
      animationFrameRef.current = requestAnimationFrame(updateAnimation);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateAnimation);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // No deps: every update below is functional or via a ref
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden -z-10"
      style={{ pointerEvents: 'none' }}
    >
      <svg width="100%" height="100%"  style={{ position: 'absolute'}}>
        <defs>
          {/* Soft halo around each meteor head */}
          <radialGradient id={`${gradientId}-glow`}>
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="35%" stopColor={METEOR_TINT} stopOpacity="0.30" />
            <stop offset="100%" stopColor={METEOR_TINT} stopOpacity="0" />
          </radialGradient>
        </defs>

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
              fill="#FFFFFF"
              opacity={star.opacity * twinkle}
            />
          );
        })}

        {/* Shooting stars */}
        {meteors.map(meteor => {
          const frame = meteorFrame(meteor, performance.now());
          if (!frame || frame.opacity <= 0.01) return null;

          const trailId = `${gradientId}-trail-${meteor.id}`;

          return (
            <g key={`meteor-${meteor.id}`} opacity={frame.opacity}>
              <defs>
                {/* Runs tail -> head, so the streak cools and thins out behind */}
                <linearGradient
                  id={trailId}
                  gradientUnits="userSpaceOnUse"
                  x1={frame.tailX}
                  y1={frame.tailY}
                  x2={frame.headX}
                  y2={frame.headY}
                >
                  <stop offset="0%" stopColor={METEOR_TINT} stopOpacity="0" />
                  <stop offset="55%" stopColor={METEOR_TINT} stopOpacity="0.35" />
                  <stop offset="88%" stopColor="#E8F1FF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>
              </defs>
              <circle
                cx={frame.headX}
                cy={frame.headY}
                r={frame.glow}
                fill={`url(#${gradientId}-glow)`}
              />
              <path d={frame.path} fill={`url(#${trailId})`} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default InteractiveConstellation;