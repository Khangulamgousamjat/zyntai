import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { STEPS } from "../lib/data";
import { EASE_SWING, Reveal } from "../lib/motion";
import { IconLink, IconFlow, IconMenu } from "../lib/icons";

const STEP_ICONS = [IconMenu, IconLink, IconFlow];
const STEP_SHORT = ["Connect", "Share", "Grow"];
const STEP_TAIL = ["your catalog", "your link", "automatically"];

function StepCard({ s, i }: { s: (typeof STEPS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const dir = i % 2 === 0 ? -1 : 1;

  /* entrance — card swings in as its wrapper approaches the viewport centre */
  const enter = useScroll({ target: ref, offset: ["start 0.92", "start 0.5"] });
  const rotateY = useTransform(enter.scrollYProgress, [0, 1], [reduce ? 0 : 26 * dir, 0]);
  const y = useTransform(enter.scrollYProgress, [0, 1], [reduce ? 0 : 70, 0]);
  const opacity = useTransform(enter.scrollYProgress, [0, 0.45, 1], [reduce ? 1 : 0, 1, 1]);

  /* exit — card recedes gently as the next one slides over it */
  const exit = useScroll({ target: ref, offset: ["start 0.15", "end 0.55"] });
  const scale = useTransform(exit.scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);
  const dim = useTransform(exit.scrollYProgress, [0, 1], [1, reduce ? 1 : 0.55]);

  const Icon = STEP_ICONS[i];

  return (
    <div ref={ref} className="lg:h-[108vh] last:lg:h-auto">
      <motion.div
        style={{
          rotateY,
          y,
          opacity,
          scale,
          transformPerspective: 1300,
          zIndex: i + 1,
        }}
        className="group surface-solid backface-hidden relative overflow-hidden rounded-[1.25rem] p-8 transition-[border-color,box-shadow] duration-500 will-change-transform hover:border-amber-400/40 hover:shadow-[0_30px_90px_-30px_rgba(245,158,11,0.4)] lg:sticky lg:top-[26vh] sm:p-10"
      >
        <span
          aria-hidden
          className="font-accent pointer-events-none absolute -top-8 right-5 select-none text-[8rem] italic leading-none text-amber-400/[0.09] transition-colors duration-700 group-hover:text-amber-400/[0.16]"
        >
          {s.n}
        </span>
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-amber-400/[0.07] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative flex items-center gap-4">
          <span className="grid h-13 w-13 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 p-3.5 text-(--zy-amber-ink) shadow-[0_0_28px_rgba(245,158,11,0.35)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.28em] text-amber-300/80">
              Step {s.n}
            </p>
            <h3 className="font-display mt-1 text-2xl font-bold tracking-tight text-zinc-50 sm:text-[1.65rem]">
              {s.title}
            </h3>
          </div>
        </div>

        <p className="relative mt-5 max-w-lg text-[1.02rem] leading-relaxed text-zinc-400">
          {s.desc}
        </p>

        <div className="relative mt-7 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.06] px-4 py-2 font-mono text-[0.76rem] font-medium tracking-wide text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
            {s.chip}
          </span>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-white/12 to-transparent sm:block" />
        </div>

        <motion.span aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 hidden" />
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const colRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: colRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(2, Math.max(0, Math.floor(v * 3.001)));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const jumpTo = (i: number) => {
    document
      .querySelectorAll("[data-step-card]")
      [i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="how" className="relative overflow-hidden py-28 sm:py-36">
      <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(65%_55%_at_60%_45%,black,transparent)]" />
      <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-orange-500/[0.08] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* sticky rail column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.08] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
                How it works
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.04] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.3rem]">
                Live before your <em className="font-accent font-normal italic text-amber-300">next</em> launch.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-400">
                No developers, no hardware, no six-week onboarding. Three moves between you and your
                first order.
              </p>
            </Reveal>

            {/* progress rail (desktop) */}
            <div className="relative mt-12 hidden lg:block">
              <div className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-white/[0.1]" />
              <motion.div
                style={{ scaleY: reduce ? 1 : fill, transformOrigin: "top" }}
                className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-gradient-to-b from-amber-300 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]"
              />
              <div className="space-y-9">
                {STEP_SHORT.map((label, i) => (
                  <motion.button
                    key={label}
                    onClick={() => jumpTo(i)}
                    className="relative flex w-full items-center gap-5 text-left"
                    animate={{ x: active === i ? 6 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_SWING as unknown as number[] }}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-[0.8rem] font-bold transition-all duration-500 ${
                        active === i
                          ? "border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.4)]"
                          : "border-white/10 bg-char-950 text-zinc-600"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-lg font-semibold transition-colors duration-500 ${
                        active === i ? "text-zinc-50" : "text-zinc-600"
                      }`}
                    >
                      {label}
                      <span className="ml-3 text-[0.78rem] font-normal text-zinc-600">
                        {STEP_TAIL[i]}
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            <Reveal delay={0.24} className="mt-12">
              <a href="#cta" className="btn btn-ghost px-7 py-3.5">
                Set up in under 15 minutes
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>

          {/* stacked sticky 3D cards */}
          <div ref={colRef} className="persp flex flex-col gap-8 sm:gap-10 lg:gap-0">
            {STEPS.map((s, i) => (
              <div key={s.n} data-step-card>
                <StepCard s={s} i={i} />
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass rounded-[1.25rem] border-dashed p-7 text-center sm:p-8"
            >
              <p className="font-display text-lg font-semibold text-zinc-100">
                That's the whole onboarding. <span className="font-accent italic text-amber-300">Really.</span>
              </p>
              <p className="mt-2 text-[0.9rem] text-zinc-500">
                Most teams take their first Zyntai order within 15 minutes of signing up.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
