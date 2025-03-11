"use client";
import React, { useState } from 'react';
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
import NavMenu from "../components/nav_menu";
import Footer from "@/components/footer";
// import { colors } from '@/app/styles/colors';

// Define the Project interface
interface Project {
  id: number;
  title: string;
  tools: string[];
  shortDescription: string;
  longDescription: string;
  images: string[];
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

  const projects: Project[] = [
    {
        id: 1,
        title: "CalebSeely.com",
        tools: ["AI", "TypeScript"],
        shortDescription: "A redesign of my personal website with a focus on style and utility.",
        longDescription: personalSite3Reflection,
        images: [],
        github: "https://github.com/Caleb-Seely/PersonalSite3.0"
      },
      {
        id: 2,
        title: "Messages Database Design",
        tools: ["SQL", "Python", "JS"],
        shortDescription: "SMS & MMS analysis.",
        longDescription: messagesDBReflection,
        images: [],
        github: "https://github.com/Caleb-Seely/MessagesDB"
      },
        {
         id: 3,
         title: "3Ball",
         tools: ["C#", "Unity"],
         shortDescription: "A Unity game for Android",
         longDescription: _3BallReflection,
         images: [],
         github: "https://github.com/Caleb-Seely/3Ball"
       },    
       {
         id: 4,
         title: "E-Commerce Website",
         tools: ["JS", "React", "APIs"],
         shortDescription: "A fully functional shopping website",
         longDescription: ecommerceReflection,
         images: []
       },
      {
          id: 5,
          title: "OBDII Research",
          tools: ["Java", "Android", "APIs"],
          shortDescription: "My senior capstone research project",
          longDescription: capstoneReflection,
          images: []
        },
        {
         id: 6,
         title: "C Compiler",
         tools: ["C"],
         shortDescription: "Compiler built from the ground up based on the C language",
         longDescription: compilerReflection,
         images: [],
         github: "https://github.com/Caleb-Seely/C-Minus"
       },
       {
          id: 7,
          title: "CalebSeely.com (Old)",
          tools: ["JS", "Bootstrap", "APIs"],
          shortDescription: "My first real attempt at an online portfolio",
          longDescription: personalSite2Reflection,
          images: [],
          github: "https://github.com/Caleb-Seely/PersonalSite2.0",
          live: "https://calebseely.netlify.app/"
       },
       {
         id: 8,
         title: "ML Sales Prediction",
         tools: ["AI", "Python"],
         shortDescription: "An ML project using Random Forest",
         longDescription: predictingSalesReflection,
         images: []
       },
       {
         id: 9,
         title: "Family Media Archive",
         tools: ["Personal"],
         shortDescription: "A project to backup and organize my family history",
         longDescription: mediaArchiveReflection,
         images: []
       }

  ];

  const allTechnologies = [...new Set(projects.flatMap(project => project.tools))].sort();
  const filteredProjects = selectedTech
    ? projects.filter(project => project.tools.includes(selectedTech))
    : projects;

  return (
    <div className="min-h-screen bg-black text-white">

      <NavMenu links={navLinks} />

      <InteractiveConstellation />
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-24 z-15">
        <h1 className="text-4xl font-bold mb-8">My Projects </h1>
        
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
              onClick={() => setSelectedTech(null)}
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
                onClick={() => setSelectedTech(tech)}
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
              className="group relative bg-gray-900 rounded-lg p-6 hover:shadow-lg hover:shadow-[#8DB7F5]/20 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
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
              <div className="flex items-center text-[#8DB7F5] mt-4">
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
              
              <div className="flex gap-4 mb-6 overflow-x-auto">
                {selectedProject.images.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`${selectedProject.title} screenshot ${index + 1}`}
                    width={384}
                    height={256}
                    className="rounded-lg w-full md:w-96 object-contain md:object-cover"
                  />
                ))}
              </div>

              <div
                className="text-gray-300 mb-6"
                dangerouslySetInnerHTML={{ __html: selectedProject.longDescription }}
                />
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3 text-[#8DB7F5]">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool: string) => (
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
                  <a
                    href={selectedProject.github}
                    className="flex items-center gap-2 text-[#8DB7F5] hover:text-[#10B981]"
                  >
                    <Github size={20} />
                    <span>View Code</span>
                  </a>
                )}
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    className="flex items-center gap-2 text-[#8DB7F5] hover:text-[#10B981]"
                  >
                    <span>Live Demo</span>
                  </a>
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