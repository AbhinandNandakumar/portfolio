import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { HiOutlineDownload } from "react-icons/hi";
import { saveAs } from 'file-saver';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace "YOUR_FORMSPREE_ID" with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xdkgnzne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <MdEmail className="text-blue-400 text-2xl" />,
      label: 'Email',
      value: 'abhinandn2022@gmail.com',
      link: 'mailto:abhinandn2022@gmail.com'
    },
    {
      icon: <MdPhone className="text-blue-400 text-2xl" />,
      label: 'Phone',
      value: '+91 8089195500',
      link: 'tel:+918089195500'
    },
    {
      icon: <MdLocationOn className="text-blue-400 text-2xl" />,
      label: 'Location',
      value: 'Thrissur, Kerala (India)',
      link: 'https://maps.google.com/?q=Thrissur,Kerala,India'
    }
  ];

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-blue-900/20 backdrop-filter backdrop-blur-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-blue-900/40 border-b border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
              </div>
              <span className="text-xs text-blue-300/60 font-mono">connect:~</span>
              <div className="w-14"></div>
            </div>

            {/* Terminal Body */}
            <div className="p-8 font-mono text-sm">
              <div className="mb-6">
                <p className="text-blue-400">$ ./start_contact.sh</p>
                <p className="text-[11px] opacity-40 mt-1">✓ Connection secure. Ready for input...</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div className="relative group">
                    <label className="flex items-center text-blue-300 mb-2">
                      <span className="text-blue-500 mr-2 opacity-50">❯</span> name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-blue-500/30 focus:border-blue-400 outline-none text-blue-100 py-2 transition-all placeholder-blue-300/10"
                      placeholder='"your name"'
                    />
                  </div>

                  <div className="relative group">
                    <label className="flex items-center text-blue-300 mb-2">
                      <span className="text-blue-500 mr-2 opacity-50">❯</span> email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-blue-500/30 focus:border-blue-400 outline-none text-blue-100 py-2 transition-all placeholder-blue-300/10"
                      placeholder='"your@email.com"'
                    />
                  </div>

                  <div className="relative group">
                    <label className="flex items-center text-blue-300 mb-2">
                      <span className="text-blue-500 mr-2 opacity-50">❯</span> message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-blue-500/30 focus:border-blue-400 outline-none text-blue-100 py-2 h-24 resize-none transition-all placeholder-blue-300/10"
                      placeholder='"hello there..."'
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-mono text-sm transition-all flex items-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    {isSubmitting ? "SENDING..." : "./send_message.sh"}
                    <span className="transition-transform group-hover:translate-x-1">↵</span>
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="mt-6 text-blue-400 text-xs animate-pulse">
                    ✓ SUCCESS: Message encrypted and sent.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-blue-900/20 backdrop-filter backdrop-blur-lg border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-blue-900/40 border-b border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/60"></div>
              </div>
              <span className="text-xs text-blue-300/60 font-mono">info.sh</span>
              <div className="w-14"></div>
            </div>

            <div className="p-8 space-y-10 font-mono">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500/20 transition-all">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-blue-400/50 uppercase mb-1 tracking-widest">{info.label}</p>
                      <a href={info.link} className="text-sm text-blue-100 hover:text-blue-400 transition-colors">{info.value}</a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-blue-500/20">
                <div className="flex gap-4">
                  {[
                    { icon: <SiGithub/>, link: "https://github.com/AbhinandNandakumar" },
                    { icon: <FaLinkedinIn/>, link: "https://www.linkedin.com/in/abhinand-nandakumar/" },
                    { icon: <FaInstagram/>, link: "https://www.instagram.com/abhi_nand__n" }
                  ].map((social, index) => (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-blue-500/10 rounded-xl text-blue-300 hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-500/20">
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-blue-500/20">
                <p className="text-[10px] font-mono text-blue-400 uppercase mb-4 tracking-widest">Download</p>
                <button
                  onClick={() => saveAs("/assets/resume.pdf", "Abhinand_Nandakumar.pdf")}
                  className="flex items-center gap-3 text-sm text-blue-100 hover:text-blue-400 transition-all group"
                >
                  <div className="p-2.5 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-all">
                    <HiOutlineDownload className="text-lg" />
                  </div>
                  <span>resume.pdf</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;