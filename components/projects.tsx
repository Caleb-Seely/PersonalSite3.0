"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Github } from 'lucide-react';
import Image from "next/image";
import InteractiveConstellation from './twinkleStars';
import { personalSite3Reflection } from './reflections/personalSite3';
import { personalSite2Reflection } from './reflections/personalSite2';
import { messagesDBReflection } from './reflections/messagesDB';
import { compilerReflection } from './reflections/compiler';
import { capstoneReflection } from './reflections/capstone';
import { _3BallReflection } from './reflections/3Ball';
import { ecommerceReflection } from './reflections/ecommerce';
import { predictingSalesReflection } from './reflections/predictingSales';
import { mediaArchiveReflection } from './reflections/mediaArchive';
import { clearShotReflection } from './reflections/clearshotReflection';
import { cameraClickReflection } from './reflections/cameraClick';
import NavMenu from "../components/nav_menu";
import Footer from "@/components/footer";
import { trackProjectInteraction, trackEvent } from './google-analytics';
// import { colors } from '@/app/styles/colors';


interface Project {
  id: string;
  title: string;
  tools: string[];
  shortDescription: string;
  longDescription: string;
  images: string[];
  date: Date; 
  github?: string;
  live?: string;
}

const navLinks = [
   { href: "/", label: "Home" },
   { href: "/pacing", label: "Pacing" },
   { href: "/places", label: "Places" },
   { href: "/misc/Caleb_Seely_Resume.pdf", label: "Resume", target: "_blank", rel: "noopener noreferrer" },
];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  // Tracking for time spent viewing projects
  const projectStartTime = useRef<number | null>(null);
  const currentlyViewedProject = useRef<string | null>(null);
  
  // Track project viewing time
  useEffect(() => {
    if (selectedProject) {
      // Start tracking when project modal opens
      projectStartTime.current = Date.now();
      currentlyViewedProject.current = selectedProject.id;
      
      // Track the project click
      trackProjectInteraction(selectedProject.title, 'click');
      
      return () => {
        // When project modal closes, calculate and track view time
        if (projectStartTime.current && currentlyViewedProject.current) {
          const viewTime = Math.round((Date.now() - projectStartTime.current) / 1000);
          if (viewTime > 2) { // Only track if viewed for more than 2 seconds
            trackEvent('project_view_time', 'projects', currentlyViewedProject.current, viewTime);
          }
        }
      };
    }
  }, [selectedProject]);
  
  // Handle technology filter clicks
  const handleFilterClick = (tech: string | null) => {
    setSelectedTech(tech);
    trackEvent('filter_click', 'projects', tech || 'all');
  };
  
  // Handle link clicks in project modal
  const handleGithubClick = (projectTitle: string, githubUrl: string) => {
    trackEvent('github_click', 'projects', projectTitle);
    window.open(githubUrl, '_blank', 'noopener noreferrer');
  };
  
  const handleLiveDemoClick = (projectTitle: string, liveUrl: string) => {
    trackEvent('live_demo_click', 'projects', projectTitle);
    window.open(liveUrl, '_blank', 'noopener noreferrer');
  };

  // Projects array with dates
  const projects: Project[] = [
   {
     id: "media-archive",
     title: "Family Media Archive",
     tools: ["Personal"],
     shortDescription: "A project to backup and organize my family history",
     longDescription: mediaArchiveReflection,
     images: [],
     date: new Date('1998-12-15') 
   },
   {
     id: "ml-sales",
     title: "ML Sales Prediction",
     tools: ["AI", "Python"],
     shortDescription: "An ML project using Random Forest",
     longDescription: predictingSalesReflection,
     images: [],
     date: new Date('2021-3-20')
   },
   {
     id: "personal-site-2",
     title: "CalebSeely.com (Old)",
     tools: ["JS", "Bootstrap", "APIs"],
     shortDescription: "My first real attempt at an online portfolio",
     longDescription: personalSite2Reflection,
     images: [],
     github: "https://github.com/Caleb-Seely/PersonalSite2.0",
     live: "https://calebseely.netlify.app/",
     date: new Date('2020-12-31')
   },
   {
     id: "c-compiler",
     title: "C Compiler",
     tools: ["C"],
     shortDescription: "Compiler built from the ground up based on the C language",
     longDescription: compilerReflection,
     images: [],
     github: "https://github.com/Caleb-Seely/C-Minus",
     date: new Date('2020-01-20')
   },
   {
     id: "obdii-research",
     title: "OBDII Research",
     tools: ["Java", "Android", "APIs"],
     shortDescription: "My senior capstone research project",
     longDescription: capstoneReflection,
     images: [`/img/Directions.png`, `/img/OBD_page.jpg`],
     date: new Date('2021-01-20')
   },
   {
     id: "ecommerce",
     title: "E-Commerce Website",
     tools: ["JS", "React", "APIs"],
     shortDescription: "A fully functional shopping website",
     longDescription: ecommerceReflection,
     images: [],
     date: new Date('2021-11-01')
   },
   {
     id: "3ball-game",
     title: "3Ball",
     tools: ["C#", "Unity"],
     shortDescription: "A Unity game for Android",
     longDescription: _3BallReflection,
     images: [`/img/3BallMenu.jpg`],
     github: "https://github.com/Caleb-Seely/3Ball",
     date: new Date('2022-12-07')
   },
   {
     id: "messages-db",
     title: "SMS & MMS Database",
     tools: ["SQL", "Python", "JS"],
     shortDescription: "SMS & MMS analysis tool.",
     longDescription: messagesDBReflection,
     images: [],
     github: "https://github.com/Caleb-Seely/MessagesDB",
     date: new Date('2024-11-01')
   },
   {
     id: "personal-site-3",
     title: "CalebSeely.com",
     tools: ["AI", "TypeScript", "APIs"],
     shortDescription: "A redesign of my personal website with a focus on style and utility.",
     longDescription: personalSite3Reflection,
     images: [],
     github: "https://github.com/Caleb-Seely/PersonalSite3.0",
     date: new Date('2025-2-15')
   },
   {
     id: "clearshot",
     title: "ClearShot Apps",
     tools: ["AI", "Kotlin", "Monkey C"],
     shortDescription: "Turns my Garmin watch into a remote camera trigger",
     longDescription: clearShotReflection,
     images: [],
     github: "https://github.com/Caleb-Seely/Garmin-Remote-Camera",
     date: new Date('2025-3-1')
   },
   {
      id: "cameracliick",
      title: "CameraClick Apps",
      tools: ["AI", "Kotlin", "Monkey C"],
      shortDescription: "Native camera control, wirelessly triggered from your wrist.",
      longDescription: cameraClickReflection,
      images: [],
      live: "https://play.google.com/store/apps/details?id=com.garmin.android.apps.camera.click.comm",
      github: "https://github.com/Caleb-Seely/GarminRemoteV2",
      date: new Date('2025-4-1')
    }
 ];
 
  // Sort projects by date (newest first)
  const sortedProjects = [...projects].sort((a, b) => b.date.getTime() - a.date.getTime());

  const allTechnologies = [...new Set(sortedProjects.flatMap(project => project.tools))].sort();
  const filteredProjects = selectedTech
    ? sortedProjects.filter(project => project.tools.includes(selectedTech))
    : sortedProjects;

  return (
    <div className="min-h-screen bg-black text-white">

      <NavMenu links={navLinks} />

      <InteractiveConstellation />
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-24 z-15">
        <h1 className="text-4xl font-bold mb-8">Projects </h1>
        
        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-[#8DB7F5]">Filter by Technology</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full border transition-colors ${
                selectedTech === null
                  ? 'bg-[#10B981] text-black border-[#10B981]'
                  : 'border-[#10B981] text-[#10B981] bg-black hover:bg-[#10B981] hover:text-black'
              }`}
              onClick={() => handleFilterClick(null)}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                className={`px-4 py-2 rounded-full border z-15 transition-colors ${
                  selectedTech === tech
                    ? 'bg-[#10B981] text-black border-[#10B981]'
                    : 'border-[#10B981] bg-black text-[#10B981] hover:bg-[#10B981] hover:text-black'
                }`}
                onClick={() => handleFilterClick(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
            key={project.id}
            className="group relative bg-gray-900 rounded-lg p-6 hover:shadow-lg hover:shadow-[#8DB7F5]/20 transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={() => setSelectedProject(project)}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-sm px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 mb-4 transform transition-all duration-300 group-hover:text-white">
                {project.shortDescription}
              </p>
          
              {/* Display year of project */}
              <div className="text-sm text-gray-500">
                {project.date.getFullYear()}
              </div>
            </div>
          
            {/* This pushes to bottom */}
            <div className="mt-auto flex items-center text-[#8DB7F5] pt-4">
              <span className="mr-2">Learn More</span>
              <ChevronRight size={20} />
            </div>
          </div>
          ))}
        </div>

{/* Modal for detailed view */}
{selectedProject && (
  <div 
    className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setSelectedProject(null);
      }
    }}
  >
    <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8">
      <h2 className="text-3xl font-bold mb-6">{selectedProject.title}</h2>
      
      {/* Display project date more prominently */}
      <div className="text-lg text-gray-400 mb-4">
        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(selectedProject.date)}
      </div>
      
      {/* Fixed image gallery without cropping */}
      {selectedProject.images.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">
          {selectedProject.images.map((img, index) => (
            <div key={index} className="max-w-md max-h-64 overflow-hidden bg-gray-800 rounded-lg">
              <Image
                src={img}
                alt={`${selectedProject.title} screenshot ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg w-auto h-auto max-h-64 object-contain mx-auto"
              />
            </div>
          ))}
        </div>
      )}

      <div
        className="text-gray-300 mb-6"
        dangerouslySetInnerHTML={{ __html: selectedProject.longDescription }}
      />
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3 text-[#8DB7F5]">Tools & Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {selectedProject.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {selectedProject.github && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleGithubClick(selectedProject.title, selectedProject.github!);
            }}
            className="flex items-center gap-2 text-[#8DB7F5] hover:text-[#10B981] cursor-pointer"
          >
            <Github size={20} />
            <span>View Code</span>
          </button>
        )}
        {selectedProject.live && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLiveDemoClick(selectedProject.title, selectedProject.live!);
            }}
            className="flex items-center gap-2 text-[#8DB7F5] hover:text-[#10B981] cursor-pointer"
          >
            <span>Live Demo</span>
          </button>
        )}
      </div>

      <button
        onClick={() => setSelectedProject(null)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>
    </div>
  </div>
)}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectsPage;