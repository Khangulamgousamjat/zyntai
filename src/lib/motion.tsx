import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_SWING = [0.16, 1, 0.3, 1] as const;

/* Scroll-reveal wrapper */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE as unknown as number[] }}
    >
      {children}
    </motion.div>
  );
}

/* Stagger container */
export function Stagger({
  children,
  className,
  step = 0.09,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "hidden" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : step, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE as unknown as number[] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* Animated counter */
export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Section heading block */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  tail,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  tail?: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber-300`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.04] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.4rem]">
          {title}{" "}
          {accent && <em className="font-accent font-normal italic text-amber-300">{accent}</em>}
          {tail && <> {tail}</>}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-lg leading-relaxed text-zinc-400 ${centered ? "mx-auto max-w-xl" : "max-w-xl"}`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* Magnetic wrapper — the element leans toward the cursor (fine pointers) */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 15, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 160, damping: 15, mass: 0.35 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, [reduce]);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* Clamp a MotionValue to 0..1 */
export function clamp01(v: MotionValue<number>) {
  const out = useMotionValue(0);
  useEffect(() => {
    const unsub = v.on("change", (latest) => out.set(Math.min(1, Math.max(0, latest))));
    unsub();
    out.set(Math.min(1, Math.max(0, v.get())));
  }, [v, out]);
  return out;
}
