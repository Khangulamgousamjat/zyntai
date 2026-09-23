import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { STEPS } from "../lib/data";
import { EASE_SWING, Reveal } from "../lib/motion";
import { IconLink, IconFlow, IconMenu } from "../lib/icons";

const STEP_ICONS = [IconMenu, IconLink, IconFlow];
const STEP_SHORT = ["Connect", "Share", "Grow"];
const STEP_TAIL = ["your catalog", "your link", "automatically"];

function StepCard({ s, i }: { s: (typeof STEPS)[number]; i: number }) {
  const Icon = STEP_ICONS[i];

  return (
    <div className="lg:h-[85vh] last:lg:h-auto" data-step-card>
      <div
        style={{
          zIndex: i + 1,
        }}
        className="group surface-solid relative overflow-hidden rounded-[1.25rem] border border-char-700/60 p-8 transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] lg:sticky lg:top-[26vh] sm:p-10"
      >
        <span
          aria-hidden
          className="font-accent pointer-events-none absolute -top-8 right-5 select-none text-[8rem] italic leading-none text-violet-500/[0.08] transition-colors duration-500 group-hover:text-violet-500/[0.14]"
        >
          {s.n}
        </span>
        <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-violet-500/[0.05] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-center gap-4">
          <span className="grid h-13 w-13 shrink-0 place-items-center rounded-xl border border-violet-500/30 bg-char-900 p-3.5 text-violet-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.28em] text-violet-400">
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
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 font-mono text-[0.76rem] font-medium tracking-wide text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-dot" />
            {s.chip}
          </span>
          <span className="hidden h-px flex-1 bg-gradient-to-r from-char-700/60 to-transparent sm:block" />
        </div>

      </div>
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
  const fill = scrollYProgress;

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
      <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(65%_55%_at_60%_45%,black,transparent)] pointer-events-none" />
      <div className="absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-violet-600/[0.04] blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* sticky rail column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-violet-400">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-dot" />
                How it works
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.04] tracking-tight text-zinc-50 sm:text-5xl lg:text-[3.3rem]">
                Live before your <em className="font-accent font-normal italic text-violet-400">next</em> launch.
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
              <div className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-char-700/60" />
              <motion.div
                style={{ scaleY: reduce ? 1 : fill, transformOrigin: "top" }}
                className="absolute bottom-2 left-[1.35rem] top-2 w-px bg-gradient-to-b from-violet-500 to-violet-600"
              />
              <div className="space-y-9">
                {STEP_SHORT.map((label, i) => (
                  <motion.button
                    key={label}
                    onClick={() => jumpTo(i)}
                    className="relative flex w-full items-center gap-5 text-left cursor-pointer"
                    animate={{ x: active === i ? 6 : 0 }}
                    transition={{ duration: 0.4, ease: EASE_SWING as unknown as number[] }}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-[0.8rem] font-bold transition-all duration-300 ${
                        active === i
                          ? "border-violet-500 bg-violet-500/15 text-violet-400 shadow-[0_0_16px_rgba(124,58,237,0.3)]"
                          : "border-char-700 bg-char-950 text-zinc-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-lg font-semibold transition-colors duration-300 ${
                        active === i ? "text-zinc-50" : "text-zinc-500"
                      }`}
                    >
                      {label}
                      <span className="ml-3 text-[0.78rem] font-normal text-zinc-500">
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
              className="glass rounded-[1.25rem] border border-dashed border-char-700/80 p-7 text-center sm:p-8"
            >
              <p className="font-display text-lg font-semibold text-zinc-100">
                That's the whole onboarding. <span className="font-accent italic text-violet-400">Really.</span>
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
