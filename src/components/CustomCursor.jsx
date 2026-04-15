import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse positions using motion values for smooth springs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for smooth following
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        window.getComputedStyle(target).cursor === 'pointer';
        
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Cursor Dot - Bigger and with Glow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_12px_rgba(96,165,250,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer Ring - Smaller and cleaner */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center"
        animate={{
          scale: isHovered ? 1.4 : 1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className={`w-8 h-8 border border-white/30 rounded-full transition-all duration-300 ${isHovered ? 'bg-blue-400/20 border-blue-400/50' : ''}`} />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
