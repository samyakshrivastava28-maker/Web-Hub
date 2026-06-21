import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  MessageCircle, 
  Bot, 
  ShieldCheck, 
  Smartphone, 
  Search, 
  Globe, 
  CheckCircle2, 
  Zap,
  Cpu,
  BarChart3,
  Layers,
  ArrowRight,
  Cloud,
  XCircle
} from 'lucide-react';
import Galaxy from '../components/Galaxy';
import SoftAurora from '../components/SoftAurora';
import AIAutomationMockup from '../components/AIAutomationMockup';
import LeadGenMockup from '../components/LeadGenMockup';
import BusinessSystemsMockup from '../components/BusinessSystemsMockup';
import '../components/PremiumButtons.css';

// ==========================================
// ANIMATION HELPERS
// ==========================================
const fadeUpOnLoad = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const }
});

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  viewport: { once: true, margin: "-50px" }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

// ==========================================
// PRICING DATA
// ==========================================
const PRICING_TIERS = [
  {
    name: "Immersive Landing",
    price: "₹2,500",
    description: "Perfect for establishing a high-end, cinematic single-page digital presence.",
    recommended: false,
    cta: "Start Building",
    features: [
      "Custom 3D Design",
      "Premium Motion System",
      "Interactive Animations",
      "Mobile Optimized",
      "SEO Ready",
      "FREE AI Assistant",
      "FREE Google reCAPTCHA"
    ]
  },
  {
    name: "Luxury Platform",
    price: "₹5,000",
    plus: true,
    description: "A comprehensive, motion-driven brand platform designed for maximum conversion.",
    recommended: true,
    cta: "Choose Recommended",
    features: [
      "Complex 3D Interactions",
      "Scroll-Triggered Parallax",
      "Advanced Motion Design",
      "Custom UI/UX Systems",
      "Cinematic Transitions",
      "FREE AI Assistant",
      "FREE WhatsApp Integration"
    ]
  },
  {
    name: "Enterprise Motion",
    price: "Custom",
    description: "Bespoke interactive architecture tailored to massive scale and breathtaking visuals.",
    recommended: false,
    cta: "Discuss Requirements",
    features: [
      "Unlimited 3D Environments",
      "WebGL & Canvas Rendering",
      "Complex Backend Integrations",
      "User Authentication",
      "Custom SaaS Interfaces",
      "Dedicated Project Manager",
      "Priority Support"
    ]
  }
];

