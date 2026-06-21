import { useEffect, useRef, useCallback } from 'react';

interface GridLine {
  position: number;
  opacity: number;
  isHorizontal: boolean;
}

interface DataStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  hue: number;
  opacity: number;
  isVertical: boolean;
}

interface AmbientOrb {
  x: number;
  y: number;
  size: number;
  hue: number;
  speed: number;
  phase: number;
}

export default function MissionControlBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const isMobileRef = useRef(false);
  const streamsRef = useRef<DataStream[]>([]);
  const orbsRef = useRef<AmbientOrb[]>([]);

  const initElements = useCallback((w: number, h: number) => {
    isMobileRef.current = w < 768;

    // Data streams
    const streamCount = isMobileRef.current ? 8 : 18;
    const streams: DataStream[] = [];
    for (let i = 0; i < streamCount; i++) {
      const isVertical = Math.random() > 0.3;
      streams.push({
        x: isVertical ? Math.random() * w : -50,
        y: isVertical ? -50 : Math.random() * h,
        speed: 0.5 + Math.random() * 1.5,
        length: 30 + Math.random() * 80,
        hue: 210 + Math.random() * 30,
        opacity: 0.1 + Math.random() * 0.2,
        isVertical,
      });
    }
    streamsRef.current = streams;

    // Ambient orbs
    const orbCount = isMobileRef.current ? 2 : 4;
    const orbs: AmbientOrb[] = [];
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 100 + Math.random() * 200,
        hue: 200 + Math.random() * 40,
        speed: 0.001 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2,
      });
    }
    orbsRef.current = orbs;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;
    let time = 0;

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(canvas);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      initElements(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;
      time++;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Draw interactive grid
      const gridSpacing = isMobileRef.current ? 60 : 40;
      const gridPulse = Math.sin(time * 0.005) * 0.3 + 0.7;

      ctx.strokeStyle = `rgba(100, 160, 220, ${0.04 * gridPulse})`;
      ctx.lineWidth = 0.5;

      // Vertical grid lines
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Animated grid highlight pulses
      if (!isMobileRef.current) {
        const highlightX = ((time * 0.5) % (w + 400)) - 200;
        const highlightY = ((time * 0.3) % (h + 400)) - 200;

        // Horizontal highlight sweep
        const hGrad = ctx.createLinearGradient(highlightX - 200, 0, highlightX + 200, 0);
        hGrad.addColorStop(0, 'rgba(80, 140, 220, 0)');
        hGrad.addColorStop(0.5, 'rgba(80, 140, 220, 0.06)');
        hGrad.addColorStop(1, 'rgba(80, 140, 220, 0)');

        for (let y = 0; y < h; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(Math.max(0, highlightX - 200), y);
          ctx.lineTo(Math.min(w, highlightX + 200), y);
          ctx.strokeStyle = hGrad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Vertical highlight sweep
        const vGrad = ctx.createLinearGradient(0, highlightY - 200, 0, highlightY + 200);
        vGrad.addColorStop(0, 'rgba(80, 140, 220, 0)');
        vGrad.addColorStop(0.5, 'rgba(80, 140, 220, 0.06)');
        vGrad.addColorStop(1, 'rgba(80, 140, 220, 0)');

        for (let x = 0; x < w; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, Math.max(0, highlightY - 200));
          ctx.lineTo(x, Math.min(h, highlightY + 200));
          ctx.strokeStyle = vGrad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Grid intersection dots
        for (let x = 0; x < w; x += gridSpacing) {
          for (let y = 0; y < h; y += gridSpacing) {
            const distToHighlightH = Math.abs(x - highlightX);
            const distToHighlightV = Math.abs(y - highlightY);
            const dotAlpha = Math.max(
              distToHighlightH < 200 ? (1 - distToHighlightH / 200) * 0.3 : 0,
              distToHighlightV < 200 ? (1 - distToHighlightV / 200) * 0.3 : 0
            );
            if (dotAlpha > 0.02) {
              ctx.beginPath();
              ctx.arc(x, y, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(100, 170, 255, ${dotAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      // Data flow streams
      for (const stream of streamsRef.current) {
        if (stream.isVertical) {
          stream.y += stream.speed;
          if (stream.y > h + stream.length) {
            stream.y = -stream.length;
            stream.x = Math.random() * w;
          }

          const grad = ctx.createLinearGradient(stream.x, stream.y - stream.length, stream.x, stream.y);
          grad.addColorStop(0, `hsla(${stream.hue}, 60%, 60%, 0)`);
          grad.addColorStop(1, `hsla(${stream.hue}, 60%, 60%, ${stream.opacity})`);
          ctx.beginPath();
          ctx.moveTo(stream.x, stream.y - stream.length);
          ctx.lineTo(stream.x, stream.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Head glow
          ctx.beginPath();
          ctx.arc(stream.x, stream.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${stream.hue}, 70%, 70%, ${stream.opacity * 2})`;
          ctx.fill();
        } else {
          stream.x += stream.speed;
          if (stream.x > w + stream.length) {
            stream.x = -stream.length;
            stream.y = Math.random() * h;
          }

          const grad = ctx.createLinearGradient(stream.x - stream.length, stream.y, stream.x, stream.y);
          grad.addColorStop(0, `hsla(${stream.hue}, 60%, 60%, 0)`);
          grad.addColorStop(1, `hsla(${stream.hue}, 60%, 60%, ${stream.opacity})`);
          ctx.beginPath();
          ctx.moveTo(stream.x - stream.length, stream.y);
          ctx.lineTo(stream.x, stream.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(stream.x, stream.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${stream.hue}, 70%, 70%, ${stream.opacity * 2})`;
          ctx.fill();
        }
      }

      // Ambient lighting orbs
      for (const orb of orbsRef.current) {
        orb.phase += orb.speed;
        const ox = orb.x + Math.sin(orb.phase) * 50;
        const oy = orb.y + Math.cos(orb.phase * 0.7) * 30;
        const pulse = 0.5 + Math.sin(orb.phase * 2) * 0.3;

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size);
        grad.addColorStop(0, `hsla(${orb.hue}, 50%, 50%, ${0.04 * pulse})`);
        grad.addColorStop(0.5, `hsla(${orb.hue}, 40%, 40%, ${0.02 * pulse})`);
        grad.addColorStop(1, `hsla(${orb.hue}, 30%, 30%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(ox - orb.size, oy - orb.size, orb.size * 2, orb.size * 2);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [initElements]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
