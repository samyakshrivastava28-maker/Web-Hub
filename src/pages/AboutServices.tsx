import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageCircle, Code, Workflow, Target, Layers, ChevronDown } from 'lucide-react';
import Aurora from '../components/Aurora';
import MindloopMockup from '../components/MindloopMockup';
import AIAutomationMockup from '../components/AIAutomationMockup';
import LeadGenMockup from '../components/LeadGenMockup';
import BusinessSystemsMockup from '../components/BusinessSystemsMockup';
import MobileDeviceFrame from '../components/MobileDeviceFrame';

const WHATSAPP_LINK = "https://wa.me/918305500767";

interface ServiceData {
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  features: string[]; // For Desktop
  whatWeBuild: string[]; // For Mobile
  benefits: string[]; // For Mobile
  icon: React.ElementType;
  Component: React.ComponentType;
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: "web-dev",
    title: "Website Development",
    subtitle: "Premium websites designed to build trust.",
    overview: "We engineer cinematic, highly-performant websites that act as your hardest working digital asset. By combining cutting-edge WebGL interactions, buttery-smooth animations, and conversion-focused design, we ensure your brand stands out in a crowded market.",
    features: ['Business Websites', 'Landing Pages', 'Portfolio Websites', 'E-commerce Stores', 'Custom Web Applications'],
    whatWeBuild: ['Business websites', 'Landing pages', 'Agency websites', 'SaaS websites', 'Portfolio websites', 'E-commerce websites'],
    benefits: ['Faster loading', 'Better conversions', 'Mobile-first design', 'SEO-ready structure'],
    icon: Code,
    Component: MindloopMockup,
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    subtitle: "Automate repetitive tasks & save hours.",
    overview: "Stop wasting time on manual data entry and repetitive workflows. We build custom AI agents and automated systems that work around the clock. From intelligent customer support to complex backend data processing, our automations scale your output without scaling your headcount.",
    features: ['Lead Automation', 'Email Automation', 'CRM Workflows', 'AI Assistants', 'Business Process Automation'],
    whatWeBuild: ['Lead qualification', 'Email automation', 'WhatsApp automation', 'CRM workflows', 'Follow-up systems'],
    benefits: ['Save time', 'Reduce manual work', 'Increase response speed', 'Improve customer experience'],
    icon: Workflow,
    Component: AIAutomationMockup,
  },
  {
    id: "lead-gen",
    title: "Lead Generation Systems",
    subtitle: "Generate and manage qualified leads.",
    overview: "A beautiful website is useless if it doesn't generate revenue. We construct high-converting digital funnels that capture attention, nurture prospects, and deliver warm, qualified leads directly to your sales team seamlessly.",
    features: ['Lead Capture Funnels', 'Follow-up Systems', 'Conversion Optimization', 'Automated Outreach', 'Customer Journey Tracking'],
    whatWeBuild: ['Lead funnels', 'Appointment systems', 'Outreach workflows', 'CRM pipelines'],
    benefits: ['More qualified leads', 'Better conversion rates', 'Automated lead nurturing', 'Better sales visibility'],
    icon: Target,
    Component: LeadGenMockup,
  },
  {
    id: "business-systems",
    title: "Business Systems",
    subtitle: "Internal tools that simplify operations.",
    overview: "Off-the-shelf software rarely fits your exact workflow perfectly. We develop bespoke internal tools, dashboards, and management systems that connect your fragmented data, streamline your operations, and give you complete control over your business.",
    features: ['Dashboards', 'CRM Systems', 'Internal Tools', 'Data Management', 'Custom Business Software'],
    whatWeBuild: ['Client portals', 'Internal dashboards', 'Project management systems', 'Team collaboration systems'],
    benefits: ['Better organization', 'Improved productivity', 'Faster operations', 'Centralized workflows'],
    icon: Layers,
    Component: BusinessSystemsMockup,
  }
];

