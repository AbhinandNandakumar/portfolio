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
      liveUrl: "https://axern-ai.vercel.app/"
    },
    {
      title: "Zudo AI",
      description: "Zudo AI generates AI-based captions for uploaded images and descriptions.",
      image: zudoImage,
      tags: ["React", "Node.js", "Tailwind CSS", "Express"],
      githubUrl: "https://github.com/AbhinandNandakumar/zudo-ai",
      liveUrl: "https://zudo-ai.vercel.app/"
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
      // Create a staggered entrance for project items
      gsap.fromTo(
        '.project-item',
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
    <section id="projects" ref={projectsRef} className="py-24 overflow-hidden">
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

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-item"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center relative`}>
                {/* Image with hover effects */}
                <div className="w-full md:w-2/5 relative group">
                  <div className="overflow-hidden rounded-lg relative z-10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transform transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-end p-3">
                      <div className="flex gap-3 transform translate-y-5 group-hover:translate-y-0 transition-all duration-500">
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                          title="View on GitHub"
                        >
                          <FaGithub size={16} />
                        </a>
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                          title="View Live Demo"
                        >
                          <FaExternalLinkAlt size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 border-2 border-blue-400/30 rounded-lg -z-10"></div>
                  <div className="absolute -top-3 -left-3 w-16 h-16 border-2 border-blue-600/30 rounded-lg -z-10"></div>
                </div>
                
                {/* Content with diagonal slash design */}
                <div className={`w-full md:w-3/5 ${index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'} relative mt-6 md:mt-0`}>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 inline-flex items-center">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">{project.title}</span>
                      <div className="ml-3 h-px w-12 bg-blue-500/50"></div>
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Background slash design */}
                  <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
                    <div className="absolute w-full h-full">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                          style={{
                            width: '150%',
                            left: '-25%',
                            top: `${30 + i * 30}%`,
                            transform: 'rotate(-15deg)'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connector line between projects */}
              {index < projects.length - 1 && (
                <div className="hidden md:block h-16 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent mx-auto my-2"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="group relative inline-flex items-center px-6 py-3 overflow-hidden rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-500"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-500 group-hover:scale-105"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></span>
            <span className="relative flex items-center">
              View All Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;