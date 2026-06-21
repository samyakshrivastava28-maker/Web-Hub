import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Strands from '../components/Strands';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "React",
  "TypeScript",
  "Node.js",
  "Firebase",
  "AI Automation",
  "API Integrations",
  "Cloud Infrastructure",
  "Framer Motion",
  "GSAP",
  "Tailwind CSS",
  "ReCAPTCHA"
];

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation — always runs
      gsap.from(textRefs.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(1.2)"
      });

      // Continuous floating — desktop only (causes jank on mobile)
      if (!isMobile) {
        textRefs.current.forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? "-=8" : "+=8",
            duration: 2 + (i % 3),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative min-h-[70vh] md:min-h-screen bg-[#050505] py-16 md:py-32" id="technology">
      {/* Background Strands — reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden opacity-30 md:opacity-50">
        <Strands 
          colors={["#F97316", "#7C3AED", "#06B6D4"]}
          count={isMobile ? 2 : 3}
          speed={isMobile ? 0.3 : 0.5}
          amplitude={1}
          waviness={1}
          thickness={0.7}
          glow={isMobile ? 1.5 : 2.6}
          taper={3}
          spread={1}
          intensity={0.6}
          saturation={1.5}
          opacity={1}
          scale={isMobile ? 1.2 : 1.5}
          glass={false}
        />
      </div>

      <div className="relative z-10 container mx-auto px-5 md:px-12 flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh]">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-[11px] md:text-base font-semibold tracking-[0.2em] uppercase text-white/50 mb-3 md:mb-4">
            Technology That Powers Every Project
          </h2>
          <p className="text-lg md:text-3xl font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
            Modern websites, intelligent automations and scalable systems built to help businesses grow faster.
          </p>
        </div>

        {/* Tech pills */}
        <div ref={containerRef} className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {techStack.map((tech, i) => (
            <div 
              key={tech}
              ref={el => { textRefs.current[i] = el; }}
              className="px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 glass-panel bg-white/5 text-white/90 text-sm md:text-base font-medium tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:border-white/30 hover:bg-white/10 transition-colors cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
