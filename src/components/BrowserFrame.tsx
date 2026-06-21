import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Shield, RotateCw, ChevronLeft, ChevronRight, Share, Plus } from 'lucide-react';

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  title?: string;
}

export default function BrowserFrame({ children, url = "https://flowai.swebhub.com", title = "FlowAI" }: BrowserFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  // Scroll-based 3D entrance — desktop only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Desktop: full 3D cinematic. Mobile: simple fade-in (no perspective transforms)
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -5]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const y = useTransform(smoothProgress, [0, 0.5, 1], [100, 0, -50]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);

  return (
    <div 
      ref={containerRef} 
      className="w-full aspect-[16/10] relative flex items-center justify-center group"
      style={{ perspective: isMobile ? 'none' : '2000px' }}
    >
      {/* Ambient glow — desktop only */}
      {!isMobile && (
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-emerald-500/10 blur-[100px] pointer-events-none rounded-full scale-150"
        />
      )}

      <motion.div
        style={isMobile ? { opacity } : { rotateX, scale, y, opacity, willChange: 'transform, opacity' }}
        className="w-full h-full absolute inset-0 bg-[#0A0A0B]/95 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col z-10"
      >
        {/* Reflection — desktop only */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-50 mix-blend-overlay hidden md:block" />

        {/* Browser Header */}
        <div className="h-10 md:h-12 bg-[#1C1C1E]/90 border-b border-white/5 flex items-center px-3 md:px-4 shrink-0 relative z-40">
          {/* Traffic Lights */}
          <div className="flex gap-1.5 md:gap-2 w-14 md:w-16">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          {/* Navigation — desktop */}
          <div className="hidden md:flex gap-4 items-center text-white/40 ml-4">
             <ChevronLeft size={16} />
             <ChevronRight size={16} className="opacity-30" />
             <RotateCw size={14} />
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex justify-center mx-2 md:mx-4">
             <div className="w-full max-w-sm h-6 md:h-7 bg-[#0A0A0B]/50 border border-white/5 rounded-md flex items-center justify-center px-2 md:px-3 gap-1.5 shadow-inner">
                <Shield size={9} className="text-white/30 hidden md:block" />
                <span className="text-[9px] md:text-xs font-medium text-white/40 tracking-wide font-mono truncate">{url}</span>
             </div>
          </div>

          {/* Right Icons — desktop */}
          <div className="hidden md:flex gap-4 items-center text-white/40 justify-end w-16">
             <Share size={14} />
             <Plus size={16} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-[#050505] overflow-hidden rounded-b-2xl md:rounded-b-3xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
