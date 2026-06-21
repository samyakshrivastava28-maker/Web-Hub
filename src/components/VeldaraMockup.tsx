import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Github } from 'lucide-react';

export default function VeldaraMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoCanvasRef = useRef<HTMLCanvasElement>(null);
  const videoFallbackRef = useRef<HTMLVideoElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const navLayerRef = useRef<HTMLDivElement>(null);
  const fixedCardsRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef<HTMLElement>(null);
  const cardsTriggerRef = useRef<HTMLDivElement>(null);
  const sectionThreeInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- VIDEO SCROLL LOGIC ---
    const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4';
    const canvas = videoCanvasRef.current;
    const videoEl = videoFallbackRef.current;
    if (!canvas || !videoEl) return;
    
    const ctx = canvas.getContext('2d');
    let frames: ImageBitmap[] = [];
    let framesReady = false;
    let lastFrameIndex = -1;
    let videoSeeking = false;
    let animationFrameId: number;
    let containerVh = container.clientHeight || 500;

    function resizeCanvas() {
      if (!canvas || !container) return;
      containerVh = container.clientHeight || 500;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      lastFrameIndex = -1; // force redraw
    }

    async function extractFrames() {
      try {
        const response = await fetch(VIDEO_URL, { mode: 'cors' });
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        video.crossOrigin = 'anonymous';
        video.preload = 'auto';
        video.src = objectUrl;

        await new Promise<void>((resolve, reject) => {
          video.onloadedmetadata = () => resolve();
          video.onerror = () => reject();
          setTimeout(() => reject(), 15000);
        });

        const scale = Math.min(1, 1280 / video.videoWidth);
        const scaledWidth = Math.round(video.videoWidth * scale);
        const scaledHeight = Math.round(video.videoHeight * scale);
        const frameCount = Math.max(30, Math.min(120, Math.round(video.duration * 24)));

        for (let i = 0; i < frameCount; i++) {
          const time = (i / (frameCount - 1)) * (video.duration - 0.05);
          video.currentTime = time;
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => { video.removeEventListener('seeked', onSeeked); resolve(); };
            video.addEventListener('seeked', onSeeked);
            setTimeout(() => { video.removeEventListener('seeked', onSeeked); reject(); }, 3000);
          });
          const bitmap = await createImageBitmap(video, { resizeWidth: scaledWidth, resizeHeight: scaledHeight });
          frames.push(bitmap);
        }

        if (frames.length > 0) {
          framesReady = true;
          canvas.style.visibility = 'visible';
          videoEl.style.display = 'none';
        }
        URL.revokeObjectURL(objectUrl);
      } catch(e) { 
        console.log('Video extraction fallback'); 
        videoEl.play().catch(() => {});
      }
    }

    function getScrollBounds() {
      if (!container) return { start: 0, end: 1 };
      const vh = containerVh;
      return { start: vh * 0.5, end: container.scrollHeight - vh };
    }

    function getProgress() {
      if (!container) return 0;
      const { start, end } = getScrollBounds();
      const range = end - start;
      if (range <= 0) return 0;
      return Math.max(0, Math.min(1, (container.scrollTop - start) / range));
    }

    function drawFrame(frame: ImageBitmap) {
      if (!ctx || !canvas) return;
      const cw = canvas.width, ch = canvas.height;
      const s = Math.max(cw / frame.width, ch / frame.height);
      const dw = frame.width * s, dh = frame.height * s;
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    function videoTick() {
      const progress = getProgress();
      if (framesReady && frames.length > 0) {
        const idx = Math.round(progress * (frames.length - 1));
        if (idx !== lastFrameIndex) {
          lastFrameIndex = idx;
          if (frames[idx]) drawFrame(frames[idx]);
        }
      } else if (videoEl && videoEl.duration && isFinite(videoEl.duration) && videoEl.readyState >= 1) {
        const target = progress * videoEl.duration;
        if (!videoSeeking && Math.abs(videoEl.currentTime - target) > 0.05) {
          videoSeeking = true;
          videoEl.currentTime = target;
        }
      }
      animationFrameId = requestAnimationFrame(videoTick);
    }

    videoEl.addEventListener('seeked', () => { videoSeeking = false; });
    videoEl.addEventListener('stalled', () => { videoSeeking = false; });
    videoEl.addEventListener('loadeddata', () => { videoEl.currentTime = 0; videoEl.pause(); });
    canvas.style.visibility = 'hidden';

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    
    videoTick();
    extractFrames();

    // --- PARTICLES ---
    const pCanvas = particlesCanvasRef.current;
    if (!pCanvas) return;
    const pCtx = pCanvas.getContext('2d');
    let particles: any[] = [];
    let pAnimationId: number;

    function resizeParticles() {
      if (!pCanvas || !container) return;
      const rect = container.getBoundingClientRect();
      pCanvas.width = rect.width;
      pCanvas.height = rect.height;
      createParticles();
    }

    function createParticles() {
      if (!pCanvas) return;
      particles = [];
      const count = Math.floor((pCanvas.width * pCanvas.height) / 12000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * pCanvas.width,
          y: Math.random() * pCanvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
    }

    function animateParticles() {
      if (!pCtx || !pCanvas) return;
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = pCanvas.width;
        if (p.x > pCanvas.width) p.x = 0;
        if (p.y < 0) p.y = pCanvas.height;
        if (p.y > pCanvas.height) p.y = 0;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        pCtx.fill();
      }
      pAnimationId = requestAnimationFrame(animateParticles);
    }

    resizeParticles();
    resizeObserver.observe(container);
    animateParticles();

    // --- SCROLL TRANSFORM & UI LOGIC ---
    let uiAnimationId: number;
    
    function tickUI() {
      if (!container) return;
      const scrollTop = container.scrollTop;
      const vh = containerVh;

      // Simulate Fixed Positioning
      if (bgLayerRef.current) bgLayerRef.current.style.transform = `translateY(${scrollTop}px)`;
      if (navLayerRef.current) navLayerRef.current.style.transform = `translateY(${scrollTop}px)`;
      if (fixedCardsRef.current) fixedCardsRef.current.style.transform = `translateY(${scrollTop}px)`;

      // Hero Opacity
      if (heroRef.current) {
        const fade = Math.max(0, 1 - scrollTop / (vh * 0.3));
        heroRef.current.style.opacity = fade.toString();
      }

      // Fixed Cards Reveal
      if (fixedCardsRef.current && cardsGridRef.current && cardsTriggerRef.current) {
        const triggerEl = cardsTriggerRef.current;
        const triggerTop = triggerEl.offsetTop;
        const triggerHeight = triggerEl.offsetHeight;

        const start = triggerTop - vh * 0.5;
        const end = triggerTop + triggerHeight - vh * 0.3;
        const range = end - start;

        let progress = range > 0 ? (scrollTop - start) / range : 0;
        progress = Math.max(0, Math.min(1, progress));

        const isActive = scrollTop >= start - vh * 0.2 && scrollTop <= end + vh * 0.3;
        const fadeIn = Math.min(1, Math.max(0, (scrollTop - (start - vh * 0.2)) / (vh * 0.2)));
        const fadeOut = Math.min(1, Math.max(0, (end + vh * 0.3 - scrollTop) / (vh * 0.3)));
        const containerOpacity = isActive ? Math.min(fadeIn, fadeOut) : 0;

        fixedCardsRef.current.style.opacity = containerOpacity.toString();
        fixedCardsRef.current.style.pointerEvents = containerOpacity > 0.1 ? 'auto' : 'none';

        const isMobile = container.clientWidth < 768;
        const revealPct = progress * 130;
        if (isMobile) {
          cardsGridRef.current.style.maskImage = `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`;
          cardsGridRef.current.style.webkitMaskImage = `linear-gradient(to bottom, black ${revealPct}%, transparent ${revealPct + 20}%)`;
        } else {
          cardsGridRef.current.style.maskImage = `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;
          cardsGridRef.current.style.webkitMaskImage = `linear-gradient(to right, black ${revealPct}%, transparent ${revealPct + 15}%)`;
        }
      }

      uiAnimationId = requestAnimationFrame(tickUI);
    }
    tickUI();

    // --- INTERSECTION OBSERVER FOR SECTION 3 ---
    const sectionThreeInner = sectionThreeInnerRef.current;
    let observer: IntersectionObserver;
    if (sectionThreeInner) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          sectionThreeInner.classList.add('opacity-100', 'translate-y-0', 'blur-none');
          sectionThreeInner.classList.remove('opacity-0', 'translate-y-8', 'blur-md');
          observer.unobserve(sectionThreeInner);
        }
      }, { 
        root: container,
        threshold: 0.15 
      });
      observer.observe(sectionThreeInner);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(pAnimationId);
      cancelAnimationFrame(uiAnimationId);
      resizeObserver.disconnect();
      if (observer && sectionThreeInner) observer.unobserve(sectionThreeInner);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full overflow-y-auto overflow-x-hidden bg-[#010101] text-white relative font-['Inter',sans-serif] selection:bg-white/20"
      style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
    >
      
      {/* SIMULATED FIXED LAYERS */}
      
      {/* 1. Background Video */}
      <div ref={bgLayerRef} className="absolute top-0 left-0 w-full h-[100%] pointer-events-none z-0 bg-[#0a0a0a]">
        <canvas ref={videoCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
        <video 
          ref={videoFallbackRef} 
          muted 
          playsInline 
          preload="auto" 
          crossOrigin="anonymous"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 2. Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[3]">
        <canvas ref={particlesCanvasRef} className="w-full h-full" />
      </div>

      {/* 3. Navigation */}
      <div ref={navLayerRef} className="absolute top-0 left-0 w-full pointer-events-none z-[50]">
        <nav className="w-full flex items-center justify-between p-4 md:p-8 pointer-events-auto">
          <div className="flex items-center gap-8">
            <span className="font-bold text-lg md:text-xl text-white tracking-tight">veldara</span>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Guides</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Journal</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </nav>
      </div>

      {/* 4. Fixed Cards Layer */}
      <div ref={fixedCardsRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-[4] flex flex-col justify-end p-6 md:p-10 opacity-0 pb-10">
        <div ref={cardsGridRef} className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10 pointer-events-auto">
          {/* Card 1 - Always Visible */}
          <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-2xl shadow-2xl">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4">Explore Veldara</h3>
            <p className="text-gray-300 text-[13px] md:text-base leading-relaxed">Veldara merges the elegance of Svelte 5 with the depth of Three.js within easy reach. It's crafted to be robust and adaptable while remaining intuitive and simple to grasp.</p>
          </div>
          {/* Card 2 - Hidden on Mobile */}
          <div className="hidden md:block bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Unlock Three.js</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">The web is growing increasingly dimensional. At its heart, Veldara offers a composable declarative API for building performant Three.js experiences on the web.</p>
          </div>
          {/* Card 3 - Hidden on Mobile */}
          <div className="hidden md:block bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Connect Everything</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">Veldara ships with tooling for physics, XR, animation, layouting, model loading, and extensive utilities to make building compelling 3D apps for the web effortless.</p>
          </div>
        </div>
      </div>

      {/* FOREGROUND SCROLLING CONTENT */}
      <div className="relative z-[10] w-full">
        
        {/* Section 1: Hero */}
        <section ref={heroRef} className="relative h-[100vh] w-full flex flex-col pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex-1 flex flex-col items-center justify-end text-center px-4 pb-16 md:pb-24 pointer-events-auto">
            <p className="text-xs md:text-sm text-gray-400 mb-4 tracking-wider uppercase font-medium">Our Purpose:</p>
            <h1 className="text-3xl md:text-6xl lg:text-[4.5rem] font-semibold leading-[1.15] w-full tracking-tight px-2">
              Instantly craft immersive{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-1.5 md:h-3 bg-[#2C5C88] rounded-sm -z-10 opacity-80" />
                <span className="relative">3D worlds</span>
              </span>{' '}
              on the web.
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12 w-full max-w-[280px] md:max-w-none mx-auto">
              <div className="flex items-center gap-3 bg-[#111] border border-gray-800 rounded-xl px-4 md:px-6 py-3.5 md:py-4 shadow-xl w-full md:w-auto justify-center">
                <span className="text-[#3b82f6] font-mono text-sm">&gt;</span>
                <code className="text-gray-200 font-mono text-[13px] md:text-sm">npm i @veldara/core</code>
              </div>
              <a href="#" className="flex items-center justify-center gap-2 bg-[#2C5C88] hover:bg-[#3a7aad] text-white font-medium rounded-xl px-6 md:px-8 py-3.5 md:py-4 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20 w-full md:w-auto text-sm md:text-base">
                Get Started <span>&rarr;</span>
              </a>
            </div>
          </div>
          <div className="relative z-10 flex justify-center pb-6 md:pb-8 animate-bounce">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
            </svg>
          </div>
        </section>

        {/* Spacer */}
        <div style={{ height: '150vh' }} />

        {/* Cards Trigger Zone */}
        <div ref={cardsTriggerRef} style={{ height: '200vh' }} />

        {/* Spacer */}
        <div style={{ height: '100vh' }} />

        {/* Section 3 */}
        <section className="relative min-h-[100vh] flex items-center justify-center px-6 md:px-10 pb-20 md:pb-32">
          <div 
            ref={sectionThreeInnerRef} 
            className="relative z-10 flex flex-col items-center text-center opacity-0 translate-y-8 blur-md transition-all duration-1000 ease-out pointer-events-auto"
          >
            <p className="text-gray-400 text-sm md:text-xl mb-3 md:mb-4 font-medium uppercase tracking-widest">Presenting</p>
            <h2 className="text-4xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl">Veldara 8</h2>
          </div>
        </section>
      </div>
    </div>
  );
}
