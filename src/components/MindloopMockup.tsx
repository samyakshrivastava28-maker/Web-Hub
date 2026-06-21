import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Linkedin, Twitter, Bot, Search, Globe, MoveRight } from 'lucide-react';
import Hls from 'hls.js';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

function WordReveal({ text, highlightWords, containerRef }: { text: string, highlightWords?: string[], containerRef: React.RefObject<HTMLElement | null> }) {
  const words = text.split(" ");
  
  // Create a scroll transform mapped to the progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <span className="flex flex-wrap">
      {words.map((word, i) => {
        // Calculate the opacity for each word based on scroll progress
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        
        // Clean word of punctuation to check if it's highlighted
        const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
        const isHighlighted = highlightWords?.includes(cleanWord);
        
        return (
          <motion.span 
            key={i} 
            style={{ opacity }}
            className={`mr-2 mb-2 ${isHighlighted ? 'text-[hsl(var(--foreground))]' : 'text-[hsl(var(--hero-subtitle))]'}`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

function HlsVideo({ src, className }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        startPosition: -1,
        capLevelToPlayerSize: false,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log("Autoplay blocked", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for Safari which supports HLS natively
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log("Autoplay blocked", e));
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      crossOrigin="anonymous"
    />
  );
}

export default function MindloopMockup() {
  const missionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="mindloop-theme w-full h-full overflow-y-auto overflow-x-hidden bg-[hsl(var(--background))] text-[hsl(var(--foreground))] font-sans relative selection:bg-[hsl(var(--muted))] selection:text-[hsl(var(--foreground))]"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      
      {/* 1. Navbar */}
      <div className="sticky top-0 z-50 w-full h-0">
        <nav className="absolute top-0 inset-x-0 px-5 md:px-28 py-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
          {/* Logo Icon */}
          <div className="relative w-7 h-7 rounded-full border-2 border-[hsl(var(--foreground))]/60 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border border-[hsl(var(--foreground))]/60" />
          </div>
          <span className="font-bold text-lg tracking-tight">Mindloop</span>
        </div>

        {/* Center Links (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-6 pointer-events-auto">
          {['Home', 'How It Works', 'Philosophy', 'Use Cases'].map((link, i, arr) => (
            <React.Fragment key={link}>
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors text-sm font-medium">
                {link}
              </a>
              {i < arr.length - 1 && <span className="text-[hsl(var(--muted-foreground))]/40">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3 pointer-events-auto hidden md:flex">
          {[Instagram, Linkedin, Twitter].map((Icon, i) => (
            <button key={i} className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon size={16} />
            </button>
          ))}
        </div>
        </nav>
      </div>

      {/* 2. Hero Section */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-contain md:object-cover opacity-60 mix-blend-screen pointer-events-none"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" type="video/mp4" />
        </video>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[hsl(var(--background))] to-transparent z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl px-5 pt-28 md:pt-32 flex flex-col items-center">
          {/* Avatar Row */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 mb-8">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-[hsl(var(--background))] object-cover" />
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64&q=80" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-[hsl(var(--background))] object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-[hsl(var(--background))] object-cover" />
            </div>
            <span className="text-[hsl(var(--muted-foreground))] text-sm">
              7,000+ people already subscribed
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight md:tracking-[-2px] leading-[1.15] md:leading-[1.1] mb-6">
            Get <span style={{ fontFamily: '"Instrument Serif", serif' }} className="italic font-normal">Inspired</span> with Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.3)} className="text-lg text-[hsl(var(--hero-subtitle))] max-w-2xl leading-relaxed mb-10">
            Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.
          </motion.p>

          {/* Email Form */}
          <motion.div {...fadeUp(0.4)} className="w-full max-w-lg">
            <div className="liquid-glass rounded-full p-2 flex items-center shadow-2xl">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-transparent border-none outline-none px-6 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] text-base"
              />
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))] font-semibold rounded-full px-8 py-3 text-sm tracking-wide"
              >
                SUBSCRIBE
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Search has changed Section */}
      <section className="pt-52 md:pt-64 pb-6 md:pb-9 px-5 max-w-7xl mx-auto text-center">
        <motion.h2 {...fadeUp(0.1)} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight md:tracking-[-2px] leading-[1.15] md:leading-none mb-6">
          Search has changed. <span style={{ fontFamily: '"Instrument Serif", serif' }} className="italic font-normal">Have you?</span>
        </motion.h2>
        
        <motion.p {...fadeUp(0.2)} className="text-[hsl(var(--muted-foreground))] text-lg max-w-2xl mx-auto mb-24 leading-relaxed">
          The way we consume information is evolving. AI-driven platforms are transforming discovery. Ensure your content strategy adapts.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 text-left">
          {/* Card 1 */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col items-center md:items-start text-center md:text-left group">
            <div className="w-full max-w-[200px] aspect-square rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] mb-8 flex items-center justify-center p-8 transition-colors group-hover:bg-[hsl(var(--muted))]">
              <Bot size={64} className="text-[hsl(var(--foreground))]/60" />
            </div>
            <h3 className="font-semibold text-base mb-2">ChatGPT Integration</h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">Optimize your content for conversational AI retrieval to stay relevant.</p>
          </motion.div>
          {/* Card 2 */}
          <motion.div {...fadeUp(0.4)} className="flex flex-col items-center md:items-start text-center md:text-left group">
            <div className="w-full max-w-[200px] aspect-square rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] mb-8 flex items-center justify-center p-8 transition-colors group-hover:bg-[hsl(var(--muted))]">
              <Search size={64} className="text-[hsl(var(--foreground))]/60" />
            </div>
            <h3 className="font-semibold text-base mb-2">Perplexity Engine</h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">Build authority through deep, well-researched, and structured answers.</p>
          </motion.div>
          {/* Card 3 */}
          <motion.div {...fadeUp(0.5)} className="flex flex-col items-center md:items-start text-center md:text-left group">
            <div className="w-full max-w-[200px] aspect-square rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] mb-8 flex items-center justify-center p-8 transition-colors group-hover:bg-[hsl(var(--muted))]">
              <Globe size={64} className="text-[hsl(var(--foreground))]/60" />
            </div>
            <h3 className="font-semibold text-base mb-2">Google AI Overviews</h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">Adapt to generative search results by focusing on intent and clarity.</p>
          </motion.div>
        </div>

        <motion.p {...fadeUp(0.6)} className="text-[hsl(var(--muted-foreground))] text-sm">
          If you don't answer the questions, someone else will.
        </motion.p>
      </section>

      {/* 4. Mission Section */}
      <section ref={missionRef} className="pt-0 pb-32 md:pb-44 px-5 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Large looping video */}
        <motion.div 
          {...fadeUp(0.1)}
          className="w-full max-w-[800px] aspect-square rounded-[3rem] overflow-hidden mb-24 relative"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4" type="video/mp4" />
          </video>
          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
        </motion.div>

        {/* Scroll-driven Text Reveal */}
        <div className="max-w-4xl text-left">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] leading-tight mb-10">
            <WordReveal 
              text="We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having." 
              highlightWords={['curiosity', 'meets', 'clarity']}
              containerRef={missionRef}
            />
          </h2>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-tight">
            <WordReveal 
              text="A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved." 
              containerRef={missionRef}
            />
          </p>
        </div>
      </section>

      {/* 5. Solution Section */}
      <section className="py-32 md:py-44 px-5 border-t border-[hsl(var(--border))]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp(0.1)} className="mb-12">
            <span className="text-xs tracking-[3px] uppercase text-[hsl(var(--muted-foreground))] mb-6 block font-semibold">
              SOLUTION
            </span>
            <h2 className="text-4xl md:text-6xl tracking-tight md:tracking-[-1px] max-w-2xl font-medium leading-[1.15]">
              The platform for <span style={{ fontFamily: '"Instrument Serif", serif' }} className="italic font-normal">meaningful</span> content
            </h2>
          </motion.div>

          <motion.div {...fadeUp(0.2)} className="w-full aspect-[16/9] md:aspect-[3/1] rounded-2xl overflow-hidden mb-20">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Curated Feed", desc: "Discover content tailored to your interests without the noise." },
              { title: "Writer Tools", desc: "Powerful editors and analytics built specifically for creators." },
              { title: "Community", desc: "Engage deeply through threaded, structured discussions." },
              { title: "Distribution", desc: "Seamlessly publish and distribute across all your channels." }
            ].map((feature, i) => (
              <motion.div key={i} {...fadeUp(0.3 + (i * 0.1))}>
                <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="relative py-32 md:py-44 px-5 border-t border-[hsl(var(--border))]/30 overflow-hidden flex items-center justify-center min-h-[70svh]">
        {/* HLS Video Background */}
        <HlsVideo 
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="absolute inset-0 w-full h-full object-contain md:object-cover z-0"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-[hsl(var(--background))]/45 z-[1] backdrop-blur-[2px]" />

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        >
          {/* Logo Icon */}
          <div className="relative w-10 h-10 rounded-full border-[3px] border-[hsl(var(--foreground))] flex items-center justify-center mb-8">
            <div className="w-5 h-5 rounded-full border-[2px] border-[hsl(var(--foreground))]" />
          </div>

          <h2 style={{ fontFamily: '"Instrument Serif", serif' }} className="text-6xl md:text-8xl italic font-normal mb-6 leading-[1.1] md:leading-none">
            Start Your Journey
          </h2>
          
          <p className="text-[hsl(var(--muted-foreground))] text-lg mb-12">
            Join thousands of writers and readers shaping the future of digital content.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-[hsl(var(--foreground))] text-[hsl(var(--background))] font-semibold rounded-lg px-8 py-3.5 transition-colors"
            >
              Subscribe Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto liquid-glass border border-[hsl(var(--border))] rounded-lg px-8 py-3.5 font-medium flex items-center justify-center gap-2"
            >
              Start Writing
              <MoveRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 7. Footer */}
      <footer className="py-12 px-5 md:px-28 flex flex-col md:flex-row items-center justify-between border-t border-[hsl(var(--border))]/20 gap-6">
        <p className="text-[hsl(var(--muted-foreground))] text-sm text-center md:text-left">
          © 2026 Mindloop. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-[hsl(var(--muted-foreground))] text-sm">
          <a href="#" className="hover:text-[hsl(var(--foreground))] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[hsl(var(--foreground))] transition-colors">Terms</a>
          <a href="#" className="hover:text-[hsl(var(--foreground))] transition-colors">Contact</a>
        </div>
      </footer>

    </div>
  );
}
