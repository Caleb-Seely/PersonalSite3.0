"use client";
import React, { useState } from 'react';
import { ChevronRight, Github, ExternalLink, Menu, X } from 'lucide-react';
import Link from 'next/link';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  const projects = [
    {
      id: 1,
      title: "AI-Powered Task Manager",
      tools: ["React", "Python", "TensorFlow", "AWS"],
      shortDescription: "Smart task management system with AI-driven prioritization",
      longDescription: "Developed a sophisticated task management application that uses machine learning to analyze task patterns and suggest optimal scheduling. Implemented natural language processing for task input and automated categorization.",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      github: "https://github.com/example/task-manager",
      live: "https://task-manager-demo.com"
    },
    {
      id: 2,
      title: "E-commerce Analytics Dashboard",
      tools: ["Vue.js", "Node.js", "PostgreSQL", "Docker"],
      shortDescription: "Real-time analytics dashboard for e-commerce platforms",
      longDescription: "Created a comprehensive analytics dashboard that provides real-time insights into sales, inventory, and customer behavior. Features include customizable widgets, automated reporting, and predictive analytics.",
      images: ["/api/placeholder/600/400"],
      github: "https://github.com/example/analytics-dashboard"
    },
    {
      id: 3,
      title: "Smart Home IoT Hub",
      tools: ["React Native", "MongoDB", "MQTT", "Raspberry Pi"],
      shortDescription: "Centralized control system for IoT devices",
      longDescription: "Built a mobile application that serves as a central hub for controlling various IoT devices. Implemented real-time device status monitoring, automation rules, and energy consumption tracking.",
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      github: "https://github.com/example/iot-hub",
      live: "https://iot-hub-demo.com"
    }
  ];

  const allTechnologies = [...new Set(projects.flatMap(project => project.tools))].sort();
  const filteredProjects = selectedTech
    ? projects.filter(project => project.tools.includes(selectedTech))
    : projects;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-black z-50">
        <div className="text-white text-2xl font-bold">CS</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-black bg-opacity-95 z-40 rounded-lg shadow-lg p-4">
          <nav className="text-white text-l space-y-1">
            <Link 
              href="/" 
              className="block py-1 px-2 rounded hover:bg-gray-800 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/running-times-display" 
              className="block py-1 px-2 rounded hover:bg-gray-800 transition-colors"
            >
              Pacing
            </Link>
            <Link 
              href="/places" 
              className="block py-1 px-2 rounded hover:bg-gray-800 transition-colors"
            >
              Places
            </Link>
            <a
              href="/misc/Caleb_Seely_Resume.pdf"
              className="block py-1 px-2 rounded hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        
        {/* Filters Section */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-[#8DB7F5]">Filter by Technology</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full border transition-colors ${
                selectedTech === null
                  ? 'bg-[#10B981] text-black border-[#10B981]'
                  : 'border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black'
              }`}
              onClick={() => setSelectedTech(null)}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedTech === tech
                    ? 'bg-[#10B981] text-black border-[#10B981]'
                    : 'border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black'
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
                {selectedProject.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${selectedProject.title} screenshot ${index + 1}`}
                    className="rounded-lg w-96 object-cover"
                  />
                ))}
              </div>

              <p className="text-gray-300 mb-6">{selectedProject.longDescription}</p>
              
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
                    <ExternalLink size={20} />
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
    </div>
  );
};

export default ProjectsPage;