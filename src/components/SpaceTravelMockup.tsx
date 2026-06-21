import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Play, Clock, Globe } from 'lucide-react';

const VIDEO_1 = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";
const VIDEO_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

// Custom Fading Video Component
function FadingVideo({ src, className, style }: { src: string, className?: string, style?: React.CSSProperties }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const fadeTo = (target: number, durationMs: number = 500) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      const startOp = parseFloat(video.style.opacity || '0');
      const startTime = performance.now();
      
      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const currentOp = startOp + (target - startOp) * progress;
        video.style.opacity = currentOp.toString();
        
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };
      
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(() => {});
      fadeTo(1);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const timeLeft = video.duration - video.currentTime;
      if (!fadingOutRef.current && timeLeft <= 0.55 && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      src={src}
      autoPlay 
      muted 
      playsInline 
      preload="auto"
      className={className}
      style={{ ...style, opacity: 0 }}
    />
  );
}

// Word-by-word BlurText component
function BlurText({ text, className }: { text: string, className?: string }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', rowGap: '0.1em' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
          animate={isInView ? { filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], opacity: [0, 0.5, 1], y: [50, -5, 0] } : {}}
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut", delay: (i * 100) / 1000 }}
          style={{ display: 'inline-block', marginRight: '0.28em' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function SpaceTravelMockup() {
  return (
    <div className="bg-black text-white font-body w-full h-full relative overflow-y-auto overflow-x-hidden custom-scrollbar text-left">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden">
        {/* Background Video */}
        <FadingVideo 
          src={VIDEO_1} 
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        {/* Navbar */}
        <nav className="absolute top-4 left-0 right-0 px-8 lg:px-16 z-50 flex items-center justify-between">
          {/* Logo */}
          <div className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center">
            <span className="font-heading italic text-2xl lowercase">a</span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch'].map(link => (
              <a key={link} href="#" className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors">
                {link}
              </a>
            ))}
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 whitespace-nowrap ml-2">
              Claim a Spot <ArrowUpRight size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Spacer */}
          <div className="w-12 h-12 hidden md:block"></div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-24 px-4 w-full">
          
          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ease: "easeOut" }}
            className="liquid-glass rounded-full flex items-center p-1 pr-4 gap-3 mb-6"
          >
            <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full">New</span>
            <span className="text-sm text-white/90 font-medium">Maiden Crewed Voyage to Mars Arrives 2026</span>
          </motion.div>

          <BlurText 
            text="Venture Past Our Sky Across the Universe"
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl text-center tracking-[-4px]"
          />

          <motion.p 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ delay: 0.8, ease: "easeOut" }}
            className="mt-6 text-sm md:text-base text-white/90 max-w-2xl text-center font-light leading-tight px-4"
          >
            Discover the universe in ways once unimaginable. Our pioneering vessels and breakthrough engineering bring deep-space exploration within reach—secure and extraordinary.
          </motion.p>

          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ delay: 1.1, ease: "easeOut" }}
            className="flex flex-wrap justify-center items-center gap-6 mt-8"
          >
            <button className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 transition-transform hover:scale-105">
              Start Your Voyage <ArrowUpRight size={20} strokeWidth={2} />
            </button>
            <button className="text-white/90 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
              View Liftoff <Play size={16} fill="currentColor" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ delay: 1.3, ease: "easeOut" }}
            className="flex flex-wrap justify-center items-stretch gap-4 mt-12 w-full max-w-3xl"
          >
            {/* Stat Card 1 */}
            <div className="liquid-glass rounded-[1.25rem] p-5 w-[220px] flex flex-col justify-between">
              <Clock size={28} className="text-white mb-6" strokeWidth={1.5} />
              <div>
                <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">34.5 Min</div>
                <div className="text-xs text-white/70 font-light mt-2">Average Videos Watch Time</div>
              </div>
            </div>
            {/* Stat Card 2 */}
            <div className="liquid-glass rounded-[1.25rem] p-5 w-[220px] flex flex-col justify-between">
              <Globe size={28} className="text-white mb-6" strokeWidth={1.5} />
              <div>
                <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">2.8B+</div>
                <div className="text-xs text-white/70 font-light mt-2">Users Across the Globe</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div 
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.4, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-5 pb-8 mt-12 w-full"
        >
          <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-white/90">
            Collaborating with top aerospace pioneers globally
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 font-heading italic text-2xl md:text-3xl tracking-tight text-white/90">
            <span>Aeon</span>
            <span>Vela</span>
            <span>Apex</span>
            <span>Orbit</span>
            <span>Zeno</span>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: CAPABILITIES */}
      <section className="relative min-h-[100dvh] w-full flex flex-col overflow-hidden bg-black">
        <FadingVideo 
          src={VIDEO_2} 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-24 pb-16 flex flex-col min-h-[100dvh]">
          
          {/* Header */}
          <div className="mb-auto">
            <p className="text-sm font-body text-white/80 mb-6 uppercase tracking-wider">// Capabilities</p>
            <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
              Production<br/>evolved
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            
            {/* Card 1 */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-500">
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {['Natural Context', 'Photo Realism', 'Infinite Settings', 'Eco-Vibe'].map(tag => (
                    <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 whitespace-nowrap">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">AI Scenery</h3>
                <p className="mt-4 text-sm text-white/80 font-light leading-relaxed max-w-[32ch]">
                  AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-500 delay-100">
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {['Scale Fast', 'Visual Consistency', 'Time Saver', 'Ready to Post'].map(tag => (
                    <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 whitespace-nowrap">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">Batch Production</h3>
                <p className="mt-4 text-sm text-white/80 font-light leading-relaxed max-w-[32ch]">
                  Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-500 delay-200">
              <div className="flex items-start justify-between gap-4">
                <div className="w-11 h-11 liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
                  </svg>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {['Ray Tracing', 'Physical Shadows', 'Studio Quality', 'Sunlight Sync'].map(tag => (
                    <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 whitespace-nowrap">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">Smart Lighting</h3>
                <p className="mt-4 text-sm text-white/80 font-light leading-relaxed max-w-[32ch]">
                  Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
