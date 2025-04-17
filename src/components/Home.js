import React, { useRef, useState } from 'react';
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import profileImage from '../img/dp2.png';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const handleDownload = () => {
    // Replace with your actual CV path
    const pdfUrl = "/assets/cv.pdf";
    saveAs(pdfUrl, "cv.pdf");
  };

  useGSAP(() => {
    // Text animation
    gsap.from(".name", {
      color: "rgb(175, 200, 255)",
      duration: 0.85,
      x: 100,
      opacity: 0.2,
    });
    
    gsap.to(".name", {
      opacity: 0.8,
      ease: "power3.inOut",
      textShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
      duration: 2,
    });
    
    // Info text fade in
    gsap.from(".info", {
      opacity: 0,
    });
    
    gsap.to(".info", {
      opacity: 1,
      duration: 2,
    });
    
    // Social icons animation
    const tl = gsap.timeline();
    tl.from(".social-icon", {
      duration: 0.8,
      opacity: 0,
      rotation: 45,
      y: -40,
      ease: "back.out"
    });
    
    // Profile image animation
    gsap.from(".profile-card", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      delay: 0.5
    });
  }, []);

  const socialLinks = [
    {
      icon: <SiGithub size={20} />,
      label: 'GitHub',
      onClick: () => window.open("https://github.com/AbhinandNandakumar", "_blank"),
      bgColor: "bg-gray-800"
    },
    {
      icon: <FaLinkedinIn size={20} />,
      label: 'LinkedIn',
      onClick: () => window.open("https://www.linkedin.com/in/abhinand-nandakumar/", "_blank"),
      bgColor: "bg-blue-600"
    },
    {
      icon: <MdEmail size={20} />,
      label: 'Gmail',
      onClick: () => window.open("mailto:abhinandn2022@gmail.com", "_blank"),
      bgColor: "bg-red-500"
    },
    {
      icon: <FaInstagram size={20} />,
      label: 'Instagram',
      onClick: () => window.open("https://www.instagram.com/abhi.nand_n", "_blank"),
      bgColor: "bg-pink-600"
    },
  ];

  return (
    <div id="home" ref={containerRef} className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 md:py-32">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left"
          >
            <h1 ref={textRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Hi, I'm <span className="name text-blue-400">Abhinand Nandakumar</span>
            </h1>
            
            <p className="info text-lg md:text-xl mb-4 md:mb-6 text-blue-100">
              BTech in Computer Science Engineering at Government Engineering College, Thrissur
            </p>
            
            <div className="text-gray-300 text-base md:text-lg mb-6 md:mb-8">
              Passionate developer focused on creating intuitive and responsive web experiences using modern technologies.
            </div>
            

            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mb-6 md:mb-8">
              {socialLinks.map((link, index) => (
                <div 
                  key={index}
                  onClick={link.onClick}
                  className={`social-icon cursor-pointer p-2 md:p-3 rounded-full ${link.bgColor} text-white hover:scale-110 transition-all duration-300 flex items-center justify-center`}
                  title={link.label}
                >
                  {link.icon}
                </div>
              ))}
            </div>
            
            <button
              onClick={handleDownload}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 px-6 md:px-8 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/50"
            >
              <span>Download CV</span>
              {isHovered && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
            </button>
          </motion.div>
          
          {/* Profile Image Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-3/4 sm:w-4/5 md:w-5/12 max-w-xs md:max-w-none mx-auto md:mx-0"
          >
            <div className="profile-card bg-blue-900/20 backdrop-filter backdrop-blur-lg p-3 md:p-4 rounded-lg border border-blue-400/30 shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              <div className="aspect-square overflow-hidden rounded-lg mb-3 md:mb-4">
                <img 
                  src={profileImage} 
                  alt="Abhinand Nandakumar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://www.example.com';
                  }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2">Abhinand Nandakumar</h3>
                <p className="text-blue-300 text-sm md:text-base">Web Developer & CS Engineer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;