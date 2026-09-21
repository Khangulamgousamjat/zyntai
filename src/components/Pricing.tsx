import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PLANS } from "../lib/data";
import { EASE, Reveal, SectionHeading } from "../lib/motion";
import { IconCheck, IconSpark } from "../lib/icons";

export default function Pricing() {
  const [annual, setAnnual] = useState(true);
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing,"
          accent="serious"
          tail="growth."
          sub="Every plan starts with a 14-day free trial. No card, no contract, cancel in two clicks."
        />

        {/* billing toggle */}
        <Reveal delay={0.15} className="mt-10 flex items-center justify-center gap-4">
          <div className="glass relative flex rounded-full p-1.5">
            <span
              className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-[0.82rem] font-semibold transition-colors ${
                !annual ? "text-(--zy-amber-ink)" : "text-zinc-400 hover:text-zinc-200"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </span>
            <span
              className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-[0.82rem] font-semibold transition-colors ${
                annual ? "text-(--zy-amber-ink)" : "text-zinc-400 hover:text-zinc-200"
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual
                      <span className={`ml-1.5 text-[0.68rem] font-bold ${annual ? "text-(--zy-amber-ink)/70" : "text-amber-300"}`}>−20%</span>            </span>
            {annual && (
              <motion.span
                layoutId="billing-thumb"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-y-1.5 right-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gradient-to-b from-amber-300 to-amber-500"
              />
            )}
            {!annual && (
              <motion.span
                layoutId="billing-thumb"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gradient-to-b from-amber-300 to-amber-500"
              />
            )}
          </div>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={0.1 * i} y={44} className="h-full">
              <article
                className={`group relative flex h-full flex-col rounded-[1.25rem] p-8 transition-all duration-500 sm:p-9 ${
                  p.highlight
                    ? "border border-amber-400/50 bg-gradient-to-b from-amber-400/[0.09] to-white/[0.02] shadow-[0_0_60px_-16px_rgba(245,158,11,0.35)] lg:-translate-y-5 lg:scale-[1.03] hover:shadow-[0_0_80px_-14px_rgba(245,158,11,0.5)]"
                    : "glass hover:-translate-y-1.5 hover:border-amber-400/25"
                }`}
              >
                {p.highlight && (
                    <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-1.5 text-[0.7rem] font-black uppercase tracking-wider text-(--zy-amber-ink) shadow-[0_0_28px_rgba(245,158,11,0.5)]">                    <IconSpark className="h-3.5 w-3.5" /> Most popular
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-bold text-zinc-50">{p.name}</h3>
                  {p.highlight && (
                    <span className="text-[0.66rem] font-bold uppercase tracking-wider text-amber-300">Best value</span>
                  )}
                </div>
                <p className="mt-2.5 min-h-11 text-[0.9rem] leading-relaxed text-zinc-400">{p.blurb}</p>

                <div className="mt-6 flex items-end gap-2">
                  <div className="relative h-14 overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={annual ? "a" : "m"}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
                        transition={{ duration: 0.35, ease: EASE as unknown as number[] }}
                        className="font-display block text-[3.2rem] font-bold leading-14 tracking-tight text-zinc-50"
                      >
                        ${annual ? p.annual : p.monthly}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="pb-2">
                    <p className="text-[0.82rem] font-medium text-zinc-500">/month</p>
                    {annual && (
                      <p className="text-[0.68rem] font-semibold text-amber-300">billed annually</p>
                    )}
                  </div>
                </div>

                <ul className="mt-7 flex-1 space-y-3 border-t border-white/[0.07] pt-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.92rem] text-zinc-300">
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          p.highlight ? "bg-amber-400 text-(--zy-amber-ink)" : "bg-amber-400/12 text-amber-300"
                        }`}
                      >
                        <IconCheck className="h-3 w-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cta"
                  className={`btn mt-8 w-full py-3.5 text-[0.95rem] ${p.highlight ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="text-[0.85rem] text-zinc-500">
            All plans include unlimited products · SSL & PCI-ready checkout · Prices in USD, 30+ currencies supported
          </p>
        </Reveal>
      </div>
    </section>
  );
}
