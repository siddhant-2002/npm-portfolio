import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-300 bg-gray-100">
              <img 
                src="https://github.com/siddhant-2002.png" 
                alt="profile image" 
                className="w-full h-full object-cover"
              />
            </div>
              <span className="text-xl font-bold tracking-tight">npm-portfolio</span>
            </a>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              A curated collection of open-source NPM packages designed for modern web development. Built for performance and scalability.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-black mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#packages" className="text-gray-500 hover:text-black transition-colors">Packages</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-black transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-black mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com/siddhant-2002" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-gray-600 hover:bg-black hover:text-white transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/sid-deshmukh/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-full text-gray-600 hover:bg-black hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Siddhant Deshmukh. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <span>Built with</span>
            <Heart size={14} className="fill-red-400 text-red-400" />
            <span>Love</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