// ==========================================
// COMPONENT
// ==========================================
export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#050505] text-white selection:bg-white/20 overflow-x-hidden pt-24 md:pt-32 relative font-sans">
      
      {/* 🌌 GALAXY BACKGROUND (Persists throughout the page) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.35]">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={0.5}
          glowIntensity={0.3}
          saturation={0.5}
          hueShift={220}
        />
      </div>

      <div className="relative z-10 w-full">
        
        {/* =========================================
            1. HERO SECTION (Cinematic & Glassmorphic)
            ========================================= */}
        <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 md:px-12 pt-12 pb-24 text-center relative">
          
          {/* Floating light orb (Optimized) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-lg h-[40vh] bg-blue-500/5 blur-[80px] pointer-events-none rounded-full" />
          
          <motion.div {...fadeUpOnLoad(0)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-white/80">Premium Digital Agency Partner</span>
          </motion.div>
          
          <motion.h1 
            {...fadeUpOnLoad(0.1)} 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[85px] font-semibold tracking-tight leading-[1.05] mb-8 max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
          >
            Custom 3D Digital <br className="hidden md:block" />
            Experiences.
          </motion.h1>
          
          <motion.p 
            {...fadeUpOnLoad(0.2)} 
            className="text-lg md:text-2xl text-white/50 max-w-3xl leading-relaxed font-light mb-12"
          >
            We engineer high-end interactive brand platforms featuring advanced scroll animations, cinematic visual effects, and custom AI systems designed to scale your business.
          </motion.p>
          
          <motion.div {...fadeUpOnLoad(0.3)} className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 w-full sm:w-auto relative z-20 mt-4">
            <Link 
              to="/contact" 
              className="btn-consultation text-sm md:text-base w-full sm:w-auto font-semibold"
            >
              Book Free Consultation <ArrowUpRight size={18} />
            </Link>
            <Link 
              to="/contact" 
              className="btn-demo text-sm md:text-base w-full sm:w-auto font-semibold"
            >
              Book Free Demo <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Floating Trust Indicators */}
          <motion.div {...fadeUpOnLoad(0.5)} className="mt-20 flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-50">
            <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 size={16}/> 99.9% Uptime Ready</div>
            <div className="flex items-center gap-2 text-sm font-medium"><Cpu size={16}/> AI Integrated</div>
            <div className="flex items-center gap-2 text-sm font-medium"><Zap size={16}/> Next-Gen Performance</div>
          </motion.div>
        </section>

        {/* =========================================
            2. INCLUDED FREE (Premium Bento Grid)
            ========================================= */}
        <section className="py-24 md:py-32 px-5 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0)} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">The Premium Standard.</h2>
              <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto">Enterprise-grade features included as the baseline for every project.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1: AI Assistant (Wide) */}
              <motion.div variants={staggerItem} className="md:col-span-2 group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-blue-400">
                    <Bot size={24} />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-white/80">Included Free</span>
                    <h3 className="text-2xl font-semibold mb-3">AI Website Assistant</h3>
                    <p className="text-white/50 leading-relaxed">A custom-trained, intelligent chatbot integrated directly into your site to answer client queries, capture leads, and provide 24/7 support.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Security (Square) */}
              <motion.div variants={staggerItem} className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] translate-y-1/2 translate-x-1/4 group-hover:bg-emerald-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-emerald-400">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Google reCAPTCHA</h3>
                    <p className="text-white/50 text-sm leading-relaxed">Invisible, enterprise-grade spam protection seamlessly implemented into all your forms.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Mobile (Square) */}
              <motion.div variants={staggerItem} className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute top-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] -translate-y-1/4 -translate-x-1/4 group-hover:bg-purple-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-purple-400">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Mobile Optimization</h3>
                    <p className="text-white/50 text-sm leading-relaxed">Flawless responsive design ensuring perfect viewing experiences on every device.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Deployment (Wide) */}
              <motion.div variants={staggerItem} className="md:col-span-2 group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-cyan-400 flex-shrink-0">
                    <Cloud size={32} />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 text-white/80">Included Free</span>
                    <h3 className="text-2xl font-semibold mb-2">Global Deployment</h3>
                    <p className="text-white/50 leading-relaxed">We handle full deployment and launch on premium edge networks like Vercel, Netlify, or Render at zero additional cost.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Domain & SSL Setup (Square) */}
              <motion.div variants={staggerItem} className="group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-[60px] translate-y-1/4 -translate-x-1/4 group-hover:bg-yellow-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-yellow-400">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Domain & SSL</h3>
                    <p className="text-white/50 text-sm leading-relaxed">You buy the domain, we handle the rest. Full DNS configuration and SSL security setup included.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 6: WhatsApp (Wide) */}
              <motion.div variants={staggerItem} className="md:col-span-2 group relative p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 overflow-hidden hover:bg-[#0f0f0f] transition-colors">
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 group-hover:bg-green-500/20 transition-colors" />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-green-400 flex-shrink-0">
                    <MessageCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">WhatsApp Integration</h3>
                    <p className="text-white/50 leading-relaxed">Direct communication pipelines linking your website visitors instantly to your team, dramatically improving conversion rates.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* What is NOT Included */}
            <motion.div {...fadeUp(0.3)} className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-white/40 bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex-wrap">
              <span className="font-semibold text-white/60 uppercase tracking-widest text-xs w-full text-center md:w-auto md:mr-4">Not Included:</span>
              <span className="flex items-center gap-2"><XCircle size={14}/> Domain Purchase Cost</span>
              <span className="flex items-center gap-2"><XCircle size={14}/> Paid APIs</span>
              <span className="flex items-center gap-2"><XCircle size={14}/> Premium Third-Party Services</span>
              <span className="flex items-center gap-2"><XCircle size={14}/> Monthly Subscriptions</span>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            3. WEBSITE PRICING (Premium Cards)
            ========================================= */}
        <section className="py-24 md:py-32 px-5 md:px-12 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0)} className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Interactive Web Experiences</h2>
              <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto">Luxury 3D web platforms driven by custom motion design, scroll-triggered animations, and cinematic parallax. We don't build standard websites; we engineer digital showpieces.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {PRICING_TIERS.map((tier, i) => (
                <motion.div 
                  key={i} 
                  {...fadeUp(0.1 * (i + 1))}
                  className={`group relative p-8 md:p-10 rounded-3xl flex flex-col transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                    tier.recommended 
                      ? 'bg-[#0a0a0a] border border-white/20' 
                      : 'bg-white/[0.02] border border-white/10'
                  }`}
                >
                  {/* Background glows */}
                  {tier.recommended && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    {tier.recommended && (
                      <div className="inline-flex mb-8 self-start">
                        <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                          Recommended
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-2xl font-semibold tracking-tight mb-4">{tier.name}</h3>
                    
                    <div className="flex items-baseline gap-1 mb-6">
                      {tier.price !== "Custom" && <span className="text-white/50 text-lg">₹</span>}
                      <span className="text-4xl md:text-5xl font-semibold tracking-tight">{tier.price}</span>
                      {tier.plus && <span className="text-white/40 text-3xl font-light">+</span>}
                    </div>
                    
                    <p className="text-white/50 text-sm leading-relaxed mb-8 min-h-[3rem]">
                      {tier.description}
                    </p>

                    <div className="w-full h-px bg-white/10 mb-8" />

                    <ul className="space-y-4 mb-12 flex-1">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className={`mt-0.5 flex-shrink-0 ${feature.includes("FREE") ? "text-white" : "text-white/30"}`} />
                          <span className={`text-sm leading-tight ${feature.includes("FREE") ? "font-medium text-white/90" : "text-white/60"}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link 
                      to="/contact" 
                      className={`w-full py-4 rounded-xl font-semibold text-center transition-all flex items-center justify-center gap-2 text-sm ${
                        tier.recommended
                          ? 'bg-white text-black hover:scale-105 active:scale-95 shadow-lg'
                          : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {tier.cta} <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            4. CUSTOM SERVICES (SaaS Visual Showcase)
            ========================================= */}
        <section className="py-24 md:py-32 px-5 md:px-12 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto space-y-32">
            
            <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Advanced Systems</h2>
              <p className="text-lg md:text-xl text-white/50">Complex operational software, automated workflows, and high-volume acquisition funnels. Priced custom based on your exact requirements.</p>
            </motion.div>

            {/* AI Automation Layout */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div {...fadeUp(0.1)} className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/70">
                  <Bot size={14} /> Custom Scope
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">AI Automation</h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  Intelligent workflows that replace manual labor. We build systems that route emails, qualify leads, and handle customer support 24/7 without human intervention.
                </p>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Email & CRM Automation</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> AI Chatbots & Support</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Automated Appointment Booking</li>
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors mt-4">
                  Request Automation Audit <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="lg:w-1/2 w-full">
                <div className="relative rounded-3xl border border-white/5 bg-[#0a0a0a] p-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 pointer-events-none" />
                  <AIAutomationMockup />
                </div>
              </motion.div>
            </div>

            {/* Lead Generation Layout */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
              <motion.div {...fadeUp(0.1)} className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/70">
                  <BarChart3 size={14} /> Custom Scope
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">Lead Generation</h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  Data-driven funnels designed specifically to capture, track, and convert high-quality prospects into paying clients automatically.
                </p>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> High-Converting Landing Pages</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Conversion Analytics</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Automated Follow-up Sequences</li>
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors mt-4">
                  Discuss Acquisition Strategy <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="lg:w-1/2 w-full">
                <div className="relative rounded-3xl border border-white/5 bg-[#0a0a0a] p-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/10 to-teal-500/10 pointer-events-none" />
                  <LeadGenMockup />
                </div>
              </motion.div>
            </div>

            {/* Business Systems Layout */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div {...fadeUp(0.1)} className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-widest text-white/70">
                  <Layers size={14} /> Custom Scope
                </div>
                <h3 className="text-4xl md:text-5xl font-semibold tracking-tight">Business Systems</h3>
                <p className="text-xl text-white/50 leading-relaxed font-light">
                  Bespoke internal software tailored to your operations. Manage clients, tasks, and team productivity from a centralized, highly secure platform.
                </p>
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Custom CRM Dashboards</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Client Portals</li>
                  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-white rounded-full" /> Internal Operations Software</li>
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-2 text-white font-medium hover:text-white/70 transition-colors mt-4">
                  Request System Architecture <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div {...fadeUp(0.2)} className="lg:w-1/2 w-full">
                <div className="relative rounded-3xl border border-white/5 bg-[#0a0a0a] p-4 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-red-500/10 pointer-events-none" />
                  <BusinessSystemsMockup />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* =========================================
            5. FINAL CTA (SoftAurora & Glass)
            ========================================= */}
        <section className="relative py-32 md:py-48 px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Soft Aurora Light Background */}
          <div className="absolute inset-0 z-0 opacity-50">
            <SoftAurora />
          </div>
          
          <div className="relative z-10 w-full max-w-5xl mx-auto bg-[#050505] border border-white/10 p-12 md:p-24 rounded-[3rem]">
            <motion.h2 
              {...fadeUp(0)} 
              className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 leading-[1.1]"
            >
              Ready To Build Something Amazing?
            </motion.h2>
            
            <motion.p {...fadeUp(0.1)} className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light">
              Partner with S-Web Hub to engineer digital solutions that elevate your brand and accelerate your growth.
            </motion.p>
            
            <motion.div {...fadeUp(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 w-full sm:w-auto mt-8">
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
                Book Free Demo <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </div>
  );
}
