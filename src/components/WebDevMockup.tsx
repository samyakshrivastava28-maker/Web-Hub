import React from 'react';

export default function WebDevMockup() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black rounded-[inherit] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
      <iframe
        title="Veldara Mockup"
        src="/mockup.html"
        className="w-full h-full border-none pointer-events-auto"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
