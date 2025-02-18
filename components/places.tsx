"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Mail, Linkedin, FileText, Github } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import Image from "next/image";

// // Preload images constant
// const IMAGE_URLS = [
//   "/img/steens.jpg",
//   "/img/Bend.jpg",
//   "/img/Moscow.jpg",
//   "/img/Ha_Giang.jpg",
//   "/img/Flagstaff.jpg"
// ];

const colors = {
    primary: "bg-black",
    secondary: "bg-zinc-900",
    accent: "text-[#8DB7F5]",
    accentBg: "bg-[#8DB7F5]",
    accent2: "text-[#10B981]",
    steensAccent: "text-[#FFAB5B]",
    text: "text-white",
    textMuted: "text-zinc-400",
    hover: "hover:bg-zinc-800",
};

const PlacesPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024);



    const places = [
    {
      id: 1,
      title: "Steens Mountain",
      image: "/img/steens.jpg",
      description: "There’s a place where the air is thin, the trails are wild, and the mountains shape more than just the land. Steens isn’t just a fault-block in the Oregon desert; it’s a proving ground, a sanctuary, a place where the grit inside you is either found or forged.\n\nI remember cramming onto those yellow busses for the first time. Suffering thru trails that weren’t really trails at all—just lines in the dust where other runners had gone before. It was in this raw and untamed place that I learned what it meant to push past my limits, to embrace the struggle, and to trust that I will get my breath back, the climb will always be worth it.\n\nYears later, I am lucky to give back a fraction of what this mountain gave me. As a coach, I watch new campers trip on the same trails, wide-eyed and uncertain, the way I once did. They crawl out of their tents, their legs caked in dust that will never fully wash off, laugh around the campfire, cheer on one another, and realize—maybe for the first time—that they are stronger than they ever knew.\n\nNo website, no photo, no story can capture the magic of this place. The bitter early mornings, the way the dirt clings to everyone in the same unspoken camaraderie, the view from the Rims that makes you feel both infinite and impossibly small. But even more than the mountain itself, it’s the people who make it what it is. Every camper, every coach—each one a unique blend of grit and gratitude, brought together by a love of running but bonded by something far greater.\n\nSteens isn’t just a mountain. It’s a home for those who believe in the power of the struggle, the beauty of the unknown, and the kind of friendships that only form when you’ve suffered through something unforgettable together. And long after our legs have stopped climbing, the mountain stays with us—etched into who we are, a part of us forever."
    },
    {
      id: 2,
      title: "The PNW",
      image: "/img/Bend.jpg",
      description: "It’s the mist that rises from the rivers, the towering peaks that greet the morning sun, and the endless forests that stretch my mind and my legs. It’s a part of me, woven into every memory, every adventure, every breath of fresh mountain air.\n\nThe mountains have always been my sanctuary, their jagged peaks standing tall and proud. Whether it’s a long, meandering trail or a quiet moment beside a river, the Pacific Northwest has always had a way of making me feel at home. There’s a peace here, in the solitude of the woods, the sound of rushing water, and the whisper of the wind through the evergreens. It’s the kind of peace that comes when you’re far enough from the world to forget its noise.\n\nAnd then there are the rivers—wild and untamed, watching the world unfold at their banks. Every bend feels like an invitation to explore, to discover something new about the land, and perhaps, something new about myself.\n\nThe beauty of the Pacific Northwest is in its endlessness—endless mountains, endless rivers, endless places to grow. It’s a place where adventure isn’t just a possibility, it’s a way of life. Whether it’s the thrill of a summit view, the quiet reflection by a riverside, or the simple joy of wandering through a dense forest, there’s always something new to discover, always another trail to follow, always a new adventure to chase."
    },
    {
      id: 3,
      title: "Moscow, ID",
      image: "/img/Moscow.jpg",
      description: "For those familiar, it’s more than a college town—it was a place where families were built over post-run breakfasts, where conversations stretched in every direction, and where, for a time, the world beyond the wheat fields didn’t matter. It was a town that tested me, shaped me, and became a part of me.\n\nI am forever grateful for the people I found and the memories we made—the late-night debates that stretched until morning, the spontaneous road trips down empty highways, and the quiet moments when everything just felt right.\n\nAnd then there was the running—the sweat shared with my teammates, the mornings when the outside world was frozen solid, forcing us into the Dome for lap after lap, mile after mile. We bonded over exhaustion, over our setbacks and our successes. We carried each other through injuries, bad races, and long travel trips. We ran together, we suffered together, and we thrived together.\n\nMoscow was more than a place—it was a feeling, a rhythm, a heartbeat. It was only four years of my life, but it felt like a lifetime that lasted only a moment. No matter how far I run, a part of me will remain on the Palouse.\n\nGo Vandals!"
    },
    {
      id: 4,
      title: "SEA",
      image: "/img/Ha_Giang.jpg",
      description: "I stepped off the plane into a new world—the language was foreign, the faces unfamiliar, and I was on my own. I had to embrace the unknown, to live outside my comfort zone, to see what this world could offer.\n\nThe days that followed were a blur of new experiences, strange places, and unspoken connections. Every moment was an adventure in itself—each day bringing new stories, new challenges, and new discoveries. I learned to trust myself in ways I never thought possible. I learned that not knowing the next step didn’t mean I wasn’t moving forward—it meant I was living fully, completely present in each new experience.\n\nI learned to scuba dive and explored an underwater world I had only ever dreamed of. I wandered through remote villages in Vietnam, where the people, though they spoke a language I couldn’t understand, welcomed me with warmth and kindness. Every encounter, every smile, every word—broken or not—became a bridge connecting me to the heart of these countries.\n\nI got dangerously ill from some questionable street food—another opportunity for new, unglamorous stories. Yet even in my worst moments, struggling to do even the most basic necessities, I found a way. I learned to trust that no matter what, I could handle it.\n\nSEA taught me to take those first steps, even when you’re terrified. And as I left, I knew that part of me would forever remain in those distant lands, in the smiles of strangers and the stories of adventure that I’d carry with me forever."
    },
    {
      id: 5,
      title: "Flagstaff, AZ",
      image: "/img/Flagstaff.jpg",
      description: "We were a small group of post-college kids, broke but hungry, trying to make it work. Flagstaff called to us—altitude training at one of the best spots for endurance athletes—and the opportunity was too good to pass up. The guys I was with were in a different league—fitter, stronger, ready to attack the mountain air. I wasn’t in the same shape, but I had no choice but to hop on the train and pray I could keep up.\n\nFrom the jump, every workout kicked me around. Each rep slower than I’d run in recent memory, and more painful than I ever imagined. But that’s what Flagstaff does—it tests you, challenges you, and forces you to face what you’re really made of.\n\nThe trails were something else. I wanted to explore all of them—the rugged paths, the dirt roads that stretched into the pines, each one feeling like an invitation to discover something new. The high altitude made it tough, but it also made everything more beautiful. There was something special about running up a mountain, barely breathing, surrounded by scenery that made you forget how hard you were working.\n\nThere was a bond in that shared struggle, a quiet understanding that no one else would get. We worked hard in the mornings, sometimes in the afternoons too, pushing ourselves to the limit. And when the day was done, we celebrated the grind, the struggle, and the victories that felt far too small in the moment but meant everything in the end.\n\nBy the time I left, I came home in the best shape of my life—even if it didn’t feel like it at 7,000 feet. The altitude had kicked my ass, but it also made me stronger than I’d ever been before. Flagstaff taught me about resilience, about embracing the grind, and about finding strength in the struggle."
    }
  ];

  const [currentPlace, setCurrentPlace] = useState(places[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const imageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setIsTyping(true);
    let currentText = '';
    const targetText = currentPlace.description;
    let index = 0;

    // Faster typing speed (10ms instead of 20ms)
    // For longer text (>100 characters), make it even faster (5ms)
    const typingSpeed = targetText.length > 100 ? 5 : 10;
    
    
    const typeText = () => {
      if (index < targetText.length) {
        
        currentText += targetText[index];
        setDisplayText(currentText);
        index++;
        typingTimeoutRef.current = setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    typeText();

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentPlace]);

  const handlePlaceClick = (place: React.SetStateAction<{ id: number; title: string; image: string; description: string; }>) => {
    setCurrentPlace(place);
    setIsExpanded(false);
  };

  const getTitleColor = (title: string) => {
    return title === "Steens Mountain" ? colors.steensAccent : colors.accent2;
  };

  
  return (
    <div className="min-h-screen bg-black text-white ">
      {/* Navigation remains the same */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20">
        <div className={`text-2xl font-bold ${colors.text}`}>CS</div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`z-50 ${colors.text} `}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Items remain the same */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-black bg-opacity-95 z-40 rounded-lg shadow-lg p-4">
          <nav className="text-white text-l space-y-1">
            <Link href="/" className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}>
              Home
            </Link>
            <Link href="/running-times-display" className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}>
              Pacing
            </Link>
            <Link href="/projects" className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}>
              Projects
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

      {/* Main content */}
      <div className="container mx-auto px-4 pt-12">
        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg" ref={imageRef}>
          <Image
            src={currentPlace.image}
            alt={currentPlace.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            quality={100}
            priority
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
            className="bg-zinc-900 p-6 rounded-lg cursor-pointer group relative"
            onClick={() => setIsExpanded(!isExpanded)}
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
                  {isTyping && index === displayText.split('\n\n').length - 1 && (
                    <span className="animate-pulse text-[#10B981]">|</span>
                  )}
                </p>
              ))}
            </div>
            
            <div className="absolute  bottom-0 left-0 right-0 flex justify-center">
              {isExpanded ? (
                <ChevronUp className="text-[#10B981] group-hover:text-[#10B981]/80 transition-colors" size={24} />
              ) : (
                <ChevronDown className="text-[#10B981] group-hover:text-[#10B981]/80 transition-colors" size={24} />
              )}
            </div>
          </div>
        </div>

        {/* Other Places section */}
           <div className="max-w-4xl mx-auto relative "> {/* Add padding */}
            <h2 className="text-2xl font-bold p-2 text-white z-1 ">Other Special Places</h2>

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
                className="relative "
                >
                {places.filter(p => p.id !== currentPlace.id).map((place) => (
                    <SwiperSlide key={place.id} className='p-2 overflow-visible'>
                    <div
                        className="cursor-pointer transform transition-all duration-300 hover:scale-105 relative "
                        onClick={() => handlePlaceClick(place)}
                    >
                        <div className="relative aspect-video rounded-lg overflow-hidden z-5">
                        <Image
                            src={place.image}
                            alt={place.title}
                            fill
                            className="w-full h-full z-10"
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
                className="swiper-button-next absolute left-0 top-0 h-full w-8 z-30 flex items-center justify-center  hover:bg-black/10 transition-all"
                >
                <ChevronLeft size={36} className="text-white" />
                </button>

                <button
                className="swiper-button-prev absolute right-0 top-0 h-full w-8 z-30 flex items-center justify-center  hover:bg-black/10 transition-all"
                >
                <ChevronRight size={36} className="text-white" />
                </button>
            </div>
           </div>

        </div>

        {/* Footer */}
      <footer className={` text-cream py-12`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-12">
            <a href="mailto:calebseely@gmail.com" className="hover:text-emerald-500 transition-colors" target="_blank">
              <Mail size={28} />
            </a>
            <a href="https://www.linkedin.com/in/caleb-seely" className="hover:text-emerald-500 transition-colors" target="_blank">
              <Linkedin size={28} />
            </a>
            <a href="misc/Caleb_Seely_Resume.pdf" className="hover:text-emerald-500 transition-colors" target="_blank">
              <FileText size={28} />
            </a>
            <a href="https://github.com/Caleb-Seely" className="hover:text-emerald-500 transition-colors" target="_blank">
              <Github size={28} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default PlacesPage;