"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import Image from "next/image";
import type { Swiper as SwiperInstance } from 'swiper';
import NavMenu from "../components/nav_menu";
import Footer from "@/components/footer";
import { colors } from '@/app/styles/colors';
import { trackEvent } from './google-analytics';
import { placesNavLinks } from '@/lib/navigation';

// Preload images constant - now properly implemented
const IMAGE_URLS = [
  "/img/steens.webp",
  "/img/Bend.webp",
  "/img/Moscow.webp",
  "/img/Ha_Giang.webp",
  "/img/Flagstaff.webp"
];

interface Place {
  id: number;
  title: string;
  image: string;
  description: string;
}

const PlacesPage = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [imageTransitioning, setImageTransitioning] = useState(false);

    const places: Place[] = [
    {
      id: 1,
      title: "Steens Mountain",
      image: "/img/steens.webp",
      description: "There's a place where the air is thin, the trails are wild, and the mountains shape more than just the land. Steens isn't just a fault-block in the Oregon desert; it's a proving ground, a sanctuary, a place where the grit inside you is either found or forged.\n\nI remember cramming onto those yellow busses for the first time. Suffering through trails that weren't really trails at all—just lines in the dust where other runners had gone before. It was in this raw and untamed place that I learned what it meant to push past my limits, to embrace the struggle, and to trust that I will get my breath back, the climb will always be worth it.\n\nYears later, I am lucky to give back a fraction of what this mountain gave me. As a coach, I watch new campers trip on the same trails, wide-eyed and uncertain, the way I once did. They crawl out of their tents, their legs caked in dust that will never fully wash off, laugh around the campfire, cheer on one another, and realize—maybe for the first time—that they are stronger than they ever knew.\n\nNo website, no photo, no story can capture the magic of this place. The bitter early mornings, the way the dirt clings to everyone in the same unspoken camaraderie, the view from the Rims that makes you feel both infinite and impossibly small. But even more than the mountain itself, it's the people who make it what it is. Every camper, every coach—each one a unique blend of grit and gratitude, brought together by a love of running but bonded by something far greater.\n\nSteens isn't just a mountain. It's a home for those who believe in the power of the struggle, the beauty of the unknown, and the kind of friendships that only form when you've suffered through something unforgettable together. And long after our legs have stopped climbing, the mountain stays with us—etched into who we are, a part of us forever."
    },
    {
      id: 2,
      title: "The PNW",
      image: "/img/Bend.webp",
      description: "It's the mist that rises from the rivers, the towering peaks that greet the morning sun, and the endless forests that stretch my mind and my legs. It's a part of me, woven into every memory, every adventure, every breath of fresh mountain air.\n\nThe mountains have always been my sanctuary, their jagged peaks standing tall and proud. Whether it's a long, meandering trail or a quiet moment beside a river, the Pacific Northwest has always had a way of making me feel at home. There's a peace here, in the solitude of the woods, the sound of rushing water, and the whisper of the wind through the evergreens. It's the kind of peace that comes when you're far enough from the world to forget its noise.\n\nAnd then there are the rivers—wild and untamed, watching the world unfold at their banks. Every bend feels like an invitation to explore, to discover something new about the land, and perhaps, something new about myself.\n\nThe beauty of the Pacific Northwest is in its endlessness—endless mountains, endless rivers, endless places to grow. It's a place where adventure isn't just a possibility, it's a way of life. Whether it's the thrill of a summit view, the quiet reflection by a riverside, or the simple joy of wandering through a dense forest, there's always something new to discover, always another trail to follow, always a new adventure to chase."
    },
    {
      id: 3,
      title: "Moscow, ID",
      image: "/img/Moscow.webp",
      description: "For those familiar, it's more than a college town—it was a place where families were built over post-run breakfasts, where conversations stretched in every direction, and where, for a time, the world beyond the wheat fields didn't matter. It was a town that tested me, shaped me, and became a part of me.\n\nI am forever grateful for the people I found and the memories we made—the late-night debates that stretched until morning, the spontaneous road trips down empty highways, and the quiet moments when everything just felt right.\n\nAnd then there was the running—the sweat shared with my teammates, the mornings when the outside world was frozen solid, forcing us into the Dome for lap after lap, mile after mile. We bonded over exhaustion, over our setbacks and our successes. We carried each other through injuries, bad races, and long travel trips. We ran together, we suffered together, and we thrived together.\n\nMoscow was more than a place—it was a feeling, a rhythm, a heartbeat. It was only four years of my life, but it felt like a lifetime that lasted only a moment. No matter how far I run, a part of me will remain on the Palouse.\n\nGo Vandals!"
    },
    {
      id: 4,
      title: "SEA",
      image: "/img/Ha_Giang.webp",
      description: "I stepped off the plane into a new world—the language was foreign, the faces unfamiliar, and I was on my own. I had to embrace the unknown, to live outside my comfort zone, to see what this world could offer.\n\nThe days that followed were a blur of new experiences, strange places, and unspoken connections. Every moment was an adventure in itself—each day bringing new stories, new challenges, and new discoveries. I learned to trust myself in ways I never thought possible. I learned that not knowing the next step didn't mean I wasn't moving forward—it meant I was living fully, completely present in each new experience.\n\nI learned to scuba dive and explored an underwater world I had only ever dreamed of. I wandered through remote villages in Vietnam, where the people, though they spoke a language I couldn't understand, welcomed me with warmth and kindness. Every encounter, every smile, every word—broken or not—became a bridge connecting me to the heart of these countries.\n\nI got dangerously ill from some questionable street food—another opportunity for new, unglamorous stories. Yet even in my worst moments, struggling to do even the most basic necessities, I found a way. I learned to trust that no matter what, I could handle it.\n\nSEA taught me to take those first steps, even when you're terrified. And as I left, I knew that part of me would forever remain in those distant lands, in the smiles of strangers and the stories of adventure that I'd carry with me forever."
    },
    {
      id: 5,
      title: "Flagstaff, AZ",
      image: "/img/Flagstaff.webp",
      description: "We were a small group of post-college kids, broke but hungry, trying to make it work. Flagstaff called to us—altitude training at one of the best spots for endurance athletes—and the opportunity was too good to pass up. The guys I was with were in a different league—fitter, stronger, ready to attack the mountain air. I wasn't in the same shape, but I had no choice but to hop on the train and pray I could keep up.\n\nFrom the jump, every workout kicked me around. Each rep slower than I'd run in recent memory, and more painful than I ever imagined. But that's what Flagstaff does—it tests you, challenges you, and forces you to face what you're really made of.\n\nThe trails were something else. I wanted to explore all of them—the rugged paths, the dirt roads that stretched into the pines, each one feeling like an invitation to discover something new. The high altitude made it tough, but it also made everything more beautiful. There was something special about running up a mountain, barely breathing, surrounded by scenery that made you forget how hard you were working.\n\nThere was a bond in that shared struggle, a quiet understanding that no one else would get. We worked hard in the mornings, sometimes in the afternoons too, pushing ourselves to the limit. And when the day was done, we celebrated the grind, the struggle, and the victories that felt far too small in the moment but meant everything in the end.\n\nBy the time I left, I came home in the best shape of my life—even if it didn't feel like it at 7,000 feet. The altitude had kicked my ass, but it also made me stronger than I'd ever been before. Flagstaff taught me about resilience, about embracing the grind, and about finding strength in the struggle."
    }
  ];

  const [currentPlace, setCurrentPlace] = useState(places[0]);
  const [displayText, setDisplayText] = useState('');
  const imageRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperInstance | null>(null);  
  
  // Better image preloading implementation
      useEffect(() => {
        const preloadImages = async () => {
          const imagePromises = IMAGE_URLS.map(src => {
            return new Promise<void>((resolve, reject) => {
              const img = new globalThis.Image();
              img.onload = () => resolve();
              img.onerror = reject;
              img.src = src;
            });
          });
        
          try {
            await Promise.all(imagePromises);
            setImagesPreloaded(true);
          } catch (err) {
            console.error('Failed to preload images:', err);
            // Still set as preloaded after a timeout to prevent infinite loading state
            setTimeout(() => setImagesPreloaded(true), 3000);
          }
        };
        
        preloadImages();
      }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setDisplayText(currentPlace.description);
  }, [currentPlace]);

  const handlePlaceClick = (place: Place) => {
    // Track place selection
    trackEvent('place_select', 'places', place.title);

    // Set transitioning state to trigger fade effect
    setImageTransitioning(true);

    // Single timeout to handle the entire transition
    setTimeout(() => {
      setCurrentPlace(place);
      setIsExpanded(false);
      setImageTransitioning(false);
    }, 300);
  };

  const getTitleColor = (title: string) => {
    return title === "Steens Mountain" ? colors.steensAccent : colors.accent2;
  };
  
  return (
    <div className="min-h-screen bg-black text-white ">
      
      <NavMenu links={placesNavLinks} />

      {/* Main content */}
      <div className="container mx-auto px-4 pt-12">
        {/* Preloader overlaid on the UI while images are loading */}
        {!imagesPreloaded && (
          <div className="absolute inset-0  flex items-center justify-center z-5">
            <div className="text-white text-xl animate-pulse">Loading places...</div>
          </div>
        )}
      
        {/* Featured Image - added transition effects */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg" ref={imageRef}>
            <Image
              key={`main-${currentPlace.id}`}
              src={currentPlace.image}
              alt={currentPlace.title}
              fill
              className={`object-cover transition-opacity transition-transform duration-300 ${
                imageTransitioning ? 'opacity-30 scale-105' : 'opacity-100'
              }`}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTAxMTMwNjs7PjU1OjxKRkZKdEVDRVlZW1xfYWFXYWhpYWH/2wBDARUXFx4aHR4eHWFgOSFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
              <h1 className={`text-3xl font-bold ${getTitleColor(currentPlace.title)}`}>
                {currentPlace.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-6">
          <div
            className="bg-gray-900 p-6 rounded-lg cursor-pointer group relative hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
            style={{ minHeight: '180px' }}
          >
            <div 
              className={`transition-all duration-300 ${
                isExpanded ? '' : 'max-h-32 overflow-hidden'
              }`}
            >
              {displayText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 flex justify-center">
              {isExpanded ? (
                <ChevronUp className="text-[#10B981] group-hover:text-[#10B981]/80 transition-colors" size={24} />
              ) : (
                <ChevronDown className="text-[#10B981] group-hover:text-[#10B981]/80 transition-colors" size={24} />
              )}
            </div>
          </div>
        </div>

        {/* Other Places section - FIXED Swiper configuration */}
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-2xl font-bold p-2 text-white z-1">Other Special Places</h2>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={windowWidth < 768 ? 1 : 3}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              speed={300}
              loop={true}
              className="relative"
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {places.filter(p => p.id !== currentPlace.id).map((place) => (
                <SwiperSlide key={place.id} className='p-2 overflow-visible'>
                  <div
                    className="cursor-pointer transform transition-transform duration-300 hover:scale-105 relative focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                    onClick={() => handlePlaceClick(place)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePlaceClick(place);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${place.title}`}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden z-5">
                      <Image
                        key={`thumb-${place.id}`}
                        src={place.image}
                        alt={place.title}
                        fill
                        className="w-full h-full z-10 transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4 z-10">
                        <h3 className={`text-lg font-semibold ${getTitleColor(place.title)}`}>
                          {place.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button
              className="swiper-button-next absolute left-0 top-0 h-full w-8 z-30 flex items-center justify-center hover:bg-black/10 transition-all"
            >
              <ChevronLeft size={36} className="text-white" />
            </button>

            <button
              className="swiper-button-prev absolute right-0 top-0 h-full w-8 z-30 flex items-center justify-center hover:bg-black/10 transition-all"
            >
              <ChevronRight size={36} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default PlacesPage;