import React, { useState, useEffect } from 'react';
import { Menu, X, Github, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#packages', label: 'Packages' },
    { href: '#about', label: 'About' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
      >
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300
          ${scrolled || mobileMenuOpen 
            ? 'w-full max-w-5xl bg-white/80 backdrop-blur-xl shadow-lg border border-white/20' 
            : 'w-full max-w-7xl bg-transparent'}
        `}>
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-lg rounded-full shadow-md group-hover:scale-105 transition-transform duration-300">
              N
            </div>
            <span className={`text-lg font-bold tracking-tight transition-colors ${scrolled ? 'text-black' : 'text-black'}`}>
              npm-portfolio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50 backdrop-blur-sm">
              {navLinks.map(l => (
                <a 
                  key={l.label} 
                  href={l.href} 
                  className="px-5 py-2 text-sm font-medium text-gray-600 rounded-full hover:bg-white hover:text-black hover:shadow-sm transition-all duration-300"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <a 
              href="https://github.com/siddhant-2002" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 bg-black text-white px-5 py-2.5 text-sm font-medium rounded-full hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-black bg-gray-100 rounded-full"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: -20 }} 
            className="fixed top-24 left-6 right-6 bg-white/90 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-2xl z-40 p-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(l => (
                <a 
                  key={l.label} 
                  href={l.href} 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-4 text-xl font-medium text-gray-900 hover:bg-gray-50 rounded-2xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <a 
                href="https://github.com/" 
                target="_blank" 
                rel="noreferrer" 
                className="p-4 text-xl font-medium flex items-center justify-between bg-black text-white rounded-2xl"
              >
                GitHub <ArrowUpRight size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

