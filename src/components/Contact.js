import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { saveAs } from 'file-saver';
const Contact = () => {
  const [formData, setState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setState({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
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
      <div className="container mx-auto px-4">
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
            className="rounded-xl p-8 bg-blue-900/20 backdrop-filter backdrop-blur-lg border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-300">Send Me a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-blue-200">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border bg-blue-900/30 border-blue-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-blue-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border bg-blue-900/30 border-blue-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Your email"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-blue-200">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border bg-blue-900/30 border-blue-400/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white h-32 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Send Message"}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg text-center">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl p-8 bg-blue-900/20 backdrop-filter backdrop-blur-lg border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <h3 className="text-2xl font-semibold mb-6 text-blue-300">
              Contact Information
            </h3>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 bg-blue-800/40 rounded-full">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-blue-300">{info.label}</h4>
                    <a 
                      href={info.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12">
              <h4 className="text-lg font-medium text-blue-300 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: "fab fa-github", link: "https://github.com/AbhinandNandakumar" },
                  { icon: "fab fa-linkedin-in", link: "https://www.linkedin.com/in/abhinand-nandakumar/" },
                  { icon: "fab fa-instagram", link: "https://www.instagram.com/abhi_nand__n" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-800/40 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={social.icon}></i>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-lg font-medium text-blue-300 mb-4">Resume</h4>
              <a 
                href="#" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  // Replace with actual CV download function
                  const pdfUrl = "/assets/cv.pdf";
                  saveAs(pdfUrl, "Abhinand_Nandakumar_CV.pdf");
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;