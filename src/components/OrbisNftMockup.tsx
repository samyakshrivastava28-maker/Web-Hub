import React from 'react';
import { Mail, Twitter, Github, ChevronRight } from 'lucide-react';

export default function OrbisNftMockup() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden bg-orbis-bg relative font-mono text-cream selection:bg-neon/30 selection:text-white">
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-60 mix-blend-lighten" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundSize: '150px 150px'
           }}>
      </div>

      <div className="max-w-[1831px] mx-auto relative z-10">

        {/* SECTION 1: HERO */}
        <section className="relative min-h-[100svh] w-full flex flex-col rounded-b-[32px] overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_045634_e1c98c76-1265-4f5c-882a-4276f2080894.mp4" type="video/mp4" />
          </video>
          
          <div className="relative z-10 flex flex-col h-full w-full px-5 md:px-12 pt-8 pb-12">
            
            {/* Header */}
            <header className="flex items-center justify-between w-full">
              <div className="font-grotesk text-[16px] uppercase tracking-wide">Orbis.Nft</div>
              
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-8 liquid-glass rounded-[28px] px-[52px] py-[24px]">
                {['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact'].map((item) => (
                  <a key={item} href="#" className="font-grotesk text-[13px] uppercase hover:text-neon transition-colors">
                    {item}
                  </a>
                ))}
              </nav>
              
              {/* Spacer for flex layout to center the nav if needed, but flex-between handles it. 
                  Actually, the prompt says "Left: Orbis.Nft logo... Center: Nav...". 
                  To truly center the nav, we might need absolute positioning or flex-1 tricks. Let's do absolute for perfect center. */}
              <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                <nav className="flex items-center gap-8 liquid-glass rounded-[28px] px-[52px] py-[24px]">
                  {['Homepage', 'Gallery', 'Buy NFT', 'FAQ', 'Contact'].map((item) => (
                    <a key={item} href="#" className="font-grotesk text-[13px] uppercase hover:text-neon transition-colors">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              
              <div className="w-10 lg:hidden"></div> {/* Spacer for mobile */}
            </header>

            {/* Hero Content */}
            <div className="flex-1 flex flex-col justify-center relative mt-20 lg:mt-0">
              <div className="relative max-w-[780px] lg:ml-32 w-full mx-auto lg:mx-0">
                <h1 className="font-grotesk text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] uppercase leading-[1.05] md:leading-[1]">
                  Beyond earth <br />
                  and ( its ) <br />
                  familiar boundaries
                </h1>
                <span className="font-condiment text-neon text-[24px] sm:text-[36px] md:text-[48px] absolute right-0 bottom-full translate-y-8 -rotate-1 mix-blend-exclusion opacity-90 lowercase pointer-events-none">
                  Nft collection
                </span>
              </div>
            </div>

            {/* Social Icons Desktop */}
            <div className="hidden lg:flex flex-col gap-3 absolute top-8 right-8">
              {[Mail, Twitter, Github].map((Icon, i) => (
                <button key={i} className="w-[56px] h-[56px] liquid-glass rounded-[1rem] flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon size={20} />
                </button>
              ))}
            </div>

            {/* Social Icons Mobile */}
            <div className="flex lg:hidden justify-center gap-3 mt-12 mb-4">
              {[Mail, Twitter, Github].map((Icon, i) => (
                <button key={i} className="w-[56px] h-[56px] liquid-glass rounded-[1rem] flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon size={20} />
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 2: ABOUT / INTRO */}
        <section className="relative min-h-[100svh] w-full flex flex-col py-16 md:py-24 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4" type="video/mp4" />
          </video>
          
          <div className="relative z-10 flex-1 flex flex-col justify-between px-5 md:px-12 lg:px-24 h-full">
            
            {/* Top Row */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 lg:gap-8 w-full mt-12 lg:mt-0">
              <div className="relative">
                <h2 className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">
                  Hello!<br />
                  I'm orbis
                </h2>
                <span className="font-condiment text-neon text-[36px] sm:text-[52px] lg:text-[68px] absolute right-0 bottom-0 translate-x-1/2 translate-y-1/4 -rotate-2 mix-blend-exclusion lowercase">
                  Orbis
                </span>
              </div>
              <p className="font-mono text-[14px] md:text-[16px] uppercase max-w-[266px] leading-relaxed">
                A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-row justify-between w-full mt-32 lg:mt-auto">
              <div className="flex flex-col gap-8 w-full max-w-[266px]">
                <p className="font-mono text-[14px] md:text-[16px] uppercase leading-relaxed text-[#010828] lg:text-cream/10">
                  A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
                </p>
                <p className="font-mono text-[14px] md:text-[16px] uppercase leading-relaxed text-[#010828] lg:text-cream/10">
                  A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
                </p>
              </div>
              <div className="hidden lg:flex flex-col gap-8 w-full max-w-[266px]">
                <p className="font-mono text-[14px] md:text-[16px] uppercase leading-relaxed text-cream/10">
                  A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
                </p>
                <p className="font-mono text-[14px] md:text-[16px] uppercase leading-relaxed text-cream/10">
                  A digital object fixed beyond time and place. An exploration of distance, form, and silence in space
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: NFT COLLECTION GRID */}
        <section className="bg-orbis-bg w-full py-20 lg:py-32 px-5 md:px-12 lg:px-24">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-8 mb-16 lg:mb-24">
            <div>
              <h2 className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">
                Collection of<br />
                <span className="inline-block ml-12 md:ml-24 lg:ml-32">
                  <span className="font-condiment text-neon lowercase pr-4">Space</span>
                  objects
                </span>
              </h2>
            </div>
            
            <button className="group relative flex flex-col items-start hover:opacity-80 transition-opacity">
              <div className="flex items-end gap-3 mb-2">
                <span className="font-grotesk text-[32px] sm:text-[48px] lg:text-[60px] uppercase leading-none">SEE</span>
                <div className="flex flex-col">
                  <span className="font-grotesk text-[20px] sm:text-[28px] lg:text-[36px] uppercase leading-none">ALL</span>
                  <span className="font-grotesk text-[20px] sm:text-[28px] lg:text-[36px] uppercase leading-none">CREATORS</span>
                </div>
              </div>
              <div className="w-full h-[6px] lg:h-[10px] bg-neon group-hover:scale-y-110 transition-transform origin-left"></div>
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {[
              {
                url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_053923_22c0a6a5-313c-474c-85ff-3b50d25e944a.mp4",
                score: "8.7/10"
              },
              {
                url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_054411_511c1b7a-fb2f-42ef-bf6c-32c0b1a06e79.mp4",
                score: "9/10"
              },
              {
                url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055427_ac7035b5-9f3b-4289-86fc-941b2432317d.mp4",
                score: "8.2/10"
              }
            ].map((nft, idx) => (
              <div key={idx} className="liquid-glass rounded-[32px] p-[18px] hover:bg-white/10 transition-colors group">
                <div className="w-full relative pb-[100%] rounded-[24px] overflow-hidden mb-[-24px]">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src={nft.url} type="video/mp4" />
                  </video>
                </div>
                
                {/* Overlay Bar */}
                <div className="relative z-10 liquid-glass rounded-[20px] px-5 py-4 flex justify-between items-center mt-[-10px] bg-orbis-bg/20 backdrop-blur-md border border-white/5 mx-2 mb-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-cream/70 uppercase tracking-widest mb-1">Rarity Score:</span>
                    <span className="font-grotesk text-[16px] tracking-widest">{nft.score}</span>
                  </div>
                  <button className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#b724ff] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/50 hover:scale-110 transition-transform">
                    <ChevronRight size={24} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </section>

        {/* SECTION 4: CTA / FINAL SECTION */}
        <section className="relative w-full overflow-hidden bg-orbis-bg">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-auto block"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 flex items-center justify-end px-5 md:px-12 lg:pr-[20%] lg:pl-[15%]">
            <div className="relative text-right max-w-[600px] w-full flex flex-col items-end">
              <span className="font-condiment text-neon text-[17px] sm:text-[34px] lg:text-[68px] absolute -top-4 sm:-top-8 lg:-top-16 left-0 lg:-left-12 -rotate-2 mix-blend-exclusion lowercase">
                Go beyond
              </span>
              
              <h2 className="font-grotesk text-[16px] sm:text-[32px] md:text-[44px] lg:text-[60px] uppercase leading-[1.1] text-right">
                <span className="block mb-4 sm:mb-8 lg:mb-12">JOIN US.</span>
                <span className="block">REVEAL WHAT'S HIDDEN.</span>
                <span className="block">DEFINE WHAT'S NEXT.</span>
                <span className="block text-neon">FOLLOW THE SIGNAL.</span>
              </h2>
            </div>
          </div>

          {/* Social Icons Bottom-Left */}
          <div className="absolute left-[8%] bottom-[12%] lg:bottom-[20%]">
            <div className="liquid-glass rounded-[0.5rem] lg:rounded-[1.25rem] flex flex-col items-center">
              {[Mail, Twitter, Github].map((Icon, i) => (
                <button 
                  key={i} 
                  className={`
                    w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem]
                    h-[14vw] sm:h-[4rem] lg:h-[5.5rem]
                    flex items-center justify-center hover:bg-white/10 transition-colors
                    ${i !== 2 ? 'border-b border-white/10' : ''}
                  `}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
                </button>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
