import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Import your images
import axernImage from '../img/axern.png';
import zudoImage from '../img/zudo.png';
import chatImage from '../img/download.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const projectsRef = useRef(null);

  const projects = [
    {
      title: "Axern AI",
      description: "It is a personalized prompt generation tool designed to help users create tailored AI prompts efficiently and intuitively.",
      image: axernImage,
      tags: ["React","Node.js", "Tailwind CSS", "Firebase", "Gemini API"],
      githubUrl: "https://github.com/AbhinandNandakumar/axern",
      liveUrl: "#"
    },
    {
      title: "Zudo AI",
      description: "Zudo AI generates AI-based captions for uploaded images and descriptions.",
      image: zudoImage,
      tags: ["React", "Node.js", "Tailwind CSS", "Express"],
      githubUrl: "https://github.com/AbhinandNandakumar/zudo-ai",
      liveUrl: "#"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and user authentication.",
      image: chatImage,
      tags: ["React", "Firebase", "OpenAI API", "WebSockets"],
      githubUrl: "https://github.com/AbhinandNandakumar/ai-chat",
      liveUrl: "#"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a staggered entrance for project cards
      gsap.fromTo(
        '.project-card',
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top bottom-=100",
            end: "center center",
            toggleActions: "play none none none"
          }
        }
      );
    }, projectsRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Here are some of my notable projects showcasing my skills and experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card group perspective-1000"
            >
              <div className="relative h-full transform-style-3d transition-transform duration-700 hover:rotate-y-10 hover:scale-105">
                <div className="bg-blue-900/20 backdrop-filter backdrop-blur-lg border border-blue-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 h-full flex flex-col">
                  {/* Image Container with Overlay */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <div className="flex gap-3 ml-auto transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                          title="View on GitHub"
                        >
                          <FaGithub size={18} />
                        </a>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                          title="View Live Demo"
                        >
                          <FaExternalLinkAlt size={18} />
                        </a>
                      </div>
                    </div>
                    {/* Glowing accent */}
                    <div className="absolute -inset-1 bg-blue-500/20 blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 flex-1">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Projects Button (Optional) */}
        <div className="mt-12 text-center">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            View All Projects
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;