function ScaledDesktopFrame({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setScale(width / 800);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative bg-[#050505] shadow-lg">
      <div 
        className="absolute top-0 left-0 w-[800px] h-[600px] origin-top-left pointer-events-auto"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

export default function AboutServices() {
  const { scrollYProgress } = useScroll();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-white/20 selection:text-white pb-16 md:pb-24 overflow-hidden relative">
      <div className="fixed inset-0 z-0 opacity-100 pointer-events-none w-full h-screen block">
        <Aurora colorStops={["#7cff67","#B497CF","#5227FF"]} blend={1.0} amplitude={1.5} speed={0.5} />
      </div>
      
      <div className="relative z-10">
      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex flex-col items-center justify-center pt-24 md:pt-32 px-5 md:px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-[#050505] to-[#050505] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-6 md:mb-8 block">
            ABOUT SERVICES
          </span>
          <h1 className="text-[32px] sm:text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[1.1] md:leading-[1.05] mb-6 md:mb-8">
            Digital Solutions <br className="hidden md:block" /> Built For Growth.
          </h1>
          <p className="text-base md:text-xl text-white/50 max-w-2xl leading-relaxed mb-8 md:mb-12 font-light px-2">
            From premium websites to intelligent automation systems, S-Web Hub helps businesses attract customers, save time, improve efficiency, and scale with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="group relative flex items-center justify-center gap-2 bg-white text-black px-7 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm w-full sm:w-auto active:scale-[0.97] transition-transform"
            >
              Start Your Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 bg-white/[0.05] border border-white/10 text-white px-7 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm w-full sm:w-auto active:scale-[0.97] transition-transform"
            >
              Chat On WhatsApp
              <MessageCircle size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section className="py-16 md:py-32 px-5 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24 md:w-2/3"
        >
          <h2 className="text-[28px] md:text-6xl font-medium tracking-tighter mb-4 md:mb-6">What We Build.</h2>
          <p className="text-base md:text-xl text-white/50 font-light leading-relaxed">
            Every business has different challenges. S-Web Hub creates custom digital solutions designed around your goals, workflows, and growth strategy.
          </p>
        </motion.div>

        {/* Desktop Layout (hidden on mobile) */}
        <div className="hidden md:block space-y-32">
          {SERVICES_DATA.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-24 group"
            >
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center mb-5 md:mb-8 text-white/50">
                  <service.icon size={18} />
                </div>
                <h3 className="text-2xl md:text-4xl font-medium mb-3 md:mb-4">{service.title}</h3>
                <p className="text-base md:text-lg text-white/50 mb-6 md:mb-8 leading-relaxed">
                  {service.subtitle}
                </p>
                <ul className="space-y-2.5 md:space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`w-full md:w-1/2 aspect-[4/3] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-lg md:shadow-2xl ${index % 2 === 0 ? 'order-2 md:order-2' : 'order-1 md:order-1'}`}>
                 <service.Component />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout: Expandable Accordion */}
        <div className="md:hidden space-y-4">
          {SERVICES_DATA.map((service) => {
            const isExpanded = expandedId === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`w-full bg-[#0A0A0B] border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-colors ${isExpanded ? 'bg-[#0f0f10] border-white/20' : ''}`}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  className="w-full p-5 text-left flex items-center justify-between active:scale-[0.98] transition-transform"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${isExpanded ? 'bg-white/10 border-white/30 text-white' : 'bg-white/5 border-white/10 text-white/80'}`}>
                      <service.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">{service.title}</h3>
                      <p className="text-[13px] text-white/50 mt-1 line-clamp-1">{service.subtitle}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-white/30"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 pb-6">
                        <div className="w-full h-px bg-white/5 mb-6" />
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">What We Build</h4>
                            <ul className="space-y-2">
                              {service.whatWeBuild.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-white/60 text-[15px]">
                                  <span className="text-white/30 mt-1">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">Benefits</h4>
                            <ul className="space-y-2">
                              {service.benefits.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-white/60 text-[15px]">
                                  <span className="text-white/30 mt-1">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="pt-2">
                            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Example</h4>
                            {service.id === 'web-dev' ? (
                              <div className="w-full max-w-[300px] mx-auto pointer-events-auto">
                                <MobileDeviceFrame>
                                  <service.Component />
                                </MobileDeviceFrame>
                              </div>
                            ) : (
                              <ScaledDesktopFrame>
                                <service.Component />
                              </ScaledDesktopFrame>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── BUSINESS TRANSFORMATION ── */}
      <section className="py-16 md:py-32 px-5 md:px-6 relative border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-24">
            <h2 className="text-[28px] md:text-6xl font-medium tracking-tighter">How We Help Businesses Grow.</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-5/12 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-white/5 bg-white/[0.01]"
            >
              <h3 className="text-white/40 text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase mb-5 md:mb-8">Current Situation</h3>
              <ul className="space-y-4 md:space-y-6">
                {['Manual Processes', 'Missed Opportunities', 'Poor Online Presence', 'Time-Consuming Tasks', 'Growth Bottlenecks'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 md:gap-4 text-white/60 text-sm md:text-base">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/10 flex items-center justify-center text-white/30 text-[10px] md:text-xs flex-shrink-0">✕</div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-full bg-white text-black flex items-center justify-center rotate-90 lg:rotate-0"
            >
              <ArrowRight size={20} />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-5/12 p-6 md:p-12 rounded-2xl md:rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.05] to-transparent shadow-[0_0_40px_rgba(255,255,255,0.03)]"
            >
              <h3 className="text-white text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase mb-5 md:mb-8">With S-Web Hub</h3>
              <ul className="space-y-4 md:space-y-6">
                {['Modern Website', 'Automated Workflows', 'Better Customer Experience', 'More Efficient Operations', 'Scalable Growth Systems'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 md:gap-4 text-white font-medium text-sm md:text-base">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] md:text-xs flex-shrink-0">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE S-WEB HUB ── */}
      <section className="py-16 md:py-32 px-5 md:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-24"
        >
          <h2 className="text-[28px] md:text-6xl font-medium tracking-tighter mb-4 md:mb-6 text-center md:text-left">Why Businesses Choose S-Web Hub.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
          <div className="bg-[#0a0a0a] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-medium text-white/50 mb-8 md:mb-12">Traditional Agencies</h3>
            <ul className="space-y-5 md:space-y-8">
              {['Generic Templates', 'Slow Delivery', 'Limited Flexibility', 'Outdated Approaches', 'One-Size-Fits-All Solutions'].map((item, i) => (
                <li key={i} className="text-white/40 font-light text-base md:text-lg tracking-wide">{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-[#111] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-lg md:text-xl font-medium text-white mb-8 md:mb-12 relative z-10">S-Web Hub</h3>
            <ul className="space-y-5 md:space-y-8 relative z-10">
              {['Custom-Built Solutions', 'Direct Communication', 'Modern Technology Stack', 'AI-Powered Systems', 'Growth-Focused Approach'].map((item, i) => (
                <li key={i} className="text-white font-medium text-base md:text-lg tracking-wide flex items-center gap-3 md:gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── OUR PROCESS ── */}
      <section className="py-16 md:py-32 px-5 md:px-6 max-w-5xl mx-auto border-t border-white/10">
        <div className="text-center mb-12 md:mb-24">
          <h2 className="text-[28px] md:text-6xl font-medium tracking-tighter mb-4 md:mb-6">How We Work.</h2>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Every project follows a structured process designed to deliver clarity, quality, and measurable results.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent md:-translate-x-1/2" />

          <div className="space-y-10 md:space-y-24">
            {[
              { num: "1", title: "Discovery", desc: "Understanding your business, goals, and challenges." },
              { num: "2", title: "Strategy", desc: "Creating a roadmap tailored to your objectives." },
              { num: "3", title: "Design", desc: "Designing experiences focused on usability and conversions." },
              { num: "4", title: "Development", desc: "Building fast, scalable, and reliable solutions." },
              { num: "5", title: "Launch", desc: "Testing, optimizing, and deploying with confidence." },
              { num: "6", title: "Growth", desc: "Providing ongoing support and future improvements." }
            ].map((step, i) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="flex items-start gap-5 md:gap-16 md:items-center"
              >
                {/* Mobile: always left-aligned. Desktop: alternating */}
                <div className="hidden md:block md:w-1/2" />
                <div className={`w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-[#050505] border border-white/20 flex items-center justify-center font-medium text-sm md:text-lg relative z-10 ${i % 2 === 0 ? 'md:mx-auto' : 'md:mx-auto'}`}>
                  {step.num}
                </div>
                <div className="flex-1 md:w-1/2">
                  <h3 className="text-xl md:text-2xl font-medium mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm md:text-lg leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section className="py-16 md:py-32 px-5 md:px-6 max-w-4xl mx-auto border-t border-white/10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-6 md:mb-8 block">About Us</span>
          <h2 className="text-[26px] md:text-5xl font-medium tracking-tighter leading-[1.2] mb-8 md:mb-12">
            More Than Just A Web Agency.
          </h2>
          
          <div className="space-y-6 md:space-y-8 text-base md:text-2xl text-white/70 font-light leading-relaxed">
            <p>
              S-Web Hub focuses on building modern digital experiences that help businesses establish credibility, improve efficiency, and grow online.
            </p>
            <p>
              Every project is approached with a strong focus on design, performance, scalability, and long-term success. Rather than offering generic solutions, S-Web Hub creates custom systems tailored to the unique goals of each business.
            </p>
            <p className="text-white font-medium border-l-2 border-white pl-5 md:pl-6 mt-8 md:mt-12 py-2 text-base md:text-2xl">
              The mission is simple: Build digital experiences that deliver real value and measurable results.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-40 px-5 md:px-6 text-center border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-[30px] md:text-7xl font-medium tracking-tighter mb-6 md:mb-8 leading-[1.1]">Ready To Build <br/> Something Better?</h2>
          <p className="text-base md:text-xl text-white/50 font-light leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
            Whether you need a website, automation system, lead generation solution, or custom business platform, S-Web Hub is ready to help.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a 
              href="#contact" 
              className="group relative flex items-center justify-center gap-2 bg-white text-black px-7 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm w-full sm:w-auto active:scale-[0.97] transition-transform"
            >
              Start Your Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 bg-white/[0.05] border border-white/10 text-white px-7 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm w-full sm:w-auto active:scale-[0.97] transition-transform"
            >
              Chat On WhatsApp
              <MessageCircle size={16} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Mobile Modal Removed in favor of Accordion */}

      </div>
    </div>
  );
}
