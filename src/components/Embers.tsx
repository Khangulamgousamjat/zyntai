import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  phase: number;
  hue: number;
};

export default function Embers({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let embers: Ember[] = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(24, Math.floor(w / 50));
      embers = Array.from({ length: count }, () => spawn(true));
    };

    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * (w || 800),
      y: anywhere ? Math.random() * (h || 600) : (h || 600) + 12,
      r: 0.8 + Math.random() * 1.8,
      vy: 0.18 + Math.random() * 0.45,
      vx: -0.1 + Math.random() * 0.2,
      a: 0.08 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
      hue: 255 + Math.random() * 20,
    });

    let isVisible = true;
    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    obs.observe(canvas);

    let t = 0;
    const loop = () => {
      if (isVisible) {
        t += 0.016;
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < embers.length; i++) {
          const e = embers[i];
          e.y -= e.vy;
          e.x += e.vx + Math.sin(t * 1.4 + e.phase) * 0.18;
          if (e.y < -14 || e.x < -14 || e.x > w + 14) embers[i] = spawn(false);
          const flicker = 0.65 + Math.sin(t * 3 + e.phase) * 0.35;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${e.hue}, 96%, 60%, ${e.a * flicker})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(loop);
    };

    resize();
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  if (reduce) return null;
  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
