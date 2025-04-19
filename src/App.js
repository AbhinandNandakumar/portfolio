import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Page loading animation
    const tl = gsap.timeline();
    tl.to('.loader', {
      opacity: 0,
      display: 'none',
      duration: 1,
      delay: 0.5
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetId,
            offsetY: 80
          },
          ease: 'power3.inOut'
        });
      });
    });
    
    return () => {
      // Cleanup event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <Router>
      {/* Loader */}
      <div className="loader fixed inset-0 bg-blue-900 flex items-center justify-center z-50">
        <div className="loader-content">
          <h1 className="text-4xl font-bold text-white">
            <span className="text-blue-400">A</span>bhinand
          </h1>
          <div className="mt-4 w-full h-1 bg-blue-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse-width"></div>
          </div>
        </div>
      </div>

      <div className="app-container bg-gradient-to-br from-blue-900 via-black to-blue-900 text-white min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;