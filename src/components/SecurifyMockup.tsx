import React from 'react';

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4";

export default function SecurifyMockup() {
  return (
    <div className="font-securify w-full h-full relative overflow-hidden bg-black text-white antialiased text-left">
      <section className="relative h-full w-full overflow-hidden bg-black">
        {/* Background Video */}
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline 
          src={VIDEO_URL}
        />

        {/* Navbar */}
        <nav className="absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0 flex items-center justify-between gap-4">
          
          {/* Left pill */}
          <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3">
            <svg viewBox="0 0 256 256" className="h-5 w-5" fill="#ffffff">
              <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
            </svg>
            <span className="text-white text-sm font-normal tracking-tight">securify</span>
          </div>

          {/* Center pill */}
          <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
            {['platform', 'solutions', 'company', 'support'].map((link) => (
              <a key={link} href="#" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">
                {link}
              </a>
            ))}
          </div>

          {/* Right button */}
          <button className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors">
            get started
          </button>
        </nav>

        {/* Foreground Content Wrapper */}
        <div className="relative h-full w-full">
          
          {/* Headlines */}
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%]">
            protect
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%]">
            your
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%]">
            data
          </h1>

          {/* Description Paragraph */}
          <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90 lowercase">
            we can guarding your data with utmost care, empowering you with privacy everywhere
          </p>

          {/* Stat block - Top Right */}
          <div className="absolute right-6 md:right-24 top-[14%] flex flex-col items-end">
            <div className="flex items-center gap-3 justify-end">
              <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
              <span className="text-4xl md:text-5xl font-medium tracking-tight">+65k</span>
            </div>
            <div className="text-xs md:text-sm text-white/70 mt-1 text-right lowercase">startups use</div>
          </div>

          {/* Stat block - Bottom Left */}
          <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-medium tracking-tight">+1.5b</span>
              <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            </div>
            <div className="text-xs md:text-sm text-white/70 mt-1 lowercase">gb data was protected</div>
          </div>

          {/* Stat block - Bottom Right */}
          <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20 flex flex-col items-end">
            <div className="flex items-center gap-3 justify-end">
              <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
              <span className="text-4xl md:text-5xl font-medium tracking-tight">+300k</span>
            </div>
            <div className="text-xs md:text-sm text-white/70 mt-1 text-right lowercase">downloads</div>
          </div>

          {/* Bottom gradient overlay */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
        </div>
      </section>
    </div>
  );
}
