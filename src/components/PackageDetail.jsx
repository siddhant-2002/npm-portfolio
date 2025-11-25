import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  Box,
  Terminal,
  Copy,
  Check,
  Calendar,
  FileText,
  ExternalLink,
  Layers,
  BookOpen,
  Clock,
  Download,
  Shield,
  Package,
  Users,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const PackageDetail = ({ pkg, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('readme');

  if (!pkg) return null;

  const latestVersion = pkg.version;
  const versionData = pkg.versions?.[latestVersion] || {};
  const dependencies = versionData.dependencies || {};
  const devDependencies = versionData.devDependencies || {};

  const copyCommand = () => {
    navigator.clipboard.writeText(pkg.installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'readme', label: 'Documentation', icon: BookOpen },
    { id: 'dependencies', label: 'Dependencies', icon: Layers, count: Object.keys(dependencies).length + Object.keys(devDependencies).length },
    { id: 'versions', label: 'Versions', icon: Clock, count: Object.keys(pkg.time || {}).length - 2 },
  ];

  const stats = [
    { icon: Download, label: 'Downloads', value: pkg.downloads, color: 'blue' },
    { icon: Package, label: 'Versions', value: Object.keys(pkg.versions || {}).length, color: 'purple' },
    { icon: Shield, label: 'License', value: pkg.license || 'MIT', color: 'green' },
    { icon: Calendar, label: 'Updated', value: pkg.lastPublish ? new Date(pkg.lastPublish).toLocaleDateString() : 'Recent', color: 'orange' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/20 relative"
      >
        {/* Header Card */}
        <div className="relative bg-gradient-to-b from-gray-50/80 to-white/80 border-b border-gray-100 p-8 shrink-0 overflow-hidden">
          {/* Background Pattern & Effects */}
          <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 hover:bg-black/5 rounded-full transition-all duration-200 text-gray-400 hover:text-gray-900 backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          <div className="relative z-10 flex flex-col gap-8">
            {/* Top Section: Info & Stats Grid */}
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between pr-12">
              {/* Left: Icon + Info */}
              <div className="flex items-start gap-5 flex-1 min-w-0">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-40 translate-y-2" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white">
                    <Package size={32} className="text-white" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0 pt-1">
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-2 font-display truncate">{pkg.name}</h1>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 max-w-xl">{pkg.description}</p>
                  
                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
                    <div className="flex-1 flex items-center gap-3 bg-gray-900 rounded-xl px-4 py-3 shadow-xl shadow-gray-200/50 group cursor-pointer transition-transform active:scale-[0.99] hover:shadow-2xl hover:shadow-gray-900/20 w-full" onClick={copyCommand}>
                      <Terminal size={16} className="text-gray-400 shrink-0" />
                      <code className="font-mono text-xs text-gray-100 truncate flex-1">npm i {pkg.name}</code>
                      <div className="w-px h-3 bg-gray-700 mx-2 shrink-0"></div>
                      {copied ? <Check className="text-green-400 shrink-0" size={14} /> : <Copy className="text-gray-400 group-hover:text-white transition-colors shrink-0" size={14} />}
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      <a 
                        href={pkg.npmLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-11 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        title="View on NPM"
                      >
                        <Box size={20} />
                      </a>
                      <a 
                        href={pkg.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-11 flex items-center justify-center bg-[#24292e] text-white rounded-xl hover:bg-[#2f363d] transition-all shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-0.5"
                        title="View on GitHub"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* Right: 2x2 Stats Grid */}
              <div className="grid grid-cols-2 gap-3 shrink-0 w-full lg:w-auto">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col justify-center p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-200 min-w-[100px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`text-${stat.color}-600`}>
                        <stat.icon size={14} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900 pl-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        {/* Tabs */}
        {/* Tabs */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 px-8 sticky top-0 z-20">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 py-5 font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? 'stroke-[2.5px]' : ''} />
                <span className={activeTab === tab.id ? 'font-bold' : ''}>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-0.5 px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.3)]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'readme' && (
                <motion.div
                  key="readme"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 p-8 md:p-12 shadow-xl shadow-gray-200/40 ring-1 ring-white/60 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                  <div className="relative prose prose-base prose-slate max-w-none
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                    prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-sm
                    prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                    
                    /* Inline Code */
                    prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:text-xs prose-code:before:content-none prose-code:after:content-none
                    
                    /* Block Code (Pre) */
                    prose-pre:bg-[#0f172a] prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-xl prose-pre:border prose-pre:border-slate-800 prose-pre:p-5
                    [&_pre_code]:bg-transparent [&_pre_code]:text-gray-100 [&_pre_code]:p-0 [&_pre_code]:font-mono [&_pre_code]:text-xs [&_pre_code]:leading-relaxed
                    
                    prose-img:rounded-xl prose-img:shadow-md prose-img:border prose-img:border-gray-100
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-sm
                    prose-li:text-gray-600 prose-li:marker:text-blue-500 prose-li:text-sm
                  ">
                    {pkg.readme ? (
                      <ReactMarkdown>{pkg.readme}</ReactMarkdown>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <FileText size={32} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Documentation</h3>
                        <p className="text-gray-500">This package doesn't have a README yet.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'dependencies' && (
                <motion.div
                  key="dependencies"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Production Dependencies */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl ring-4 ring-blue-50/50">
                          <Package size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 font-display">Production Dependencies</h3>
                          <p className="text-gray-500 text-sm mt-0.5">{Object.keys(dependencies).length} packages required for runtime</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-white/50">
                      {Object.keys(dependencies).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(dependencies).map(([name, version]) => (
                            <a
                              key={name}
                              href={`https://www.npmjs.com/package/${name}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-50/50 hover:-translate-y-0.5 transition-all duration-300 group"
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-gray-900 text-sm mb-0.5 truncate group-hover:text-blue-600 transition-colors">{name}</div>
                                <div className="text-[10px] font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 inline-block group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                                  {version}
                                </div>
                              </div>
                              <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Package size={24} className="text-gray-300" />
                          </div>
                          <p className="text-gray-500 font-medium">No production dependencies</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Dev Dependencies */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl ring-4 ring-purple-50/50">
                          <Terminal size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 font-display">Development Dependencies</h3>
                          <p className="text-gray-500 text-sm mt-0.5">{Object.keys(devDependencies).length} packages for development</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 bg-white/50">
                      {Object.keys(devDependencies).length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {Object.entries(devDependencies).map(([name, version]) => (
                            <a
                              key={name}
                              href={`https://www.npmjs.com/package/${name}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md hover:shadow-purple-50/50 hover:-translate-y-0.5 transition-all duration-300 group"
                            >
                              <div className="min-w-0">
                                <div className="font-bold text-gray-900 text-sm mb-0.5 truncate group-hover:text-purple-600 transition-colors">{name}</div>
                                <div className="text-[10px] font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 inline-block group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-100 transition-colors">
                                  {version}
                                </div>
                              </div>
                              <ExternalLink size={14} className="text-gray-300 group-hover:text-purple-400 transition-colors opacity-0 group-hover:opacity-100" />
                            </a>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Terminal size={24} className="text-gray-300" />
                          </div>
                          <p className="text-gray-500 font-medium">No development dependencies</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'versions' && (
                <motion.div
                  key="versions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl ring-4 ring-blue-50/50">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 font-display">Version History</h3>
                        <p className="text-gray-500 text-sm mt-0.5">{Object.keys(pkg.time || {}).length - 2} releases total</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="relative border-l-2 border-gray-100 ml-4 space-y-8 py-2">
                      {Object.entries(pkg.time || {})
                        .filter(([key]) => key !== 'created' && key !== 'modified')
                        .sort((a, b) => new Date(b[1]) - new Date(a[1]))
                        .map(([version, date], idx) => (
                          <div key={version} className="relative pl-8 group">
                            {/* Timeline Dot */}
                            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                              idx === 0 
                                ? 'bg-blue-600 border-blue-200 ring-4 ring-blue-50' 
                                : 'bg-white border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50'
                            }`} />
                            
                            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300 ${
                              idx === 0
                                ? 'bg-blue-50/30 border-blue-100 shadow-sm'
                                : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5'
                            }`}>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <span className={`text-base font-bold font-mono tracking-tight ${
                                    idx === 0 ? 'text-blue-700' : 'text-gray-900'
                                  }`}>
                                    v{version}
                                  </span>
                                  {idx === 0 && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wide rounded-full">
                                      Latest
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Calendar size={12} />
                                  {new Date(date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </div>
                              </div>
                              <a
                                href={`https://www.npmjs.com/package/${pkg.name}/v/${version}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                  idx === 0
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                              >
                                View <ExternalLink size={14} />
                              </a>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PackageDetail;
