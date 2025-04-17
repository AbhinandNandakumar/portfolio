import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import profileImage from '../img/dp2.png';
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-blue-900/20 backdrop-filter backdrop-blur-lg border border-blue-500/30 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://www.example.com`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex gap-4">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                      title="View on GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                      title="View Live Demo"
                    >
                      <FaExternalLinkAlt size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;