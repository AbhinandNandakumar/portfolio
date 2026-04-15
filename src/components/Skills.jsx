import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { 
  FaReact, FaPython, FaNodeJs, FaGitAlt, 
  FaDatabase, FaCode, FaBootstrap 
} from "react-icons/fa";
import { 
  SiFlutter, SiMongodb, SiFirebase, 
  SiFigma, SiDocker, SiKubernetes 
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    // We only need GSAP for the ScrollTrigger.refresh() now
    // as Framer Motion handles the entrance.
    const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(target, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });

    const glow = target.querySelector(".glow");
    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        left: x - glow.offsetWidth / 2,
        top: y - glow.offsetHeight / 2,
        duration: 0.1,
      });
    }
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
    const glow = e.currentTarget.querySelector(".glow");
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const SkillBox = ({ title, skills, icon: Icon, className, color }) => (
    <motion.div
      variants={itemVariants}
      className={`${className}`}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden p-6 bg-blue-900/10 backdrop-filter backdrop-blur-md border border-blue-500/30 rounded-2xl group transition-all duration-500 hover:border-blue-400/50 hover:bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] h-full w-full"
        style={{ willChange: "transform", transformStyle: "preserve-3d" }}
      >
        {/* Static Center Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: `radial-gradient(circle, ${color || 'rgba(59, 130, 246, 0.4)'} 0%, transparent 70%)`, zIndex: 0 }}
        />

        {/* Mouse Follow Glow */}
        <div className="glow pointer-events-none absolute w-64 h-64 opacity-0 rounded-full blur-[80px] transition-opacity duration-500" 
             style={{ background: `radial-gradient(circle, ${color || 'rgba(59, 130, 246, 0.3)'} 0%, transparent 70%)`, zIndex: 0 }} 
        />
        
        <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-blue-500/10 text-2xl font-bold ${color ? `text-blue-300` : 'text-blue-400'}`}>
                <Icon />
              </div>
              <h3 className="text-xs font-bold text-blue-200 tracking-widest uppercase opacity-70">{title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 text-[11px] font-mono bg-blue-500/5 border border-blue-500/10 rounded-lg text-blue-100/90"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div id="skills" className="min-h-screen py-24 flex items-center bg-transparent">
      <div className="container px-4 md:px-20 mx-auto">
        <div className="text-center mb-16">
          <h2 className="skills-title text-4xl font-bold mb-4 text-white">My Skills</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Here are some of the skills that I am capable of handling
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[160px] max-w-6xl mx-auto"
        >
          {/* Row 1: Frontend and Programming (Balanced 2+2) */}
          <SkillBox 
            title="Frontend Engineering"
            skills={["React", "Next.js", "Tailwind CSS", "Bootstrap", "GSAP", "Framer Motion"]}
            icon={FaReact}
            className="md:col-span-2"
            color="rgba(34, 211, 238, 0.4)"
          />

          <SkillBox 
            title="Programming"
            skills={["Python", "JavaScript", "C", "Java"]}
            icon={FaCode}
            className="md:col-span-2"
            color="rgba(96, 165, 250, 0.3)"
          />

          {/* Row 2: Server Side and DevOps (Balanced 2+2) */}
          <SkillBox 
            title="Server Side"
            skills={["Node.js", "Express", "REST API", "Websocket", "Flask"]}
            icon={FaNodeJs}
            className="md:col-span-2"
            color="rgba(74, 222, 128, 0.3)"
          />

          <SkillBox 
            title="Data & Devops"
            skills={["SQL","MongoDB", "Firebase", "Docker", "Kubernetes"]}
            icon={SiDocker}
            className="md:col-span-2"
            color="rgba(34, 197, 94, 0.3)"
          />

          {/* Row 3: Mobile, Design, and Tools (Balanced 1+1+2) */}
          <SkillBox 
            title="Mobile"
            skills={["Flutter", "Dart"]}
            icon={SiFlutter}
            className="md:col-span-1"
            color="rgba(2, 132, 199, 0.3)"
          />

          <SkillBox 
            title="Design"
            skills={["Figma", "UI/UX"]}
            icon={SiFigma}
            className="md:col-span-1"
            color="rgba(168, 85, 247, 0.3)"
          />

          <SkillBox 
            title="Tools & Environment"
            skills={["Git & GitHub", "VS Code", "Postman"]}
            icon={FaGitAlt}
            className="md:col-span-2"
            color="rgba(239, 68, 68, 0.3)"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
