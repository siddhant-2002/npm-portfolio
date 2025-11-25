import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PackageCard from './components/PackageCard';
import PackageDetail from './components/PackageDetail';
import Footer from './components/Footer';
import { packageUrls } from './data/packages';
import { Search, Box, Mail, FileText, Loader2 } from 'lucide-react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      if (packageUrls.length === 0) {
        setPackages([]);
        setLoading(false);
        return;
      }

      try {
        const promises = packageUrls.map(async (url) => {
          const res = await fetch(url);
          const pkg = await res.json();
          
          // Fetch downloads from a separate endpoint
          let downloads = '0';
          try {
            const downloadRes = await fetch(`https://api.npmjs.org/downloads/point/last-month/${pkg.name}`);
            const downloadData = await downloadRes.json();
            downloads = downloadData.downloads 
              ? new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(downloadData.downloads) 
              : '0';
          } catch (e) {
            console.warn(`Could not fetch downloads for ${pkg.name}`);
          }

          return { pkg, downloads };
        });

        const results = await Promise.all(promises);
        
        const mappedData = results.map(({ pkg, downloads }, index) => {
          const latestVersion = pkg['dist-tags']?.latest;
          const versionData = pkg.versions?.[latestVersion] || {};
          
          return {
            id: pkg._id || `pkg-${index}`,
            name: pkg.name,
            version: latestVersion || '0.0.0',
            description: pkg.description || 'No description available.',
            downloads: downloads,
            stars: '0', 
            tags: pkg.keywords || [],
            npmLink: `https://www.npmjs.com/package/${pkg.name}`,
            githubLink: pkg.repository?.url?.replace('git+', '').replace('.git', '') || pkg.homepage || '#',
            installCmd: `npm install ${pkg.name}`,
            license: pkg.license,
            maintainers: pkg.maintainers,
            lastPublish: pkg.time?.[latestVersion],
            versions: pkg.versions,
            time: pkg.time,
            readme: pkg.readme
          };
        });

        setPackages(mappedData);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter(pkg => 
    pkg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* About Section */}
        <About />
        
        {/* Packages Section */}
        <section id="packages" className="min-h-screen w-full bg-white py-24 px-6 flex flex-col justify-center relative overflow-hidden">
          {/* Subtle Background Accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-50 pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-black">
                  Npm Packages
                </h2>
                <p className="text-lg text-gray-500 font-normal">
                  Explore the collection of <span className="text-blue-600 font-medium">high-quality tools</span>.
                </p>
              </div>
              
              <div className="w-full max-w-md">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search packages..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-full px-6 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all placeholder:text-gray-400 shadow-sm"
                  />
                  <Search size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-20">
                  <Loader2 size={40} className="animate-spin text-blue-500" />
                </div>
              ) : (
                filteredPackages.map((pkg, index) => (
                  <PackageCard 
                    key={pkg.id || index} 
                    pkg={pkg} 
                    index={index}
                    onClick={() => setSelectedPackage(pkg)}
                  />
                ))
              )}
            </div>

            {!loading && filteredPackages.length === 0 && (
              <div className="text-center py-24 border border-dashed border-gray-200 rounded-3xl bg-white/50">
                <Box size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xl text-gray-500">No packages found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-white relative">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-black text-white px-6 py-20 md:px-20 md:py-24 text-center shadow-2xl shadow-gray-200">
              {/* Abstract Background Effects */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl"></div>
                <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-emerald-500/10 to-teal-500/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
              </div>

              <div className="relative z-20">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  Let's build something <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    extraordinary.
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-10 font-light leading-relaxed max-w-2xl mx-auto">
                  Whether you have a groundbreaking idea or just want to say hi, my inbox is always open. Let's turn code into reality.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:siddeshmukh711@gmail.com"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                  >
                    <span className="relative z-10 flex items-center">
                      <Mail size={20} className="mr-2 group-hover:rotate-12 transition-transform" />
                      Email Me
                    </span>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/10 font-medium text-lg rounded-full hover:bg-white/20 transition-all"
                  >
                    <FileText size={20} className="mr-2 group-hover:-translate-y-1 transition-transform" />
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedPackage && (
          <PackageDetail 
            pkg={selectedPackage} 
            onClose={() => setSelectedPackage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
