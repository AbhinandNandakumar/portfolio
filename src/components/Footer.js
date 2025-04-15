import React from 'react';
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    {
      icon: <SiGithub size={18} />,
      url: "https://github.com/AbhinandNandakumar",
      label: "GitHub"
    },
    {
      icon: <FaLinkedinIn size={18} />,
      url: "https://www.linkedin.com/in/abhinand-nandakumar/",
      label: "LinkedIn"
    },
    {
      icon: <MdEmail size={18} />,
      url: "mailto:abhinandn2022@gmail.com",
      label: "Email"
    },
    {
      icon: <FaInstagram size={18} />,
      url: "https://www.instagram.com/abhi.nand_n",
      label: "Instagram"
    }
  ];

  const footerLinks = [
    { label: "Home", url: "#home" },
    { label: "About", url: "#about" },
    { label: "Skills", url: "#skills" },
    { label: "Projects", url: "#projects" },
    { label: "Contact", url: "#contact" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900/40 backdrop-filter backdrop-blur-lg border-t border-blue-500/20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">
              <span className="text-blue-400">A</span>bhinand Nandakumar
            </h2>
            <p className="text-blue-200 max-w-md">
              Computer Science Engineer focused on creating modern web experiences
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-300">Links</h3>
              <ul className="space-y-2">
                {footerLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url} 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-300">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-800/50 hover:bg-blue-700 p-2 rounded-full transition-all duration-300"
                    title={link.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800/50 mt-8 pt-8 text-center text-sm text-blue-200/60">
          <p>© {currentYear} Abhinand Nandakumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;