import { useEffect, useRef } from 'react';

interface AuroraWave {
  offset: number;
  speed: number;
  amplitude: number;
  wavelength: number;
  hue: number;
  opacity: number;
  yBase: number;
}

interface GlowPath {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  hue: number;
}

export default function SecureRecoveryBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(true);
  const isMobileRef = useRef(false);
  const wavesRef = useRef<AuroraWave[]>([]);
  const pathsRef = useRef<GlowPath[]>([]);

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

    const initWaves = (w: number, h: number) => {
      isMobileRef.current = w < 768;
      const waveCount = isMobileRef.current ? 3 : 5;
      const waves: AuroraWave[] = [];
      for (let i = 0; i < waveCount; i++) {
        waves.push({
          offset: Math.random() * Math.PI * 2,
          speed: 0.003 + Math.random() * 0.004,
          amplitude: 30 + Math.random() * 50,
          wavelength: 200 + Math.random() * 300,
          hue: 35 + Math.random() * 25, // Warm amber-gold
          opacity: 0.03 + Math.random() * 0.04,
          yBase: h * (0.3 + (i / waveCount) * 0.4),
        });
      }
      wavesRef.current = waves;

      // Glowing security paths
      const pathCount = isMobileRef.current ? 3 : 6;
      const paths: GlowPath[] = [];
      for (let i = 0; i < pathCount; i++) {
        const px = Math.random() * w;
        const py = Math.random() * h;
        paths.push({
          x: px, y: py,
          targetX: Math.random() * w,
          targetY: Math.random() * h,
          speed: 0.003 + Math.random() * 0.005,
          size: 60 + Math.random() * 120,
          hue: 30 + Math.random() * 30,
        });
      }
      pathsRef.current = paths;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      initWaves(window.innerWidth, window.innerHeight);
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

      // Draw aurora waves
      for (const wave of wavesRef.current) {
        wave.offset += wave.speed;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 4) {
          const y = wave.yBase +
            Math.sin((x / wave.wavelength) + wave.offset) * wave.amplitude +
            Math.sin((x / (wave.wavelength * 1.5)) + wave.offset * 0.7) * (wave.amplitude * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Complete the shape to fill below the wave
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wave.yBase - wave.amplitude, 0, wave.yBase + wave.amplitude * 3);
        grad.addColorStop(0, `hsla(${wave.hue}, 70%, 60%, ${wave.opacity * 1.5})`);
        grad.addColorStop(0.5, `hsla(${wave.hue}, 60%, 50%, ${wave.opacity})`);
        grad.addColorStop(1, `hsla(${wave.hue}, 50%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle wave stroke
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const y = wave.yBase +
            Math.sin((x / wave.wavelength) + wave.offset) * wave.amplitude +
            Math.sin((x / (wave.wavelength * 1.5)) + wave.offset * 0.7) * (wave.amplitude * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `hsla(${wave.hue}, 80%, 70%, ${wave.opacity * 0.8})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Glowing paths — slow-moving security-inspired orbs
      for (const path of pathsRef.current) {
        // Drift toward target
        path.x += (path.targetX - path.x) * path.speed;
        path.y += (path.targetY - path.y) * path.speed;

        // Pick new target when close
        const dx = path.targetX - path.x;
        const dy = path.targetY - path.y;
        if (Math.sqrt(dx * dx + dy * dy) < 10) {
          path.targetX = Math.random() * w;
          path.targetY = Math.random() * h;
        }

        const grad = ctx.createRadialGradient(path.x, path.y, 0, path.x, path.y, path.size);
        const pulse = 0.5 + Math.sin(time * 0.008 + path.x * 0.01) * 0.3;
        grad.addColorStop(0, `hsla(${path.hue}, 50%, 60%, ${0.06 * pulse})`);
        grad.addColorStop(0.5, `hsla(${path.hue}, 40%, 50%, ${0.02 * pulse})`);
        grad.addColorStop(1, `hsla(${path.hue}, 30%, 40%, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(path.x - path.size, path.y - path.size, path.size * 2, path.size * 2);
      }

      // Subtle shield/lock icon hint — concentric circles at center
      if (!isMobileRef.current) {
        const cx = w / 2;
        const cy = h * 0.45;
        const pulse = Math.sin(time * 0.01) * 0.5 + 0.5;

        for (let i = 3; i > 0; i--) {
          const r = 80 + i * 40 + pulse * 10;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(40, 50%, 60%, ${0.015 * (4 - i)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
