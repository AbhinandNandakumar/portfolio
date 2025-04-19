import React, { useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { 
    category: "PROGRAMMING LANGUAGES", 
    skills: [
      { name: "Python", level: 80 },
      { name: "C", level: 60 },
      { name: "JavaScript", level: 45 },
      { name: "Java", level: 50 }
    ]
  },
  { 
    category: "SKILLS", 
    skills: [
      { name: "React, Tailwind", level: 80 },
      { name: "Flutter", level: 60 },
      { name: "Generative AI", level: 50 }
    ]
  }
];

const Skills = () => {
  const progressBarsRef = useRef({});
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Animate section title
    gsap.from(".skills-title", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Animate card containers
    gsap.from(".skill-card", {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".skill-card",
        start: "top 80%",
      }
    });

    // Animate progress bars
    Object.values(progressBarsRef.current).forEach((bar, index) => {
      gsap.fromTo(
        bar,
        { width: "0%" },
        {
          width: bar.getAttribute("data-level") + "%",
          duration: 1.5,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "restart none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div id="skills" ref={sectionRef} className="min-h-screen flex items-center py-24">
      <div className="container px-5 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="skills-title text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Here are some of the skills that I am capable of handling
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              className="skill-card flex-1 p-8 bg-blue-900/20 backdrop-filter backdrop-blur-lg bborder-2 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.4)] rounded-xl"
            >
              <h2 className="font-medium text-blue-300 tracking-widest mb-6 text-lg text-center md:text-left">
                {category.category}
              </h2>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => {
                  const refKey = `${categoryIndex}-${skillIndex}`;
                  return (
                    <div key={skillIndex} className="w-full">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-blue-300">{skill.level}%</span>
                      </div>
                      
                      <div className="h-2.5 bg-blue-900/50 rounded-full w-full overflow-hidden">
                        <div
                          ref={(el) => (progressBarsRef.current[refKey] = el)}
                          data-level={skill.level}
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                          style={{ width: "0%" }}
                        >
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center relative z-10"
        >
          <h3 className="text-2xl font-semibold mb-6 text-blue-300">Other Skills</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Git & GitHub", "UI/UX Design", "Responsive Design", 
              "REST API", "Firebase", "MongoDB", "Node.js", "Express"
            ].map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                className="px-4 py-2 bg-blue-800/30 border border-blue-500/20 rounded-full text-blue-200 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;