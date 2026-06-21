import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Backend" },
  { name: "Firebase", category: "Database" },
  { name: "AI Automation", category: "Intelligence" },
  { name: "Cloud Infrastructure", category: "DevOps" },
  { name: "APIs", category: "Integration" },
];

export default function Ecosystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Ecosystem Nodes Animation
      gsap.from(itemsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        scale: 0.8,
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // Subtle continuous floating animation for nodes
      itemsRef.current.forEach((item, i) => {
        gsap.to(item, {
          y: i % 2 === 0 ? "-=10" : "+=10",
          duration: 2 + (i % 3),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 relative bg-[#050505] overflow-hidden">
      {/* Background Depth Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-accent opacity-5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            Our Technology <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We build on a foundation of modern, scalable technologies designed for performance and longevity.
          </p>
        </div>

        {/* Ecosystem Visualizer */}
        <div className="relative max-w-5xl mx-auto h-[600px] flex items-center justify-center">
          {/* Center Hub */}
          <div className="absolute center-hub w-32 h-32 rounded-full glass-panel flex items-center justify-center z-20 border border-white/20 shadow-[0_0_50px_rgba(255,0,122,0.15)]">
            <span className="font-bold text-xl tracking-widest text-white/90">CORE</span>
          </div>

          {/* Orbiting Nodes */}
          {technologies.map((tech, index) => {
            const angle = (index / technologies.length) * (2 * Math.PI);
            const radius = 220; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div
                key={tech.name}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="absolute w-40 p-4 rounded-xl glass-panel border border-white/10 flex flex-col items-center justify-center gap-1 z-10 transition-colors hover:border-white/30 cursor-default"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <span className="text-xs uppercase tracking-wider text-white/40">{tech.category}</span>
                <span className="font-semibold text-white/90">{tech.name}</span>
              </div>
            );
          })}
          
          {/* SVG Connection Lines (Decorative) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
            <defs>
              <radialGradient id="lineGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="50%" cy="50%" r="220" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 8" />
          </svg>
        </div>
      </div>
    </section>
  );
}
