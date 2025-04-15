import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  
  useGSAP(() => {
    gsap.from(".about-heading", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });
    
    gsap.from(".about-text", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
      }
    });
    
    gsap.from(".about-stats", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".about-stats",
        start: "top 80%",
      }
    });
  }, []);

  const stats = [
    { value: "4+", label: "Years of Learning" },
    { value: "10+", label: "Projects Completed" },
    { value: "2+", label: "Years of Experience" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="about-heading text-4xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Replaced image with a card containing info */}
            <div className="bg-blue-900/20 backdrop-filter backdrop-blur-lg p-8 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.4)] h-full">
              <h3 className="text-3xl font-bold mb-6 text-blue-400">Abhinand Nandakumar</h3>
              <p className="text-xl text-blue-200 mb-6">Full Stack Developer</p>
              <p className="text-gray-300 mb-6">
                Passionate about creating beautiful, functional web applications using modern technologies.
              </p>
              
              {/* Stats section */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="about-stats text-center">
                    <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                    <div className="text-xs text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-blue-300">
              Computer Science Engineer & Web Developer
            </h3>
            
            <div className="about-text space-y-4 text-gray-300">
              <p>
                I'm a passionate Computer Science Engineering student at Government Engineering College, Thrissur, with a strong focus on web development and modern technologies.
              </p>
              
              <p>
                My journey in tech began with a curiosity about how software works and evolved into a deep passion for creating elegant, user-friendly web applications. I specialize in frontend development with React and have experience with various frameworks and libraries.
              </p>
              
              <p>
                I enjoy solving complex problems and continuously learning new technologies to improve my skills. When I'm not coding, you can find me exploring new tech trends, contributing to open-source projects, or experimenting with AI and machine learning.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Education</h4>
                <ul className="space-y-2">
                  <li className="about-text">
                    <span className="font-medium">BTech in CSE</span>
                    <p className="text-sm text-gray-400">Government Engineering College, Thrissur</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Interests</h4>
                <ul className="space-y-1 about-text">
                  <li className="text-gray-300">Web Development</li>
                  <li className="text-gray-300">UI/UX Design</li>
                  <li className="text-gray-300">Artificial Intelligence</li>
                  <li className="text-gray-300">Open Source</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;