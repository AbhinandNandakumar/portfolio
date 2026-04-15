import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);


  const stats = [
    { value: "7+", label: "Projects Built" },
    { value: "4+", label: "Years Coding" },
    { value: "1", label: "Internship" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-20">
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
            <div className="bg-blue-900/20 backdrop-filter backdrop-blur-lg p-8 rounded-2xl border-2 border-blue-500/30 shadow-[0_0_25px_rgba(59,130,246,0.4)] h-full">
              <h3 className="text-4xl font-bold mb-6 text-blue-400">Abhinand Nandakumar</h3>
              <p className="text-xl text-blue-200 mb-6">Full Stack Developer</p>
              <p className="text-gray-300 mb-6">
                Currently interning as a Flutter Frontend Developer — learning fast and building real stuff.
              </p>

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
              Computer Science Engineer & Software Developer
            </h3>

            <div className="about-text space-y-4 text-gray-300">
              <p>
                I'm a CSE student at GEC Thrissur who genuinely enjoys building things for the web. What started as curiosity turned into late nights debugging React apps — and honestly, I wouldn't trade it.
              </p>

              <p>
                Right now I'm interning as a Flutter frontend developer, picking up mobile development while still staying close to my React roots. It's a fun mix.
              </p>

              <p>
                I like clean UIs, fast apps, and figuring out how to make things feel smooth. Outside of code, I'm usually tinkering with AI tools or going too deep into some random tech rabbit hole.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Education</h4>
                <ul className="space-y-2">
                  <li className="about-text">
                    <span className="font-medium">BTech CSE</span>
                    <p className="text-sm text-gray-400">GEC Thrissur</p>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Currently Into</h4>
                <ul className="space-y-1 about-text text-gray-300">
                  <li>Flutter (Internship)</li>
                  <li>React & Web Dev</li>
                  <li>AI Tools</li>
                  <li>Open Source</li>
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