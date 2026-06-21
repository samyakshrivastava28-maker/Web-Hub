import { useEffect, useRef, useCallback } from 'react';

interface GeoShape {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotSpeedX: number;
  rotSpeedY: number;
  size: number;
  type: 'cube' | 'octahedron' | 'diamond';
  vy: number;
  hue: number;
  opacity: number;
}

interface LightBeam {
  x: number;
  angle: number;
  width: number;
  speed: number;
  hue: number;
  opacity: number;
}

interface GrowthParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function GeometricGrowthBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<GeoShape[]>([]);
  const beamsRef = useRef<LightBeam[]>([]);
  const particlesRef = useRef<GrowthParticle[]>([]);
  const frameRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isMobileRef = useRef(false);

  const project = (x: number, y: number, z: number, cx: number, cy: number): [number, number, number] => {
    const perspective = 600;
    const scale = perspective / (perspective + z);
    return [cx + x * scale, cy + y * scale, scale];
  };

  const initShapes = useCallback((w: number, h: number) => {
    isMobileRef.current = w < 768;
    const count = isMobileRef.current ? 6 : 12;
    const shapes: GeoShape[] = [];
    for (let i = 0; i < count; i++) {
      shapes.push({
        x: (Math.random() - 0.5) * w * 0.8,
        y: (Math.random() - 0.5) * h * 1.5,
        z: Math.random() * 400 + 100,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        size: 15 + Math.random() * 30,
        type: (['cube', 'octahedron', 'diamond'] as const)[Math.floor(Math.random() * 3)],
        vy: -0.15 - Math.random() * 0.3,
        hue: 160 + Math.random() * 60, // Teal to emerald
        opacity: 0.2 + Math.random() * 0.3,
      });
    }
    shapesRef.current = shapes;

    // Light beams
    const beamCount = isMobileRef.current ? 2 : 4;
    const beams: LightBeam[] = [];
    for (let i = 0; i < beamCount; i++) {
      beams.push({
        x: Math.random() * w,
        angle: -0.3 + Math.random() * 0.6,
        width: 40 + Math.random() * 80,
        speed: 0.2 + Math.random() * 0.4,
        hue: 170 + Math.random() * 50,
        opacity: 0.02 + Math.random() * 0.03,
      });
    }
    beamsRef.current = beams;
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
      initShapes(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', resize);
    resize();

    const drawShape = (shape: GeoShape, cx: number, cy: number) => {
      const cosX = Math.cos(shape.rotX);
      const sinX = Math.sin(shape.rotX);
      const cosY = Math.cos(shape.rotY);
      const sinY = Math.sin(shape.rotY);
      const s = shape.size;

      let vertices: [number, number, number][];

      if (shape.type === 'cube') {
        const raw: [number, number, number][] = [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
        ];
        vertices = raw.map(([x, y, z]) => {
          let ny = y * cosX - z * sinX;
          let nz = y * sinX + z * cosX;
          let nx = x * cosY - nz * sinY;
          nz = x * sinY + nz * cosY;
          return project(nx + shape.x, ny + shape.y, nz + shape.z, cx, cy);
        });
        const edges = [
          [0,1],[1,2],[2,3],[3,0],
          [4,5],[5,6],[6,7],[7,4],
          [0,4],[1,5],[2,6],[3,7],
        ];
        ctx.strokeStyle = `hsla(${shape.hue}, 70%, 65%, ${shape.opacity})`;
        ctx.lineWidth = 0.8;
        edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(vertices[a][0], vertices[a][1]);
          ctx.lineTo(vertices[b][0], vertices[b][1]);
          ctx.stroke();
        });
      } else if (shape.type === 'octahedron') {
        const raw: [number, number, number][] = [
          [0, -s, 0], [s, 0, 0], [0, 0, s],
          [-s, 0, 0], [0, 0, -s], [0, s, 0],
        ];
        vertices = raw.map(([x, y, z]) => {
          let ny = y * cosX - z * sinX;
          let nz = y * sinX + z * cosX;
          let nx = x * cosY - nz * sinY;
          nz = x * sinY + nz * cosY;
          return project(nx + shape.x, ny + shape.y, nz + shape.z, cx, cy);
        });
        const edges = [
          [0,1],[0,2],[0,3],[0,4],
          [5,1],[5,2],[5,3],[5,4],
          [1,2],[2,3],[3,4],[4,1],
        ];
        ctx.strokeStyle = `hsla(${shape.hue}, 70%, 65%, ${shape.opacity})`;
        ctx.lineWidth = 0.8;
        edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(vertices[a][0], vertices[a][1]);
          ctx.lineTo(vertices[b][0], vertices[b][1]);
          ctx.stroke();
        });
      } else {
        // Diamond - elongated octahedron
        const raw: [number, number, number][] = [
          [0, -s * 1.5, 0], [s * 0.7, 0, 0], [0, 0, s * 0.7],
          [-s * 0.7, 0, 0], [0, 0, -s * 0.7], [0, s * 0.6, 0],
        ];
        vertices = raw.map(([x, y, z]) => {
          let ny = y * cosX - z * sinX;
          let nz = y * sinX + z * cosX;
          let nx = x * cosY - nz * sinY;
          nz = x * sinY + nz * cosY;
          return project(nx + shape.x, ny + shape.y, nz + shape.z, cx, cy);
        });
        const edges = [
          [0,1],[0,2],[0,3],[0,4],
          [5,1],[5,2],[5,3],[5,4],
          [1,2],[2,3],[3,4],[4,1],
        ];
        ctx.strokeStyle = `hsla(${shape.hue}, 80%, 70%, ${shape.opacity * 1.2})`;
        ctx.lineWidth = 0.8;
        edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(vertices[a][0], vertices[a][1]);
          ctx.lineTo(vertices[b][0], vertices[b][1]);
          ctx.stroke();
        });
      }

      // Vertex glow dots
      for (const [vx, vy, sc] of vertices) {
        if (!isNaN(vx) && !isNaN(vy) && !isNaN(sc) && sc > 0) {
          ctx.beginPath();
          ctx.arc(vx, vy, Math.max(0.1, sc * 2), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${shape.hue}, 70%, 75%, ${shape.opacity * 0.7})`;
          ctx.fill();
        }
      }
    };

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;
      frameRef.current++;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);

      // Draw light beams
      for (const beam of beamsRef.current) {
        beam.x += beam.speed;
        if (beam.x > w + beam.width) beam.x = -beam.width;

        const grad = ctx.createLinearGradient(beam.x, 0, beam.x + beam.width, h);
        grad.addColorStop(0, `hsla(${beam.hue}, 60%, 60%, 0)`);
        grad.addColorStop(0.3, `hsla(${beam.hue}, 60%, 60%, ${beam.opacity})`);
        grad.addColorStop(0.7, `hsla(${beam.hue}, 60%, 60%, ${beam.opacity})`);
        grad.addColorStop(1, `hsla(${beam.hue}, 60%, 60%, 0)`);

        ctx.save();
        ctx.translate(beam.x, 0);
        ctx.rotate(beam.angle);
        ctx.fillStyle = grad;
        ctx.fillRect(-beam.width, -h * 0.3, beam.width * 2, h * 1.6);
        ctx.restore();
      }

      // Update & draw shapes
      for (const shape of shapesRef.current) {
        shape.rotX += shape.rotSpeedX;
        shape.rotY += shape.rotSpeedY;
        shape.y += shape.vy;

        // Reset when off screen
        if (shape.y < -h * 0.8) {
          shape.y = h * 0.8;
          shape.x = (Math.random() - 0.5) * w * 0.8;
        }

        drawShape(shape, cx, cy);
      }

      // Emit growth particles
      if (frameRef.current % 4 === 0 && particles.length < (isMobileRef.current ? 20 : 45)) {
        particles.push({
          x: Math.random() * w,
          y: h + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.8 - Math.random() * 1.2,
          life: 100 + Math.random() * 80,
          maxLife: 100 + Math.random() * 80,
          size: 1 + Math.random() * 2,
          hue: 150 + Math.random() * 70,
        });
      }

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.998;
        p.life--;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const alpha = (p.life / p.maxLife) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${alpha})`;
        ctx.fill();
      }

      // Ambient depth glow at bottom
      const bottomGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
      bottomGrad.addColorStop(0, 'rgba(0, 200, 150, 0)');
      bottomGrad.addColorStop(1, 'rgba(0, 200, 150, 0.02)');
      ctx.fillStyle = bottomGrad;
      ctx.fillRect(0, h * 0.6, w, h * 0.4);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [initShapes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
