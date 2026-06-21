import React from 'react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export default function MobileDeviceFrame({ children }: MobileDeviceFrameProps) {
  return (
    <div className="relative w-full aspect-[9/19.5] mx-auto rounded-[36px] bg-black p-[6px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] ring-1 ring-white/10 flex-shrink-0">
      {/* Outer frame styling for metal edge look */}
      <div className="absolute inset-0 rounded-[36px] border border-white/5 pointer-events-none" />
      
      {/* Screen container */}
      <div className="relative w-full h-full bg-[#050505] rounded-[30px] overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[30%] h-[24px] bg-black rounded-full z-[100] flex items-center justify-between px-3">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" /> {/* Camera lens reflection */}
        </div>

        {/* Dynamic Highlight / Glass reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-50 mix-blend-overlay" />
        
        {/* Inner Content */}
        <div className="w-full h-full relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
