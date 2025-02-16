"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

const PlacesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const typingTimeoutRef = useRef(null);
  
  const places = [
    {
      id: 1,
      title: "Mountain Vista",
      image: "/img/steens.jpg",
      description: "This majestic mountain vista represents where I first discovered my love for hiking. The crisp air and stunning views remind me of countless adventures and personal discoveries. I remember the first time I reached this summit - it was a challenging 6-hour hike that tested my limits. The early morning start, the gradual ascent through pine forests, and finally emerging above the treeline to this breathtaking view changed my perspective on what I could achieve. Now, years later, I return here whenever I need to reconnect with that sense of accomplishment and peace."
    },
    {
      id: 2,
      title: "Trail Running",
      image: "/img/running.jpg",
      description: "The trails became my sanctuary, where each footstep brought new discoveries and challenges. The rhythmic sound of feet on dirt, the fresh mountain air, and the ever-changing scenery created the perfect environment for both physical and mental growth. Early morning runs watching the sunrise over the mountains taught me the value of consistency and dedication. The running community I found here has become like family, sharing in the joy of achievement and supporting each other through the tough climbs."
    },
    {
      id: 3,
      title: "Adventure Peak",
      image: "/img/hero.jpg",
      description: "Standing atop this peak marked a turning point in my journey. The challenging ascent, technical scrambles, and exposure to the elements tested every skill I'd developed. The panoramic views from the summit made every step worth it. This place taught me that the greatest rewards often come after the most demanding challenges. The memory of that first summit push, with clouds rolling beneath my feet and the horizon stretching endlessly, remains a source of inspiration."
    },
    {
      id: 4,
      title: "Forest Trail",
      image: "/img/running1.jpg",
      description: "This winding forest trail has been the setting for countless training runs and moments of clarity. The dappled sunlight through the canopy, the soft pine needle-covered path, and the gentle grade make it perfect for both intense workouts and contemplative jogs. I've logged hundreds of miles here, each one teaching me something new about endurance, patience, and the joy of movement. The changing seasons provide a constantly evolving backdrop to my running journey."
    },
    {
      id: 5,
      title: "Project Summit",
      image: "/img/projects.jpg",
      description: "This location represents where many of my most ambitious projects came to life. The unique combination of solitude and inspiration helped transform abstract ideas into reality. The natural environment provided the perfect backdrop for deep focus and creative problem-solving. Whether working on software development or planning new adventures, this spot has been instrumental in shaping my professional journey and personal growth."
    }
  ];

  const [currentPlace, setCurrentPlace] = useState(places[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [imageHeight, setImageHeight] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (imageRef.current) {
        setImageHeight(imageRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      setImageHeight(imageRef.current.offsetHeight);
    }
  }, [currentPlace]);

  useEffect(() => {
    // Clear any existing typing animation
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    setIsTyping(true);
    let currentText = '';
    const targetText = currentPlace.description;
    let index = 0;

    const typeText = () => {
      if (index < targetText.length) {
        currentText += targetText[index];
        setDisplayText(currentText);
        index++;
        typingTimeoutRef.current = setTimeout(typeText, 20);
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

  const handlePlaceClick = (place) => {
    setCurrentPlace(place);
  };

  const getVisiblePlaces = () => {
    const otherPlaces = places.filter(p => p.id !== currentPlace.id);
    const count = windowWidth < 768 ? 1 : 3;
    const startIndex = currentIndex % otherPlaces.length;
    const visiblePlaces = [];
    
    for (let i = 0; i < count; i++) {
      const index = (startIndex + i) % otherPlaces.length;
      visiblePlaces.push(otherPlaces[index]);
    }
    
    return visiblePlaces;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (places.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + (places.length - 1)) % (places.length - 1));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-[#8DB7F5] rounded-lg px-3 py-1 hover:bg-[#8DB7F5]/10 transition-colors">
          CS
        </div>
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#10B981] hover:text-[#8DB7F5] transition-colors rounded-full p-2 hover:bg-[#10B981]/10"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Menu Dropdown */}
          <div className={`absolute right-0 mt-2 w-48 bg-black/95 rounded-lg border border-[#8DB7F5]/20 transition-all duration-300 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <a href="/" className="block px-4 py-2 hover:bg-[#10B981]/20 text-white rounded-t-lg">Home</a>
            <a href="/running" className="block px-4 py-2 hover:bg-[#10B981]/20 text-white">Running</a>
            <a href="/projects" className="block px-4 py-2 hover:bg-[#10B981]/20 text-white">Projects</a>
            <a href="/resume" className="block px-4 py-2 hover:bg-[#10B981]/20 text-white rounded-b-lg">Resume</a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-20">
        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Featured Image */}
          <div className="relative aspect-video md:flex-1 mb-8 overflow-hidden rounded-lg" ref={imageRef}>
            <img
              src={currentPlace.image}
              alt={currentPlace.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
              <h1 className="text-3xl font-bold text-[#8DB7F5]">{currentPlace.title}</h1>
            </div>
          </div>

          {/* Description */}
          <div className={`md:flex-1 text-lg leading-relaxed ${imageHeight > 400 ? 'mt-8' : ''}`}>
            <div className="bg-[#10B981]/10 p-6 rounded-lg">
              {displayText}
              {isTyping && <span className="animate-pulse text-[#10B981]">|</span>}
            </div>
          </div>
        </div>

        {/* Other Places */}
        <div className="relative mt-12">
          <h2 className="text-2xl font-bold mb-6 text-[#8DB7F5]">Other Special Places</h2>
          
          <div className="relative">
            <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-[#10B981] bg-black/50 p-2 rounded-full hover:bg-black/80">
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-4 overflow-hidden px-8">
              {getVisiblePlaces().map((place) => (
                <div
                  key={place.id}
                  className="flex-1 cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => handlePlaceClick(place)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
                      <h3 className="text-lg font-semibold text-[#10B981]">{place.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-[#10B981] bg-black/50 p-2 rounded-full hover:bg-black/80">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;