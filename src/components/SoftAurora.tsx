import { useEffect, useRef } from 'react';

interface SoftAuroraProps {
  color1?: string;
  color2?: string;
  speed?: number;
  brightness?: number;
  [key: string]: any; // Accept the other ReactBits props to prevent errors, even if we use a highly optimized 2D fallback
}

export default function SoftAurora({
  color1 = '#ffffff',
  color2 = '#e100ff',
  speed = 0.35,
  brightness = 0.55,
}: SoftAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let isVisible = true;

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      animationFrameId = requestAnimationFrame(draw);
      if (!isVisible) return;

      time += speed * 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a smooth, atmospheric aurora using composite gradients
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Primary color blob moving smoothly
      const x1 = cx + Math.sin(time) * (canvas.width * 0.3);
      const y1 = cy + Math.cos(time * 0.8) * (canvas.height * 0.2);
      const r1 = Math.max(canvas.width, canvas.height) * 0.8;

      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, r1);
      
      // Apply brightness factor to alpha
      const alpha = Math.min(Math.max(brightness, 0.1), 1.0);
      
      // Helper to convert hex to rgba for blending
      const hexToRgba = (hex: string, a: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      };

      grad1.addColorStop(0, hexToRgba(color1, alpha * 0.15));
      grad1.addColorStop(1, 'rgba(5, 5, 5, 0)');

      // Secondary color blob (Magenta/Purple)
      const x2 = cx + Math.cos(time * 1.2) * (canvas.width * 0.4);
      const y2 = cy + Math.sin(time * 0.9) * (canvas.height * 0.3);
      const r2 = Math.max(canvas.width, canvas.height) * 0.9;

      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, r2);
      grad2.addColorStop(0, hexToRgba(color2, alpha * 0.2));
      grad2.addColorStop(1, 'rgba(5, 5, 5, 0)');

      // Draw composite
      ctx.globalCompositeOperation = 'screen';
      
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'source-over';
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [color1, color2, speed, brightness]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 blur-3xl"
        style={{ transform: 'scale(1.2)' }} // Prevents edge bleed from heavy blur
      />
      {/* Dark vignette to blend perfectly into other sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
    </div>
  );
}
