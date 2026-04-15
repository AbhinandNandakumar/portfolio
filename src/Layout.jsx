import React, { useRef, useEffect, useState } from 'react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CustomCursor from './components/CustomCursor';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Use mouse position for parallax effects
  useEffect(() => {
    if (containerRef.current) {
      const moveX = (mousePosition.x - window.innerWidth / 2) / 50;
      const moveY = (mousePosition.y - window.innerHeight / 2) / 50;
      
      gsap.to(".parallax-bg", {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
      });
    }
  }, [mousePosition]);

  useEffect(() => {
   // Animated gradient background
   gsap.to(".animated-gradient", {
      backgroundPosition: "-200% center",
      duration: 10,
      repeat: -1,
      ease: "none"
    });
    
    // Create floating particles in background
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full bg-blue-400 opacity-20 pointer-events-none";
      
      // Random particle size
      const size = Math.random() * 10 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      containerRef.current.appendChild(particle);
      particlesRef.current.push(particle);
      
      // Animate the particle
      gsap.to(particle, {
        y: -300 - Math.random() * 300,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 5 + Math.random() * 10,
        ease: "power1.out",
        onComplete: () => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            particlesRef.current = particlesRef.current.filter(p => p !== particle);
          }
          createParticle();
        }
      });
    };
    
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createParticle(), i * 300);
    }
    
    // Create dynamic stars in background
    const createStar = () => {
      const star = document.createElement("div");
      star.className = "absolute w-1 h-1 rounded-full bg-white opacity-70 pointer-events-none";
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      containerRef.current.appendChild(star);
      
      // Star twinkle animation
      gsap.to(star, {
        opacity: Math.random() * 0.5 + 0.3,
        repeat: -1,
        yoyo: true,
        duration: 1 + Math.random() * 3
      });
    };
    
    // Create stars
    for (let i = 0; i < 30; i++) {
      createStar();
    }
 }, []);


    


  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-black/50 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-black/30 z-0"></div>
      
      {/* Animated gradient background */}
      <div className="animated-gradient fixed inset-0 opacity-10 z-0 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 bg-[length:200%_100%]"></div>
      
      {/* Parallax floating elements */}
      <div className="parallax-bg fixed top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl z-0"></div>
      <div className="parallax-bg fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-500/5 blur-3xl z-0"></div>
      
      {/* Moving grid lines */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.3) 75%, rgba(59, 130, 246, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.3) 75%, rgba(59, 130, 246, 0.3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}>
        </div>
      </div>
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Page content */}
      <div className="relative z-10">{children}</div>
      
      {/* Global animations styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default Layout;