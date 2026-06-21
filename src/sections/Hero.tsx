import { motion } from 'motion/react';

const HERO_VIDEO = "https://ik.imagekit.io/hx85ktgzm/3D_object_transforming_in_black_202606161346.mp4";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  return (
    <section className="relative h-[100dvh] w-full bg-[#050505] overflow-hidden" id="home">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-[#050505]/20 pointer-events-none" />
      </div>

      {/* Content Container — mobile-first spacing */}
      <div className="absolute inset-0 container mx-auto px-5 md:px-12 z-10 flex flex-col justify-center pb-16 pt-24 md:pt-40 md:justify-start">
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col justify-start"
        >
          {/* Hero H1 — clamp(42px, 9vw, 56px) on mobile, larger on desktop */}
          <motion.h1 
            className="text-white leading-[0.88] tracking-tighter"
            style={{
              fontSize: 'clamp(42px, 9vw, 120px)',
            }}
          >
            <motion.span variants={fadeUp} className="block font-bold">PREMIUM WEBSITES.</motion.span>
            <motion.span variants={fadeUp} className="block font-light italic opacity-90">AI AUTOMATION.</motion.span>
            <motion.span variants={fadeUp} className="block font-medium opacity-70">BUILT TO SCALE.</motion.span>
          </motion.h1>

          {/* Trust Statement — improved mobile readability */}
          <motion.div 
            variants={fadeUp}
            className="mt-8 md:mt-12 flex items-center gap-4"
          >
            <div className="h-[1px] w-8 bg-white/20" />
            <p className="text-xs md:text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
              Custom Websites &bull; AI Automation &bull; Business Systems
            </p>
          </motion.div>

          {/* Mobile CTA — visible only on small screens */}
          <motion.div variants={fadeUp} className="mt-10 md:hidden">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-black rounded-full font-semibold text-sm active:scale-[0.97] transition-transform"
            >
              Start Your Project →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
