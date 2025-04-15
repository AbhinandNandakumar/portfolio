import React, { useState, useEffect } from 'react';
import { TfiMenuAlt } from "react-icons/tfi";
import { HashLink as Link } from 'react-router-hash-link';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll state for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Update active section based on scroll position
      const sections = ["#home", "#skills", "#projects", "#contact"];
      const currentSection = sections.findLast(section => {
        const element = document.querySelector(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100;
      }) || "#home";
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for navbar items
  useGSAP(() => {
    gsap.set(".nav-item", { opacity: 0, y: -20 });
    
    gsap.to(".nav-item", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    });
    
    gsap.from(".logo", {
      opacity: 0,
      x: -20,
      duration: 0.8,
    });
  }, []);

  const navItems = [
    { id: "#home", label: "Home" },
    { id: "#about", label: "About" },
    { id: "#skills", label: "Skills" },
    { id: "#projects", label: "Projects" },
    { id: "#contact", label: "Contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-blue-900/80 backdrop-filter backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="#home" onClick={() => setActiveSection("#home")} className="logo">
            <h1 className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
              <span className="text-blue-400">A</span>bhinand
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth
                onClick={() => setActiveSection(item.id)}
                className={`nav-item text-lg transition-all duration-300 relative ${
                  activeSection === item.id ? 'text-blue-400' : 'text-white hover:text-blue-300'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <TfiMenuAlt className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-2 bg-blue-900/90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block py-2 px-4 text-center ${
                  activeSection === item.id ? 'text-blue-400' : 'text-white hover:text-blue-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;