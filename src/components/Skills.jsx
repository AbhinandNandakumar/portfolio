import React, { useRef, useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";

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

  useEffect(() => {
    // Create a context for GSAP animations
    const ctx = gsap.context(() => {
      // Animate section title with better trigger settings
      gsap.from(".skills-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: false, // Allow animation to repeat
        }
      });

      // Animate card containers with better settings
      gsap.from(".skill-card", {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".skill-card",
          start: "top 85%",
          end: "top 15%",
          toggleActions: "play none none reverse", // Play on enter, reverse on leave
          once: false, // Allow animation to repeat
        }
      });

      // Create a single ScrollTrigger for all progress bars
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => animateProgressBars(1),
        onEnterBack: () => animateProgressBars(1),
        onLeave: () => animateProgressBars(0),
        onLeaveBack: () => animateProgressBars(0),
      });
      
      // Initial animation to ensure skills are visible when directly navigating to the section
      animateProgressBars(1);
    }, sectionRef);

    // Function to animate progress bars
    function animateProgressBars(direction) {
      Object.values(progressBarsRef.current).forEach((bar, index) => {
        if (bar) {
          const level = bar.getAttribute("data-level") + "%";
          gsap.to(bar, {
            width: direction ? level : "0%",
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
          });
        }
      });
    }

    // Cleanup on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div id="skills" ref={sectionRef} className="min-h-screen flex items-center py-24">
      <div className="container px-4 md:px-20 mx-auto">
        <div className="text-center mb-16">
          <h2 className="skills-title text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Here are some of the skills that I am capable of handling
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {skillsData.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="skill-card flex-1 p-8 bg-blue-900/20 backdrop-filter backdrop-blur-lg border-2 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.4)] rounded-xl"
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
            </div>
          ))}
        </div>
        
        {/* Additional Skills Section */}
        <div className="mt-16 text-center relative z-10">
          <h3 className="text-2xl font-semibold mb-6 text-blue-300">Other Skills</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Git & GitHub", "UI/UX Design", "Responsive Design", 
              "REST API", "Firebase", "MongoDB", "Node.js", "Express"
            ].map((skill, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-blue-800/30 border border-blue-500/20 rounded-full text-blue-200 transition-all duration-300 relative overflow-hidden group hover:scale-105 hover:bg-blue-500/30"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;