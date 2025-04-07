"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SpotifySection from './spotify-section';
import StravaWidget from './strava-widget';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import Image from 'next/image';
import NavMenu from "../components/nav_menu";
import Footer from "@/components/footer";
import { colors} from '@/app/styles/colors';
import ForestFireSection from './forest-fire-section';

const navLinks = [
   { href: "/pacing", label: "Pacing" },
   { href: "/projects", label: "Projects" },
   { href: "/places", label: "Places" },
   { href: "/misc/Caleb_Seely_Resume.pdf", label: "Resume", target: "_blank", rel: "noopener noreferrer" },
];

const welcomeMessages = [
  "Hi, I'm Caleb",
  "Building the future, one mile at a time",
  "Hey You",
  "This site was built with love",
  "This site was built with love, not sleep",
  "RUN",
  "Welcome to my home",
  "Let me out!",
  "Hà Giang, Vietnam"
];

interface TypeWriterProps {
    message: string; // Assuming message is a string
    onComplete: () => void; // Assuming onComplete is a function that takes no arguments and returns nothing
  }

const TypeWriter: React.FC<TypeWriterProps> = ({ message, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping && displayText.length < message.length) {
      timeout = setTimeout(() => {
        setDisplayText(message.substring(0, displayText.length + 1));
      }, 100);
    } else if (isTyping && displayText.length === message.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    } else if (!isTyping && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(message.substring(0, displayText.length - 1));
      }, 50);
    } else if (!isTyping && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, message, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="relative px-6 py-3 rounded-lg">
      <div className="text-4xl md:text-6xl font-bold text-black mb-4 font-serif min-h-[80px]">
        {displayText}
        <span className="inline-block w-[3px] h-8 bg-black ml-1 animate-[blink_1s_ease-in-out_infinite]">
        </span>
      </div>
    </div>
  );
};

const HeroLayout = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * welcomeMessages.length);
    setWelcomeMessage(welcomeMessages[randomIndex]);
  }, []);

  return (
    <div className={`relative min-h-screen ${colors.primary} ${colors.text}`}>
      {/* Hero Image Section */}
      <div className="relative h-screen">
        
        {/* Welcome Text */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
          {showWelcome && (
            <TypeWriter 
              message={welcomeMessage} 
              onComplete={() => setShowWelcome(false)}
            />
          )}
        </div>

        <NavMenu links={navLinks} />

      </div>

      {/* About Section */}
      <section id="about" className={`py-8 ${colors.primary}`}>
        <div className="container mx-auto px-2 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 relative">
              
        {/* Business Card Container (Headshot & Bio together) */}
        <div className="md:col-span-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 h-full">
           
          {/* Headshot Side */}
          <div className="relative h-64 md:h-full py-8 md:py-0">
             <div className="absolute inset-0">
             <Image 
             src="/img/headshot.webp" 
                alt="Headshot" 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
             />
             </div>
          </div>

          {/* Bio Side */}
          <div className={`px-4 flex flex-col justify-between ${colors.primary} py-8 md:py-0`}>
             <div className="space-y-4">
             <h2 className={`text-2xl font-bold font-serif lg:text-4xl md:text-xl ${colors.accent2}`}>Rooted in Portland</h2>
             <p className={`text-sm lg:text-sm md:text-xs leading-relaxed ${colors.text}`}>
                Born and raised in PNW, for college I ventured to the University of Idaho, where I earned a degree in Computer Science, a minor in Mathematics, and a lifetime of memories.
             </p>
             <h2 className={`text-2xl font-bold font-serif lg:text-3xl md:text-xl ${colors.accent}`}>
                Chasing the next adventure. Always
             </h2>
             <p className={`text-sm lg:text-sm md:text-xs leading-relaxed ${colors.text}`}>
                The best stories don&apos;t come from staying inside. Just out here collecting as many experience tokens as I can.
             </p>
             </div>

             {/* Anchored to the bottom */}
             <h2 className={`text-2xl font-bold font-serif lg:text-2xl md:text-xl ${colors.text}`}>
             Thanks for stopping by!
             </h2>
          </div>        
        </div>
        </div>

        {/* Strava Widget - Clearly separated but on same line for large screens */}
        <div className="md:col-span-4">
        <Card className={`h-full ${colors.primary} shadow-lg rounded-xl`}>
           <CardContent className="p-4">
              <StravaWidget />
           </CardContent>
        </Card>
        </div>

     </div>
  </div>
  </section>

  {/* Spotify Section */}
  <SpotifySection />

  {/* Projects Section */}
  <section id="projects" className={`py-8 ${colors.primary}`}>
    <div className="container mx-auto px-2 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['Pacing', 'Projects', 'Places'].map((type) => (
          <Link 
            key={type} 
            href={type === 'Pacing' ? '/pacing' : type === 'Projects' 
                ? '/projects': type === 'Places' 
                ? '/places' : '#'}
            className="block h-full"
          >
            
            <Card className={`group relative cursor-pointer hover:shadow-xl transition-all duration-300 h-64 ${colors.secondary}`}>
              <CardContent className="p-0 h-full">
              <Image 
                src={`/img/${type}.webp`}
                alt={type.charAt(0).toUpperCase() + type.slice(1)}
                fill
                className="w-full h-full object-cover rounded-lg"
                quality={75}
                
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 rounded-lg transition-all duration-300 flex items-center justify-center">
                  <span className={`text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.accent}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>

  {/* Forest Fires Section */}
  <ForestFireSection />

  {/* Footer */}
  <Footer />
</div>
);
};

export default HeroLayout;