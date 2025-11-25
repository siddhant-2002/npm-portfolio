import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, ExternalLink, Github, Box } from 'lucide-react';

const PackageCard = ({ pkg, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 border border-gray-100/80 shadow-[0_2px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-violet-100/50 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Hover Gradient Overlay - More vibrant/iridescent */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      <div className="relative flex justify-between items-start mb-6">
        <div className="w-14 h-14 bg-gray-50 text-gray-600 flex items-center justify-center rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-violet-200 group-hover:scale-110">
          <Box size={28} strokeWidth={1.5} />
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-gray-50 text-gray-500 rounded-full border border-gray-100 group-hover:border-violet-100 group-hover:text-violet-600 transition-colors">
            v{pkg.version}
            </span>
        </div>
      </div>

      <div className="relative mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight group-hover:text-violet-600 transition-colors font-display">
            {pkg.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {pkg.description}
        </p>
      </div>

      {/* Stats Row */}
      <div className="relative grid grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col p-3 rounded-2xl bg-gray-50/50 border border-gray-100/50 group-hover:bg-white/80 transition-colors">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Downloads</span>
            <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <Download size={14} className="text-violet-500" />
                {pkg.downloads}
            </div>
        </div>
        <div className="flex flex-col p-3 rounded-2xl bg-gray-50/50 border border-gray-100/50 group-hover:bg-white/80 transition-colors">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Stars</span>
            <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                {pkg.stars}
            </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-auto flex items-center justify-between pt-6 border-t border-gray-100/50">
        <div className="flex flex-wrap gap-2">
            {pkg.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100/50 group-hover:border-violet-100/50 transition-colors">
                #{tag}
            </span>
            ))}
        </div>

        <div className="flex gap-1">
            <button
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); window.open(pkg.githubLink, '_blank'); }}
                title="View Source"
            >
                <Github size={18} />
            </button>
            <button
                className="p-2 text-gray-400 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); window.open(pkg.npmLink, '_blank'); }}
                title="View on NPM"
            >
                <ExternalLink size={18} />
            </button>
        </div>
      </div>
      
    

    </motion.div>
  );
};

export default PackageCard;

