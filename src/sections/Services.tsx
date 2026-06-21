import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Aurora from '../components/Aurora';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 'web',
    title: 'Website Development',
    headline: 'Premium Websites That Convert Visitors Into Customers',
    description: 'Custom-built websites focused on performance, branding, trust and conversion.',
  },
  {
    id: 'ai',
    title: 'AI Automation',
    headline: 'Automate Repetitive Work With AI',
    description: 'Reduce manual tasks and streamline operations using intelligent workflows and automation systems.',
  },
  {
    id: 'lead',
    title: 'Lead Generation Systems',
    headline: 'Build A Consistent Flow Of Qualified Leads',
    description: 'Custom lead capture and follow-up systems designed to help businesses grow.',
  },
  {
    id: 'sys',
    title: 'Business Systems',
    headline: 'Digital Infrastructure That Supports Growth',
    description: 'Internal systems, integrations and business tools built around your workflow.',
  }
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline locked to the scroll of the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 400vh of scrolling distance
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the entire section while scrolling through the timeline
        }
      });

      // Initially hide all except the first one
      gsap.set(textRefs.current.slice(1), { opacity: 0, y: 50 });
      gsap.set(visualRefs.current.slice(1), { opacity: 0, scale: 0.8 });

      // Build the narrative sequence
      servicesData.forEach((_, i) => {
        if (i === 0) {
          // First item is already visible, just wait a bit then fade it out
          tl.to([textRefs.current[i], visualRefs.current[i]], {
            opacity: 0,
            y: -50,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut"
          }, "+=1"); // Keep it visible for a moment
        } else if (i === servicesData.length - 1) {
          // Last item fades in and stays
          tl.to([textRefs.current[i], visualRefs.current[i]], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out"
          });
        } else {
          // Middle items fade in, wait, then fade out
          tl.to([textRefs.current[i], visualRefs.current[i]], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out"
          })
          .to([textRefs.current[i], visualRefs.current[i]], {
            opacity: 0,
            y: -50,
            scale: 0.9,
            duration: 1,
            ease: "power2.inOut"
          }, "+=1");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden" id="services">
      {/* Background Aurora */}
      <div className="absolute inset-0 opacity-40">
        <Aurora 
          colorStops={["#FF94B4", "#3A29FF", "#FF3232"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.8}
        />
        {/* Vignette to blend edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050505]/60 to-[#050505]"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col pt-32 px-6 md:px-16 pb-12 container mx-auto">
        
        {/* Top Header */}
        <div className="w-full flex justify-between items-start mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50">Services</span>
          <div className="max-w-md text-right">
            <h2 className="text-sm md:text-base font-semibold tracking-wide text-white mb-2">Built For Businesses That Want To Scale.</h2>
            <p className="text-xs md:text-sm text-white/40 leading-relaxed">From custom websites to intelligent automations, every solution is designed to increase efficiency, improve customer experience, and drive growth.</p>
          </div>
        </div>

        {/* Narrative Chapters Container */}
        <div className="relative flex-1 w-full flex items-center">
          {servicesData.map((service, i) => (
            <div 
              key={service.id} 
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-12"
            >
              {/* Left: Typography Description */}
              <div 
                ref={el => { textRefs.current[i] = el; }}
                className="w-full md:w-5/12 flex flex-col justify-center"
              >
                <h3 className="text-white/60 text-sm tracking-[0.2em] uppercase font-bold mb-4">{service.title}</h3>
                <h4 className="text-4xl md:text-6xl font-medium tracking-tighter text-white leading-[1.1] mb-6">
                  {service.headline}
                </h4>
                <p className="text-white/50 text-lg max-w-md leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Right: Custom Visual Elements */}
              <div 
                ref={el => { visualRefs.current[i] = el; }}
                className="w-full md:w-7/12 h-full flex items-center justify-center"
              >
                {i === 0 && (
                  // Browser Mockup (Websites)
                  <div className="w-full max-w-lg aspect-video rounded-xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700">
                    <div className="h-8 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <div className="flex-1 p-8 flex flex-col gap-4 opacity-50">
                      <div className="w-3/4 h-8 rounded bg-white/10 animate-pulse"></div>
                      <div className="w-1/2 h-4 rounded bg-white/5"></div>
                      <div className="w-full h-full rounded border border-white/5 bg-white/[0.02] mt-4"></div>
                    </div>
                  </div>
                )}

                {i === 1 && (
                  // AI Nodes (AI Automation)
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-4 border border-dashed border-[#e100ff]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-[#3A29FF] to-[#e100ff] blur-md animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                      <span className="text-black font-bold tracking-tighter">AI</span>
                    </div>
                    {/* Floating connected nodes */}
                    <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-white/80 shadow-[0_0_15px_#fff]"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-white/50"></div>
                    <div className="absolute top-1/2 -left-2 w-5 h-5 rounded-full bg-[#3A29FF]/80"></div>
                  </div>
                )}

                {i === 2 && (
                  // Pipeline/Funnel (Lead Gen)
                  <div className="w-full max-w-sm flex flex-col items-center gap-2">
                    <div className="w-full h-12 rounded-t-xl bg-gradient-to-b from-white/20 to-white/5 border-t border-x border-white/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce"></div>
                    </div>
                    <div className="w-3/4 h-12 bg-gradient-to-b from-white/10 to-white/5 border-x border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white opacity-80"></div>
                    </div>
                    <div className="w-1/2 h-12 bg-gradient-to-b from-white/5 to-transparent border-x border-b border-white/5 rounded-b-xl flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#e100ff] shadow-[0_0_10px_#e100ff]"></div>
                    </div>
                  </div>
                )}

                {i === 3 && (
                  // Network Grid (Business Systems)
                  <div className="grid grid-cols-3 gap-4 p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm transform -rotate-6">
                    {[...Array(9)].map((_, j) => (
                      <div 
                        key={j} 
                        className={`w-16 h-16 rounded border ${j === 4 ? 'border-[#e100ff] bg-[#e100ff]/10 shadow-[0_0_20px_rgba(225,0,255,0.2)]' : 'border-white/10 bg-white/5'} flex items-center justify-center`}
                      >
                        {j === 4 && <div className="w-4 h-4 rounded-full bg-[#e100ff] animate-ping"></div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
