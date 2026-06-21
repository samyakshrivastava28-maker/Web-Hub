import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4";

// Custom typewriter hook
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeoutId: number;
    let intervalId: number;

    setDisplayed('');
    setDone(false);

    timeoutId = window.setTimeout(() => {
      let index = 0;
      intervalId = window.setInterval(() => {
        setDisplayed(text.substring(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function MainframeMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!");

  const serviceOptions = ["Brand", "Digital", "Campaign", "Other"];

  const toggleService = (service: string) => {
    setServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  // Video playback & scrubbing logic
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let targetTime = 0;
    let isSeeking = false;
    let seekQueued = false;

    const handleMouseMove = (e: MouseEvent) => {
      // Ignore scrubbing on mobile frames (simulated by width < 1024)
      const width = container.clientWidth || window.innerWidth;
      if (width < 1024 || !video.duration) return;

      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      
      // Map cursor position directly to video timeline
      targetTime = (x / rect.width) * video.duration;

      if (!isSeeking) {
        isSeeking = true;
        video.currentTime = targetTime;
      } else {
        seekQueued = true;
      }
    };

    const handleSeeked = () => {
      if (seekQueued) {
        seekQueued = false;
        video.currentTime = targetTime;
      } else {
        isSeeking = false;
      }
    };

    // Responsive initialization
    const handleResize = () => {
      const width = container.clientWidth || window.innerWidth;
      if (width < 1024) {
        // Auto play on mobile
        if (video.paused) {
          video.play().catch(() => {});
        }
      } else {
        video.pause();
      }
    };

    // Initial check
    handleResize();

    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen text-left w-full h-full"
    >
      {/* Background Video Component */}
      <div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-right lg:object-right-bottom"
        />
      </div>

      {/* Interactive Navbar */}
      <header className="absolute lg:fixed top-0 inset-x-0 z-[20] px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent pointer-events-auto w-full">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <span className="text-[21px] sm:text-[26px] tracking-tight text-black font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-black select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex flex-row text-[23px] text-black items-center">
          {['Labs', 'Studio', 'Openings', 'Shop'].map((link, i, arr) => (
            <React.Fragment key={link}>
              <a href="#" className="hover:opacity-60 transition-opacity">{link}</a>
              {i < arr.length - 1 && <span className="opacity-40">,&nbsp;</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#" className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
          Get in touch
        </a>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col gap-[5px] relative z-20 pointer-events-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`w-6 h-[2px] bg-black transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute lg:fixed inset-0 z-[19] bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-8 pointer-events-auto transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {['Labs', 'Studio', 'Openings', 'Shop'].map(link => (
          <a key={link} href="#" className="text-[32px] font-medium text-black">
            {link}
          </a>
        ))}
        <a href="#" className="text-[32px] font-medium text-black underline underline-offset-2">
          Get in touch
        </a>
      </div>

      {/* Content Layout Container */}
      <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
        <main id="spade-hero" className="w-full max-w-7xl mx-auto px-6 py-12 lg:py-0 lg:pt-32 flex-1 flex flex-col justify-center lg:pl-10 xl:pl-16">
          
          {/* Headline with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-black leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap mt-20 lg:mt-0">
              {displayed}
              {!done && <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" />}
            </h1>
          </motion.div>

          {/* Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-[#5A635A] leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br className="hidden sm:block" /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Interactive Multi-Select Service Pills */}
          <div className="max-w-2xl">
            <h2 className="text-2xl font-medium tracking-tight mb-2">What sort of service?</h2>
            <p className="opacity-85 text-[#738273] mb-8">Select all that apply</p>
            
            <div className="flex flex-wrap gap-3 mb-8 pointer-events-auto">
              {serviceOptions.map((service) => {
                const isActive = services.includes(service);
                return (
                  <motion.button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[15px] font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#1C2E1E] text-white shadow-md shadow-emerald-950/5 transform' 
                        : 'bg-white text-[#1C2E1E] border border-[#F1F3F1] hover:bg-[#F1F3F1]/55'
                    }`}
                  >
                    {service}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0, width: 0 }}
                          animate={{ opacity: 1, scale: 1, width: 'auto' }}
                          exit={{ opacity: 0, scale: 0, width: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Check size={16} strokeWidth={2.5} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Contingent Feedback Status Banner */}
            <div className="min-h-[60px]">
              <AnimatePresence mode="wait">
                {services.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="italic text-xs text-[#1C2E1E] py-4"
                  >
                    Please click to select services above.
                  </motion.div>
                ) : (
                  <motion.div 
                    key="active"
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#FAFBF9] border border-[#F1F3F1] rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 overflow-hidden"
                  >
                    <span className="text-sm font-medium text-[#1C2E1E]">
                      Ready to inquire about: <span className="text-[#5A635A]">{services.join(", ")}</span>
                    </span>
                    <button className="flex items-center gap-2 text-[#4D6D47] uppercase text-xs font-bold tracking-widest hover:opacity-70 transition-opacity whitespace-nowrap pointer-events-auto">
                      Let's Go
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}
