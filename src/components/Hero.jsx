import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Box, Layers, Zap, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-screen bg-white relative overflow-hidden flex items-center justify-center pt-16">
      {/* Modern Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-50 via-purple-50 to-transparent rounded-[100%] blur-3xl -z-10 opacity-60 pointer-events-none"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl opacity-60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left flex flex-col justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6 shadow-sm w-fit"
            >
              <Sparkles size={12} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-900">v2.0 Available</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-6 leading-[0.95] tracking-tight">
              Build faster
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                with confidence.
              </span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed font-normal">
              Open-source NPM packages designed for modern web development. 
              Optimized for performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#packages"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold text-base rounded-full shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Exploring
                <ArrowRight size={18} className="ml-2" />
              </motion.a>

              <motion.a
                href="https://www.npmjs.com/~bugkiller"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border border-gray-200 font-semibold text-base rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                <Code size={18} className="mr-2" />
                Documentation
              </motion.a>
            </div>

          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 text-blue-600">
                    <Box size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Modular</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Components designed to work together.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-black p-6 rounded-2xl border border-black text-white shadow-2xl shadow-purple-900/20"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                    <Zap size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-1">Fast</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">Optimized for speed.</p>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-purple-50 p-6 rounded-2xl border border-purple-100 shadow-sm"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-3 text-purple-600 shadow-sm">
                    <Layers size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Scalable</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Built to grow with you.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                >
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-3 text-teal-600">
                    <Code size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-gray-900">Typed</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">First-class TypeScript support.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
