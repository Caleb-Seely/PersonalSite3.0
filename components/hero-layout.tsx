"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, Mail, Github, FileText, Linkedin } from 'lucide-react';
import SpotifySection from './spotify-section';
import StravaWidget from './strava-widget';
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';

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

const HeroLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isForestFireExpanded, setIsForestFireExpanded] = useState(false);

  return (
    <div className={`relative min-h-screen ${colors.primary} ${colors.text}`}>
      {/* Hero Image Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0  z-10" /> {/* Dark overlay */}
        <img 
          src="/img/hero.jpg" 
          alt="Landscape Hero" 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation */}
        <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20">
          <div className={`text-2xl font-bold ${colors.text}`}>CS</div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`z-50 ${colors.text} ${colors.hover} transition-colors`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Small Top-Right Menu */}
        {isMenuOpen && (
          <div className="fixed top-10 right-4 bg-black bg-opacity-95 z-40 rounded-lg shadow-lg p-4">
            <nav className="text-white text-l space-y-1">
              {['Home', 'About', 'Projects', 'Resume'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* About Section */}
        <section id="about" className={`py-16 ${colors.secondary}`}>
        <div className="container mx-auto px-8 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Headshot Card */}
            <Card className={`h-full ${colors.primary}`}>
                <CardContent className="p-4 h-full flex flex-col">
                {/* Image Container */}
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <img 
                    src="/img/headshot1.jpg" 
                    alt="Headshot" 
                    className="w-full h-full object-cover"
                    />
                </div>

                {/* Text Container */}
                <div className="mt-4 text-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white">Caleb Seely</h3>
                    <p className="text-gray-400 text-sm md:text-base">Software Developer</p> {/* Optional subtitle */}
                </div>
                </CardContent>
            </Card>

            {/* Bio Card */}
            <Card className={`h-full ${colors.primary}`}>
                <CardContent className="p-6 h-full flex flex-col ">
                <h2 className={`text-2xl font-bold mb-1 ${colors.accent}`}>Rooted in Portland</h2>
                <p className={`mb-3 ${colors.text}`}>Born and raised in PNW, for college I ventured to the University of Idaho, where I earned a degree in Computer Science and a minor in Mathematics, and a lifetime of memories.</p>
                <h2 className={`text-2xl font-bold mb-1 ${colors.accent}`}>Chasing the next adventure, always</h2>
                <p className={`mb-3 ${colors.text}`}>The best stories don't come from staying inside. That's why I spent a month training in Flagstaff, skied through a Bend winter, and solo-traveled across Thailand. Just out here collecting as many experience tokens as I can. \n Thanks for stopping by!</p>
                </CardContent>
            </Card>

            {/* Strava Widget Card */}
            <Card className={`h-full ${colors.primary}`}>
                <CardContent className="p-4 h-full">
                <StravaWidget />
                </CardContent>
            </Card>
            </div>
        </div>
        </section>

      {/* Spotify Section */}
      <SpotifySection />

      {/* Projects Section */}
      <section id="projects" className={`py-16 ${colors.primary}`}>
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['running', 'projects', 'travel'].map((type) => (
              <Link 
                key={type} 
                href={type === 'running' ? '/running-times-display' : type === 'projects' 
                    ? '/projects': type === 'travel' 
                    ? '/places' : '#'}
                className="block h-full"
              >
                
                <Card className={`group relative cursor-pointer hover:shadow-xl transition-all duration-300 h-64 ${colors.secondary}`}>
                  <CardContent className="p-0 h-full">
                    <img 
                      src={`/img/${type === 'travel' ? 'steens' : type}.jpg`}
                      alt={type.charAt(0).toUpperCase() + type.slice(1)}
                      className="w-full h-full object-cover rounded-lg"
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

      {/* Forest Fires Section - Reduced padding */}
      <section id="forest-fires" className={`py-8 ${colors.secondary}`}>
        <div className="container mx-auto px-8">
          <button 
            onClick={() => setIsForestFireExpanded(!isForestFireExpanded)}
            className="w-full flex items-center justify-between mb-4"
          >
            <h2 className={`text-3xl font-bold ${colors.accent2}`}>Why Forest Fires Matter</h2>
            {isForestFireExpanded ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
          </button>
          
          {isForestFireExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {['Historical Context', 'Pacific Northwest Legacy', 'Modern Challenges'].map((title, index) => (
                <Card key={title} className={`${colors.primary}`}>
                  <CardContent className="p-4">
                    <h3 className={`text-xl font-semibold mb-4 ${colors.accent2}`}>{title}</h3>
                    <p className={colors.textMuted}>
                      {index === 0 && "Forest fires are a critical component of many ecosystems, playing a vital role in maintaining forest health and biodiversity. While often viewed as purely destructive forces, these natural phenomena have shaped our landscapes for millions of years."}
                      {index === 1 && "In the Pacific Northwest, fire has historically been an essential ecological process. Indigenous peoples used controlled burns as a land management tool for thousands of years before European settlement. Today, we're learning to better understand and manage the complex relationship between fire, forests, and human communities."}
                      {index === 2 && "Climate change and decades of fire suppression have created new challenges in forest management. As we face longer fire seasons and more intense blazes, it's crucial to develop sustainable approaches to living with fire in our landscapes."}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={`${colors.primary} py-8`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-12">
            {[
              { icon: Mail, href: "mailto:calebseely@gmail.com" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/caleb-seely" },
              { icon: FileText, href: "misc/Caleb_Seely_Resume.pdf" },
              { icon: Github, href: "https://github.com/Caleb-Seely" }
            ].map(({ icon: Icon, href }) => (
              <a 
                key={href}
                href={href}
                className={`${colors.text} hover:${colors.accent} transition-colors`}
                target="_blank"
              >
                <Icon size={28} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroLayout;