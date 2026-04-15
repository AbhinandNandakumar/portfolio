import { component, useEffect, useState, useRef } from 'react';
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiOutlineDownload } from "react-icons/hi";
import gsap from "gsap";
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const handleDownload = () => {
    // Replace with your actual CV path
    const pdfUrl = "/assets/resume.pdf";
    saveAs(pdfUrl, "Abhinand_Nandakumar.pdf");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Name animation
      gsap.from(".name", {
        color: "rgb(175, 200, 255)",
        duration: 0.85,
        x: 100,
        opacity: 0.2,
      });

      gsap.to(".name", {
        opacity: 1,
        ease: "power3.inOut",
        textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
        duration: 2,
      });

      // Info text fade in
      gsap.from(".info", {
        opacity: 0,
        duration: 1,
      });

      // // Social icons animation
      // const tl = gsap.timeline();
      // tl.from(".social-icon", {
      //   duration: 0.4,
      //   opacity: 0,
      //   rotation: 45,
      //   y: -40,
      //   stagger: 0.1,
      //   ease: "back.out"
      // });

      // Profile image animations
      gsap.from(".profile-image-container", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 0.5
      });

      // Rotating border animation
      gsap.to(".rotating-border", {
        rotation: 360,
        repeat: -1,
        duration: 20,
        ease: "linear"
      });

      // Pulse glow effect
      gsap.to(".glow-effect", {
        boxShadow: "0 0 30px rgba(59,130,246,0.8)",
        repeat: -1,
        yoyo: true,
        duration: 2
      });

      // Floating animation for the image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: "-10px",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power1.inOut"
        });
      }
    }, containerRef); // Scope animations to containerRef

    // Cleanup function to kill animations when component unmounts
    return () => ctx.revert();
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
    <div id="home" ref={containerRef} className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-20 py-12 md:py-32 ">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-center md:text-left z-10"
          >
            <h1 ref={textRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Hi, I'm <span className="name text-blue-400">Abhinand Nandakumar</span>
            </h1>

            <p className="info text-lg md:text-xl mb-4 md:mb-6 text-blue-100">
              BTech in Computer Science Engineering at Government Engineering College, Thrissur
            </p>

            <div className="text-gray-300 text-base md:text-lg mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
              I turn big ideas into smooth digital realities—making sure
              everything I build looks sharp and feels even better.
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
              className="group relative inline-flex items-center px-8 py-3 overflow-hidden rounded-full shadow-md hover:shadow-blue-500/30 transition-all duration-500 text-white"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-500 group-hover:scale-105"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 opacity-0 group-hover:opacity-60 transition-all duration-500 blur-md"></span>
              <span className="relative flex items-center gap-2">
                Resume
                <HiOutlineDownload className={`text-xl transition-all duration-300 ${isHovered ? 'translate-y-1' : ''}`} />
              </span>
            </button>
          </motion.div>

          {/*profile image*/}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-3/4 sm:w-2/3 md:w-5/12 relative max-w-xs md:max-w-sm mx-auto md:mx-0"
          >

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/30 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-indigo-600/20 to-transparent rounded-full blur-xl"></div>
            </div>


            <div className="rotating-border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-dashed border-blue-400/60 rounded-full"></div>

            <div className="rotating-border absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full border-2 border-dotted border-indigo-500/40 rounded-full" style={{ animationDelay: "-5s" }}></div>

            {/* Main profile image container */}
            <div className="profile-image-container relative z-10 mx-auto">

              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-indigo-600 rounded-full opacity-70 animate-ping" style={{ animationDuration: "3s" }}></div>

              <div className="glow-effect absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6 h-5/6 rounded-full bg-blue-500/20 backdrop-blur-sm"></div>



              <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-white/80 to-transparent rounded-full blur-sm"></div>

              <div className="relative mx-auto overflow-hidden aspect-square rounded-full border-4 border-blue-400/50 shadow-lg shadow-blue-500/30 w-4/5 max-w-xs">
                <img
                  ref={imageRef}
                  src="/img/dp2.png"
                  alt="Abhinand Nandakumar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>

              {/* Name tag */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-blue-400/40 text-center shadow-lg">
                <p className="text-blue-100 text-sm font-medium">Abhinand Nandakumar</p>
              </div>
            </div>

            <div className="absolute top-1/4 right-0 w-8 h-8 bg-gradient-to-br from-blue-500/40 to-indigo-600/40 rounded-full animate-bounce" style={{ animationDuration: "2.5s" }}></div>
            <div className="absolute bottom-1/4 left-0 w-6 h-6 bg-gradient-to-tr from-blue-400/40 to-purple-500/40 rounded-full animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;