import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Embers from "../components/Embers";
import { EASE, Reveal } from "../lib/motion";
import { IconCheck, IconArrow, IconBird, IconInstagram, IconLinkedIn, IconClock, IconChat } from "../lib/icons";

const STEPS = [
  {
    icon: IconChat,
    title: "We reply within 24h",
    desc: "A real person reads your note and answers — usually much faster.",
  },
  {
    icon: IconClock,
    title: "Quick 20-min demo call",
    desc: "We set Zyntai up around *your* catalog and show you the numbers.",
  },
  {
    icon: IconCheck,
    title: "You decide",
    desc: "Love it? Start free. Not for you? No hard feelings, no follow-up spam.",
  },
];

const inputCls =
  "w-full rounded-xl border border-white/10 bg-char-950/[0.35] px-4 py-3 text-[0.95rem] text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 focus:border-amber-400/60 focus:bg-char-950/[0.5] hover:border-white/20";

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between text-[0.8rem] font-semibold text-zinc-300">
        {label}
        {optional && <em className="font-accent text-[0.78rem] font-normal italic text-zinc-500">optional</em>}
      </span>
      {children}
    </label>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", goal: "" });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) cardRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [sent, reduce]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.business.trim() || !form.email.includes("@") || !form.goal.trim()) {
      setError("Please fill in your name, business, a valid email and your goal.");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_55%_at_50%_15%,black,transparent)]" />
      <div className="absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.13),transparent)] blur-2xl" />
      <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-orange-500/[0.06] blur-3xl" />
      <Embers />

      <section className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.3em] text-amber-300">
                Book a free demo
              </p>
            </Reveal>
            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE as unknown as number[] }}
              className="font-display mt-5 text-balance text-5xl font-bold leading-[1.03] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl"
            >
              See Zyntai <em className="font-accent font-normal italic text-amber-300">in action.</em>
            </motion.h1>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Tell us what you want to grow. We'll show you exactly how Zyntai does it — in 20
                minutes, on your own catalog.
              </p>
            </Reveal>
          </div>

          <div ref={cardRef} className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
            {/* form */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE as unknown as number[] }}
              className="liquid-glass relative overflow-hidden rounded-[1.5rem] p-7 sm:p-10"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE as unknown as number[] }}
                    className="flex min-h-[430px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-(--zy-amber-ink) shadow-[0_0_44px_rgba(245,158,11,0.45)]"
                    >
                      <IconCheck className="h-8 w-8" />
                    </motion.span>
                    <h2 className="font-display mt-6 text-2xl font-bold text-zinc-50 sm:text-3xl">
                      Thanks, {form.name.split(" ")[0] || "friend"} — you're on the list.
                    </h2>
                    <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-zinc-400">
                      We'll be in touch within 24 hours at{" "}
                      <span className="font-semibold text-amber-300">{form.email}</span> to schedule
                      your demo.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="link-underline mt-7 text-[0.88rem] font-semibold text-zinc-300 hover:text-amber-300"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={onSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Full name">
                        <input className={inputCls} placeholder="Alex Morgan" value={form.name} onChange={set("name")} />
                      </Field>
                      <Field label="Business name">
                        <input className={inputCls} placeholder="Northwind Studio" value={form.business} onChange={set("business")} />
                      </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Email">
                        <input type="email" className={inputCls} placeholder="alex@business.com" value={form.email} onChange={set("email")} />
                      </Field>
                      <Field label="Phone" optional>
                        <input type="tel" className={inputCls} placeholder="+1 (555) 000-0000" value={form.phone} onChange={set("phone")} />
                      </Field>
                    </div>
                    <Field label="What do you want to achieve?">
                      <textarea
                        rows={4}
                        className={`${inputCls} resize-none`}
                        placeholder="e.g. “I want to take orders while I sleep and stop answering the same questions by hand.”"
                        value={form.goal}
                        onChange={set("goal")}
                      />
                    </Field>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-orange-400/30 bg-orange-400/[0.07] px-4 py-2.5 text-[0.82rem] font-medium text-orange-300"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button type="submit" className="btn btn-primary group w-full py-4 text-[1rem]">
                      Book my free demo
                      <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <p className="text-center text-[0.78rem] text-zinc-500">
                      Free 20-minute call · No credit card · Cancel anytime
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* side panel */}
            <div className="flex flex-col gap-6">
              <Reveal delay={0.12} y={40}>
                <div className="glass rounded-[1.5rem] p-7 sm:p-8">
                  <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    What happens next
                  </p>
                  <div className="mt-6 space-y-6">
                    {STEPS.map((s, i) => (
                      <div key={s.title} className="group flex gap-4">
                        <div className="flex flex-col items-center">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-400/25 bg-amber-400/[0.08] text-amber-300 transition-transform duration-300 group-hover:scale-110">
                            <s.icon className="h-4.5 w-4.5" />
                          </span>
                          {i < STEPS.length - 1 && (
                            <span className="mt-2 w-px flex-1 bg-gradient-to-b from-amber-400/40 to-transparent" />
                          )}
                        </div>
                        <div className="pb-1">
                          <p className="font-display text-[0.98rem] font-bold text-zinc-100">{s.title}</p>
                          <p className="mt-1 text-[0.88rem] leading-relaxed text-zinc-400">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-center text-[0.85rem] font-semibold text-zinc-300">
                    No credit card. <span className="text-amber-300">No pressure.</span>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2} y={40}>
                <div className="glass rounded-[1.5rem] p-7 sm:p-8">
                  <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.25em] text-zinc-500">
                    Prefer email?
                  </p>
                  <a
                    href="mailto:hello@zyntai.app"
                    className="link-underline mt-3 inline-block font-display text-xl font-bold text-amber-300"
                  >
                    hello@zyntai.app
                  </a>
                  <div className="mt-5 flex items-center gap-3">
                    {[
                      { icon: IconBird, href: "https://x.com", label: "X (Twitter)" },
                      { icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
                      { icon: IconLinkedIn, href: "https://linkedin.com", label: "LinkedIn" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:text-amber-300"
                      >
                        <s.icon className="h-4.5 w-4.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
