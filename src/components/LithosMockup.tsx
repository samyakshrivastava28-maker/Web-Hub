import React, { useRef, useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const SPOTLIGHT_R = 260;
const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

function RevealLayer({ image, cursorX, cursorY }: { image: string, cursorX: number, cursorY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [maskUrl, setMaskUrl] = useState<string>('');
  const [size, setSize] = useState({ w: 1000, h: 800 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({
          w: entry.contentRect.width,
          h: entry.contentRect.height
        });
      }
    });
    
    observer.observe(canvas.parentElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = size.w;
    canvas.height = size.h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size.w, size.h);

    if (cursorX === -999 && cursorY === -999) {
      setMaskUrl(canvas.toDataURL());
      return;
    }

    const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();

    setMaskUrl(canvas.toDataURL());
  }, [cursorX, cursorY, size]);

  return (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ 
          backgroundImage: `url(${image})`,
          WebkitMaskImage: maskUrl ? `url(${maskUrl})` : 'none',
          WebkitMaskSize: '100% 100%',
          maskImage: maskUrl ? `url(${maskUrl})` : 'none',
          maskSize: '100% 100%'
        }}
      />
    </>
  );
}

export default function LithosMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const mouseRef = useRef({ x: -999, y: -999 });
  const smoothRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      // If initial move, snap smooth to mouse immediately
      if (smoothRef.current.x === -999) {
        smoothRef.current = { ...mouseRef.current };
      }
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -999, y: -999 };
      smoothRef.current = { x: -999, y: -999 };
      setCursorPos({ x: -999, y: -999 });
    };

    const loop = () => {
      if (mouseRef.current.x !== -999) {
        smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.1;
        smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.1;
        setCursorPos({ x: smoothRef.current.x, y: smoothRef.current.y });
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div 
      className="bg-white tracking-[-0.02em] font-sans h-full w-full relative overflow-hidden text-left"
    >
      <section 
        ref={containerRef}
        className="relative w-full overflow-hidden h-full bg-black group"
      >
        {/* Base Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-anim hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Reveal Layer */}
        <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

        {/* Heading */}
        <h1 className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50 text-white leading-[0.95]">
          <span 
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal" 
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            Layers hold
          </span>
          <span 
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            tales of time
          </span>
        </h1>

        {/* Bottom Left Paragraph */}
        <div 
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade pointer-events-none"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed drop-shadow-md">
            Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
          </p>
        </div>

        {/* Bottom Right Block */}
        <div 
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed drop-shadow-md pointer-events-none">
            Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
          </p>
          <button className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30">
            Start Digging
          </button>
        </div>

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 pointer-events-auto">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
            </svg>
            <span className="text-white text-2xl font-playfair italic">Lithos</span>
          </div>

          {/* Center Pill */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
            <button className="text-white px-4 py-1.5 rounded-full text-sm font-medium bg-white/10">Course</button>
            {['Field Guides', 'Geology', 'Plans', 'Live Tour'].map(item => (
              <button key={item} className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium">
                {item}
              </button>
            ))}
          </div>

          {/* Right */}
          <button className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors">
            Sign Up
          </button>
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </nav>
      </section>
    </div>
  );
}
