import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowRight, 
  ExternalLink, 
  ShoppingCart, 
  Smartphone, 
  Zap, 
  Layout, 
  Workflow, 
  MessageSquare, 
  Cpu, 
  Layers, 
  Box,
  MonitorPlay,
  Gauge
} from 'lucide-react';
import Galaxy from '../components/Galaxy';
import SoftAurora from '../components/SoftAurora';
import BrowserFrame from '../components/BrowserFrame';
import '../components/PremiumButtons.css';

// ==========================================
// ANIMATION HELPERS
// ==========================================
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const }
});

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { staggerChildren: 0.1 }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

// ==========================================
// COMPONENT
// ==========================================
export default function Portfolio() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-transparent text-white selection:bg-white/20 overflow-x-hidden pt-24 md:pt-32 relative font-sans min-h-screen">
      
      {/* 🌌 BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.25]">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.5}
          glowIntensity={0.3}
          saturation={0.5}
          hueShift={240}
        />
      </div>

      <div className="relative z-10 w-full">
        
        {/* =========================================
            1. HERO SECTION
            ========================================= */}
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
          {/* Ambient glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-xl h-[40vh] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />
          
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/80">Premium Quality Assured</span>
          </motion.div>

          <motion.h1 
            {...fadeUp(0.1)}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-semibold tracking-tighter text-center max-w-6xl leading-[0.95]"
          >
            We build premium <br className="hidden md:block"/> digital experiences.
          </motion.h1>

          <motion.p 
            {...fadeUp(0.2)}
            className="mt-8 text-xl md:text-3xl text-white/40 max-w-3xl text-center font-light tracking-tight leading-[1.4]"
          >
            Not just websites. We engineer high-performance platforms, AI systems, and interactive brand showrooms designed for growth.
          </motion.p>
        </section>

        {/* =========================================
            2. PROJECT 1: PRIME ELITE STORE
            ========================================= */}
        <section className="py-24 md:py-40 px-5 md:px-12 relative z-10 border-t border-white/5 bg-transparent">
          <div className="max-w-7xl mx-auto">
            
            {/* Project Header */}
            <div className="text-center mb-16 md:mb-24">
              <motion.div {...fadeUp(0)} className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-widest uppercase mb-6">
                Premium E-Commerce Case Study
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">
                Prime Elite Store
              </motion.h2>
              <motion.p {...fadeUp(0.2)} className="text-xl md:text-2xl text-white/40 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                A masterclass in modern e-commerce. Built with premium UI, frictionless shopping flows, and an architecture engineered for extreme performance and mobile dominance.
              </motion.p>
              <motion.div {...fadeUp(0.3)}>
                <a 
                  href="https://primeelitestore02.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  Explore Live Experience <ExternalLink size={16} />
                </a>
              </motion.div>
            </div>

            {/* Massive Interactive Mockup */}
            <motion.div {...fadeUp(0.4)} className="w-full relative rounded-[2rem] md:rounded-[3rem] p-3 md:p-6 lg:p-8 bg-white/[0.02] border border-white/5 shadow-2xl mb-16 md:mb-24 overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-[50vh] bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none blur-3xl" />
              <div className="relative z-10">
                <BrowserFrame url="https://primeelitestore02.netlify.app" title="Prime Elite Store">
                  <div className="relative w-full h-full group">
                    <iframe 
                      src="https://primeelitestore02.netlify.app" 
                      loading="lazy"
                      className="w-full h-full border-none pointer-events-auto lg:pointer-events-none group-hover:pointer-events-auto transition-all"
                      title="Prime Elite Store"
                    />
                    <div className="absolute inset-0 bg-transparent hidden lg:block group-hover:pointer-events-none transition-all" />
                  </div>
                </BrowserFrame>
              </div>
            </motion.div>

            {/* Project Features Bento */}
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <motion.div variants={staggerItem} className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] group-hover:bg-purple-500/20 transition-colors" />
                <ShoppingCart className="w-8 h-8 text-purple-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">Modern Browsing</h3>
                <p className="text-white/40 text-sm leading-relaxed">Frictionless product discovery with premium filtering, search, and intuitive shopping cart flows designed to maximize conversions.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/20 transition-colors" />
                <Layout className="w-8 h-8 text-blue-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">Premium UI System</h3>
                <p className="text-white/40 text-sm leading-relaxed">Bespoke interface design avoiding generic templates. Includes luxury spacing, glassmorphism, and a cohesive brand aesthetic.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 group hover:bg-[#0f0f0f] transition-colors relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] group-hover:bg-emerald-500/20 transition-colors" />
                <Smartphone className="w-8 h-8 text-emerald-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">Mobile Dominance</h3>
                <p className="text-white/40 text-sm leading-relaxed">Engineered mobile-first. Smooth touch interactions, optimized layouts, and lightning-fast load times on cellular networks.</p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* =========================================
            3. PROJECT 2: S-CALLHUB
            ========================================= */}
        <section className="py-24 md:py-40 px-5 md:px-12 relative z-10 border-t border-white/5 bg-transparent">
          <div className="max-w-7xl mx-auto">
            
            {/* Project Header */}
            <div className="text-center mb-16 md:mb-24">
              <motion.div {...fadeUp(0)} className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-6">
                AI Platform Case Study
              </motion.div>
              <motion.h2 {...fadeUp(0.1)} className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">
                S-CallHub
              </motion.h2>
              <motion.p {...fadeUp(0.2)} className="text-xl md:text-2xl text-white/40 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                An advanced AI automation platform showcasing intelligent workflows, lead management, and a powerful, data-rich SaaS dashboard interface.
              </motion.p>
              <motion.div {...fadeUp(0.3)}>
                <a 
                  href="https://s-callhub.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-transform"
                >
                  Explore Live Experience <ExternalLink size={16} />
                </a>
              </motion.div>
            </div>

            {/* Massive Interactive Mockup */}
            <motion.div {...fadeUp(0.4)} className="w-full relative rounded-[2rem] md:rounded-[3rem] p-3 md:p-6 lg:p-8 bg-white/[0.02] border border-white/5 shadow-2xl mb-16 md:mb-24 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none blur-3xl" />
              <div className="relative z-10">
                <BrowserFrame url="https://s-callhub.netlify.app" title="S-CallHub">
                  <div className="relative w-full h-full group">
                    <iframe 
                      src="https://s-callhub.netlify.app" 
                      loading="lazy"
                      className="w-full h-full border-none pointer-events-auto lg:pointer-events-none group-hover:pointer-events-auto transition-all bg-black"
                      title="S-CallHub"
                    />
                    <div className="absolute inset-0 bg-transparent hidden lg:block group-hover:pointer-events-none transition-all" />
                  </div>
                </BrowserFrame>
              </div>
            </motion.div>

            {/* Project Features Bento */}
            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <motion.div variants={staggerItem} className="p-8 rounded-3xl bg-[#111] border border-white/5 group hover:bg-[#151515] transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] group-hover:bg-cyan-500/20 transition-colors" />
                <Workflow className="w-8 h-8 text-cyan-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">AI Workflows</h3>
                <p className="text-white/40 text-sm leading-relaxed">Automated business logic that connects user inputs to intelligent AI processing, drastically reducing manual administrative tasks.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-8 rounded-3xl bg-[#111] border border-white/5 group hover:bg-[#151515] transition-colors relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[40px] group-hover:bg-rose-500/20 transition-colors" />
                <Layers className="w-8 h-8 text-rose-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">SaaS Interface</h3>
                <p className="text-white/40 text-sm leading-relaxed">A powerful, interactive dashboard design utilizing complex data visualization, intuitive navigation, and real-time state management.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-8 rounded-3xl bg-[#111] border border-white/5 group hover:bg-[#151515] transition-colors relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[40px] group-hover:bg-green-500/20 transition-colors" />
                <MessageSquare className="w-8 h-8 text-green-400 mb-6" />
                <h3 className="text-xl font-semibold mb-3">Business Communication</h3>
                <p className="text-white/40 text-sm leading-relaxed">Integrated communication systems built directly into the platform, centralizing lead management and client interactions.</p>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* =========================================
            4. WHY OUR WORK STANDS OUT
            ========================================= */}
        <section className="py-32 md:py-48 px-5 md:px-12 border-t border-white/5 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp(0)} className="mb-20 md:mb-32 max-w-4xl">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter mb-8 leading-[1]">
                Why Our Work <br/> Outperforms.
              </h2>
              <p className="text-xl md:text-3xl text-white/40 font-light leading-[1.4] tracking-tight">
                We don't build generic brochure sites. We engineer premium digital products designed to scale operations and convert high-ticket clients.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <motion.div variants={staggerItem} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5">
                <Box className="w-10 h-10 text-white/80 mb-8" />
                <h3 className="text-2xl font-semibold tracking-tight mb-4">Premium 3D Design</h3>
                <p className="text-white/40 leading-relaxed">Interactive environments and WebGL elements that immediately establish brand authority and absolute luxury.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5">
                <MonitorPlay className="w-10 h-10 text-white/80 mb-8" />
                <h3 className="text-2xl font-semibold tracking-tight mb-4">Custom Motion Systems</h3>
                <p className="text-white/40 leading-relaxed">Cinematic scroll animations, physics-based interactions, and page transitions that guide users seamlessly.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5">
                <Layout className="w-10 h-10 text-white/80 mb-8" />
                <h3 className="text-2xl font-semibold tracking-tight mb-4">Interactive Interfaces</h3>
                <p className="text-white/40 leading-relaxed">Bespoke UI/UX systems that break away from boring templates and create memorable, frictionless brand touchpoints.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5">
                <Cpu className="w-10 h-10 text-white/80 mb-8" />
                <h3 className="text-2xl font-semibold tracking-tight mb-4">AI Integration</h3>
                <p className="text-white/40 leading-relaxed">Intelligent automation layers, chatbots, and processing logic embedded directly into your platform to scale operations.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5">
                <Gauge className="w-10 h-10 text-white/80 mb-8" />
                <h3 className="text-2xl font-semibold tracking-tight mb-4">Performance Optimization</h3>
                <p className="text-white/40 leading-relaxed">Lightning-fast load times, optimized assets, and edge-network deployments ensuring zero drop-off from lag.</p>
              </motion.div>

              <motion.div variants={staggerItem} className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10" />
                <div className="relative z-10">
                  <Layers className="w-10 h-10 text-white mb-8" />
                  <h3 className="text-2xl font-semibold tracking-tight mb-4 text-white">Modern SaaS Interfaces</h3>
                  <p className="text-white/60 leading-relaxed">Engineering standards derived from top-tier Silicon Valley startups, delivering enterprise-grade quality.</p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* =========================================
            5. FINAL CTA
            ========================================= */}
        <section className="relative py-48 px-5 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-transparent text-white">
          <div className="absolute inset-0 z-0 opacity-50">
            <SoftAurora />
          </div>
          
          <div className="relative z-10 w-full max-w-5xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-10 md:p-24 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
            <motion.h2 
              {...fadeUp(0)} 
              className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 leading-[1.1]"
            >
              Ready To Build Your Next <br className="hidden md:block"/> Digital Experience?
            </motion.h2>
            
            <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full sm:w-auto mt-12 md:mt-16">
              <Link 
                to="/contact" 
                className="btn-consultation text-lg w-full sm:w-auto font-semibold"
              >
                Book Free Consultation <ArrowUpRight size={20} />
              </Link>
              <Link 
                to="/contact" 
                className="btn-demo text-lg w-full sm:w-auto font-semibold"
              >
                Contact On WhatsApp <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
