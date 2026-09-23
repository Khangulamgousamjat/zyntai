import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "../lib/data";
import { EASE, SectionHeading } from "../lib/motion";
import { IconPlus } from "../lib/icons";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Answers,"
              accent="before"
              tail="you ask."
              sub="Everything teams ask us on the first call. Still curious? Write to hello@zyntai.app — a human replies within a day."
            />
            <motion.a
              href="mailto:hello@zyntai.app"
              whileHover={{ x: 4 }}
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              Talk to a human
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div
                  key={f.q}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE as unknown as number[] }}
                  className={`glass overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-violet-500/40 bg-violet-500/[0.04]" : "border-char-700/60 hover:border-violet-500/30"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer sm:px-7"
                  >
                    <span className={`font-display text-[1.05rem] font-semibold transition-colors ${isOpen ? "text-violet-400" : "text-zinc-100"}`}>
                      {f.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-violet-500/50 bg-violet-500/15 text-violet-400"
                          : "border-char-700 text-zinc-400"
                      }`}
                    >
                      <IconPlus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE as unknown as number[] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-zinc-400 sm:px-7">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
