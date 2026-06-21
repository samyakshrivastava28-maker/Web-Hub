import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isMobileRef = useRef(false);

  const initNodes = useCallback((w: number, h: number) => {
    isMobileRef.current = w < 768;
    const count = isMobileRef.current ? 25 : 55;
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
      });
    }
    nodesRef.current = nodes;
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId: number;

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
      initNodes(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();

    const connectionDist = () => isMobileRef.current ? 120 : 180;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;
      frameRef.current++;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const nodes = nodesRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const dist = connectionDist();

      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const alpha = (p.life / p.maxLife) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 160, 255, ${alpha})`;
        ctx.fill();
      }

      // Emit ambient particles occasionally
      if (!isMobileRef.current && frameRef.current % 3 === 0 && particles.length < 60) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -Math.random() * 0.5 - 0.1,
          life: 80 + Math.random() * 60,
          maxLife: 80 + Math.random() * 60,
          size: Math.random() * 1.5 + 0.5,
        });
      }

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 250) {
            const force = (250 - d) / 250 * 0.008;
            node.vx += dx * force;
            node.vy += dy * force;
          }
        }

        // Speed damping
        node.vx *= 0.995;
        node.vy *= 0.995;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < dist) {
            const alpha = (1 - d / dist) * 0.25;
            // Animated data pulse along connections
            const pulsePos = (Math.sin(frameRef.current * 0.02 + i * 0.5) + 1) / 2;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(100, 140, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Data pulse dot
            if (!isMobileRef.current && alpha > 0.1) {
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(150, 180, 255, ${alpha * 2})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes with glow
      for (const node of nodes) {
        const pulseAlpha = 0.5 + Math.sin(node.pulse) * 0.3;
        const glowSize = Math.max(0.1, node.radius + Math.sin(node.pulse) * 2);

        // Outer glow
        if (!isMobileRef.current) {
          const grad = ctx.createRadialGradient(
            node.x, node.y, 0, node.x, node.y, glowSize * 8
          );
          grad.addColorStop(0, `rgba(100, 150, 255, ${pulseAlpha * 0.15})`);
          grad.addColorStop(1, 'rgba(100, 150, 255, 0)');
          ctx.fillStyle = grad;
          ctx.fillRect(node.x - glowSize * 8, node.y - glowSize * 8, glowSize * 16, glowSize * 16);
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 170, 255, ${pulseAlpha})`;
        ctx.fill();
      }

      // Mouse glow
      if (mouse.active && !isMobileRef.current) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        grad.addColorStop(0, 'rgba(80, 120, 255, 0.06)');
        grad.addColorStop(1, 'rgba(80, 120, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 200, mouse.y - 200, 400, 400);
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
