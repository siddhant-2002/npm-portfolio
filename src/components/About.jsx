import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Globe, 
  Zap, 
  Coffee, 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Database, 
  Layout, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const techStack = [
    { name: 'React', icon: <Code size={16} />, color: 'text-blue-500' },
    { name: 'Node.js', icon: <Terminal size={16} />, color: 'text-green-500' },
    { name: 'TypeScript', icon: <Cpu size={16} />, color: 'text-blue-600' },
    { name: 'Next.js', icon: <Globe size={16} />, color: 'text-black' },
    { name: 'Tailwind', icon: <Layout size={16} />, color: 'text-cyan-500' },
    { name: 'Database', icon: <Database size={16} />, color: 'text-purple-500' },
  ];

  return (
    <section className="min-h-screen bg-white relative overflow-hidden flex items-center py-12" id="about">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.4] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight mb-2 font-display">
            About <span className="text-gray-400">Me</span>
          </h2>
          <p className="text-base text-gray-500 max-w-2xl font-light">
            A glimpse into my world of code, creativity, and continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Widgets */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Stats / Experience Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-black text-white rounded-2xl p-5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black z-0" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity" />
              
              <div className="relative z-10 h-full flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <Coffee size={20} className="text-gray-400" />
                  <span className="text-[10px] font-mono text-gray-500">EST. 2021</span>
                </div>
                
                <div>
                  <div className="text-4xl font-bold mb-1 font-display">1.5+</div>
                  <div className="text-gray-400 font-medium text-sm">Years of Experience</div>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <h4 className="text-base font-bold text-black mb-4 flex items-center">
                <Zap size={16} className="mr-2 text-amber-500" />
                Tech Arsenal
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className={tech.color}>{tech.icon}</span>
                    <span className="text-xs font-medium text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {/* Socials Card */}
              <motion.div 
                variants={itemVariants}
                className="bg-blue-600 rounded-2xl p-5 text-white relative overflow-hidden group cursor-pointer h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity" />
                
                <a href="https://www.linkedin.com/in/sid-deshmukh/" target="_blank" rel="noopener noreferrer" className="h-full flex flex-col justify-between gap-3 relative z-10">
                  <div className="flex justify-between items-start">
                    <Linkedin size={20} />
                    <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-0.5">Connect</h4>
                    <p className="text-blue-100 text-[10px]">LinkedIn</p>
                  </div>
                </a>
              </motion.div>

              {/* Github Card */}
              <motion.div 
                variants={itemVariants}
                className="bg-gray-900 rounded-2xl p-5 text-white relative overflow-hidden group cursor-pointer h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                 <a href="https://github.com/siddhant-2002" target="_blank" rel="noopener noreferrer" className="h-full flex flex-col justify-between gap-3 relative z-10">
                  <div className="flex justify-between items-start">
                    <Github size={20} />
                    <ArrowUpRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold mb-0.5">Code</h4>
                    <p className="text-gray-400 text-[10px]">GitHub</p>
                  </div>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Description & Status */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Main Bio Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-500 h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="relative z-10 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                      <Sparkles size={14} className="text-yellow-500" />
                    </div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Who I am</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 font-display leading-tight">
                    Building digital experiences with <span className="text-blue-600">purpose</span> and <span className="text-purple-600">precision</span>.
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-base mb-6 max-w-2xl">
                    I'm Siddhant, a Full Stack Developer passionate about crafting accessible, pixel-perfect user interfaces that blend form and function. I thrive on turning complex problems into simple, beautiful solutions.
                  </p>
                </div>
                

                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
                    🚀 Full Stack
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
                    🎨 UI/UX Enthusiast
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
                    ⚡ Performance
                  </div>
                  <div className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-700 shadow-sm">
                    🔍 SEO Optimized
                  </div>
                </div>
              </div>
            </motion.div>

  
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
