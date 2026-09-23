import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, Reveal, SectionHeading } from "../lib/motion";
import { IconCheck, IconBolt, IconChat, IconSpark } from "../lib/icons";

const CONVOS = [
  { from: "customer", text: "Do you offer volume discounts?" },
  { from: "zyntai", text: "Yes — 15% off at 10+ seats. Want me to apply it to your cart?" },
  { from: "customer", text: "Amazing. Can I also get an invoice?" },
  { from: "zyntai", text: "Done — invoice #2091 sent to your email. Anything else?" },
];

const POINTS = [
  "The AI assistant answers 80% of questions before your team sees them",
  "Order alerts, receipts, and status updates fire automatically",
  "Win-back campaigns run themselves — and feel personal, not spammy",
  "A daily digest lands in your inbox before your first coffee",
];

export default function Automation() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? CONVOS.length : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setStep((s) => (s >= CONVOS.length ? s : s + 1)), 1600);
    return () => clearInterval(t);
  }, [reduce]);

  const done = step >= CONVOS.length;

  return (
    <section id="story" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-violet-600/[0.04] blur-3xl pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* chat mockup */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -48, rotateY: 8 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE as unknown as number[] }}
          style={{ transformPerspective: 1200 }}
          className="relative order-2 lg:order-1"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_40%_40%,rgba(124,58,237,0.1),transparent_70%)] blur-2xl pointer-events-none" />

          <div className="glass relative overflow-hidden rounded-[1.25rem] border border-char-700/60 p-5 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.5)] sm:p-6">
            <div className="flex items-center justify-between border-b border-char-700/60 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-600 text-white shadow-sm">
                  <IconChat className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-display text-[0.85rem] font-bold text-zinc-100">Zyntai Assistant</p>
                  <p className="flex items-center gap-1.5 text-[0.66rem] text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    online · replies in ~1s
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-violet-400">
                Trained on your catalog
              </span>
            </div>

            <div className="min-h-[280px] space-y-3 py-5">
              <AnimatePresence initial={false}>
                {CONVOS.slice(0, step).map((c, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: EASE as unknown as number[] }}
                    className={`flex ${c.from === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[0.85rem] leading-relaxed ${
                        c.from === "customer"
                          ? "rounded-br-md border border-char-700 bg-char-800 text-zinc-200"
                          : "rounded-bl-md border border-violet-600/40 bg-violet-600 text-white"
                      }`}
                    >
                      {c.from === "zyntai" && (
                        <span className="mb-1 block text-[0.6rem] font-bold uppercase tracking-wider text-violet-200">
                          Zyntai AI
                        </span>
                      )}
                      {c.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!done && !reduce && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-char-700 bg-char-800 px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-between rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3"
                >
                  <p className="flex items-center gap-2 text-[0.78rem] font-semibold text-emerald-400">
                    <IconCheck className="h-4 w-4" /> Sale closed · no human involved
                  </p>
                  <p className="font-display text-[0.9rem] font-bold text-zinc-100">+$425.00</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* floating stats */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE as unknown as number[] }}
            className="glass absolute -right-4 top-12 hidden w-48 rounded-xl border border-char-700/60 p-4 shadow-xl sm:block animate-float-slow"
            style={{ "--tilt": "3deg" } as React.CSSProperties}
          >
            <p className="flex items-center gap-1.5 text-[0.66rem] font-bold uppercase tracking-wider text-violet-400">
              <IconBolt className="h-3.5 w-3.5" /> This week
            </p>
            <p className="font-display mt-2 text-2xl font-bold text-zinc-50">1,284</p>
            <p className="text-[0.7rem] text-zinc-500">questions answered on autopilot</p>
          </motion.div>
        </motion.div>

        {/* copy side */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Automation"
            title="Put the busywork"
            accent="on"
            tail="autopilot."
            sub="Zyntai handles the repetitive 80% of your customer journey — answering, confirming, following up — so your team spends its time on the 20% that actually needs a human."
          />

          <div className="mt-9 space-y-4">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={0.08 * i}>
                <div className="group flex items-start gap-3.5 rounded-xl border border-transparent p-3.5 transition-all duration-300 hover:border-char-700 hover:bg-char-800/40">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-violet-500/15 text-violet-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[1rem] leading-relaxed text-zinc-300">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#cta"
                className="btn btn-primary group px-6 py-3"
              >
                See it in action
                <IconSpark className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </a>
              <p className="text-[0.85rem] text-zinc-500">
                Teams save <span className="font-bold text-violet-400">10+ hours every week</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
