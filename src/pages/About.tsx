import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Embers from "../components/Embers";
import { EASE, Reveal, SectionHeading, Counter } from "../lib/motion";
import { IconArrow, IconBolt, IconSpark, IconChart } from "../lib/icons";

const VALUES = [
  {
    n: "01",
    icon: IconSpark,
    title: "Simplicity first",
    desc: "If it needs a manual, we failed. Every screen in Zyntai should be obvious in five seconds — because your team has real work to do.",
  },
  {
    n: "02",
    icon: IconBolt,
    title: "Automate the repetitive",
    desc: "“Are you open?” shouldn't cost a human. We automate the 80% of conversations that repeat, so people spend time on the 20% that matter.",
  },
  {
    n: "03",
    icon: IconChart,
    title: "Grow with your customers",
    desc: "A sale isn't a finish line. Follow-ups, upsells and win-backs are built in, because the second order is where businesses are made.",
  },
];

const ABOUT_STATS = [
  { value: 2.4, suffix: "M+", decimals: 1, label: "orders automated" },
  { value: 12, suffix: "k+", decimals: 0, label: "businesses onboard" },
  { value: 31, suffix: "M", decimals: 0, label: "messages answered" },
  { value: 99.98, suffix: "%", decimals: 2, label: "uptime, last 12 months" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* header */}
      <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
        <div className="absolute -top-32 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.13),transparent)] blur-2xl" />
        <Embers />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.3em] text-amber-300">
              Why we exist
            </p>
          </Reveal>
          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE as unknown as number[] }}
            className="font-display mt-5 max-w-4xl text-balance text-5xl font-bold leading-[1.03] tracking-tight text-zinc-50 sm:text-7xl"
          >
            Built for modern <em className="font-accent font-normal italic text-amber-300">businesses.</em>
          </motion.h1>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              Slow replies lose customers. Clunky ordering loses revenue. We built Zyntai so neither
              happens on your watch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* origin story */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <blockquote className="glass relative overflow-hidden rounded-[1.25rem] p-8">
                <span aria-hidden className="font-accent absolute -top-2 right-5 select-none text-[6rem] italic leading-none text-amber-400/10">
                  “
                </span>
                <p className="font-accent text-2xl italic leading-snug text-zinc-100 sm:text-[1.7rem]">
                  Every unanswered message is a customer who quietly went somewhere else.
                </p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-[0.7rem] font-bold text-(--zy-amber-ink)">
                    RH
                  </span>
                  <div>
                    <p className="text-[0.88rem] font-semibold text-zinc-200">Redoyanul Haque</p>
                    <p className="text-[0.74rem] text-zinc-500">Founder, Zyntai</p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          </div>

          <div className="space-y-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-zinc-300 sm:text-xl">
                It started with a simple observation: the businesses we loved were losing customers
                they deserved to keep. A message at 11pm went unanswered. A checkout took nine
                fields and a login. A “just checking in” never happened, so the customer never came
                back.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
                Not because the owners didn't care — because there are only so many hours in a day,
                and most of them were spent on work a machine could do better: answering the same
                questions, chasing the same follow-ups, re-typing the same orders.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg leading-relaxed text-zinc-400 sm:text-xl">
                So we built Zyntai: an AI assistant that answers in seconds, an ordering flow that
                takes seconds, and automations that keep customers coming back. One platform, zero
                busywork — so you can spend your time on the part only you can do.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Remote-first, 14 countries", "Bootstrapped until 2025", "Profitable & growing"].map((c) => (
                  <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.8rem] font-medium text-zinc-300">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* values */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="What we believe"
            title="Three rules we"
            accent="ship"
            tail="by."
            sub="Every feature, every design decision, every hire is tested against these."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={0.1 * i} y={44} className={i === 1 ? "md:translate-y-8" : ""}>
                <article className="group glass relative h-full overflow-hidden rounded-[1.25rem] p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-400/30 hover:shadow-[0_28px_70px_-28px_rgba(245,158,11,0.3)]">
                  <span aria-hidden className="font-display absolute right-6 top-4 select-none text-[4.2rem] font-bold leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-amber-400/10">
                    {v.n}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-400/15 to-orange-500/10 text-amber-300 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-zinc-50">{v.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-zinc-400">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* stats strip */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE as unknown as number[] }}
            className="liquid-glass grid grid-cols-2 overflow-hidden rounded-[1.25rem] lg:grid-cols-4"
          >
            {ABOUT_STATS.map((s, i) => (
              <div
                key={s.label}
                className={`group relative px-6 py-9 text-center transition-colors duration-500 hover:bg-amber-400/[0.05] sm:px-8 ${
                  i !== 0 ? "border-l border-white/[0.06] max-lg:[&:nth-child(3)]:border-l-0" : ""
                } ${i >= 2 ? "max-lg:border-t max-lg:border-white/[0.06]" : ""}`}
              >
                <p className="font-display text-4xl font-bold tracking-tight text-zinc-50 transition-colors duration-500 group-hover:text-amber-300 sm:text-[2.7rem]">
                  <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* closing CTA */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-24">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE as unknown as number[] }}
          className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-6 py-16 text-center shadow-[0_40px_120px_-30px_rgba(245,158,11,0.5)] sm:px-16 sm:py-20"
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full border-[18px] border-white/15" />
          <IconSpark className="pointer-events-none absolute right-[12%] top-8 h-7 w-7 animate-spin-slow text-(--zy-amber-ink)/25" />
          <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-bold leading-[1.06] tracking-tight text-(--zy-amber-ink) sm:text-5xl">
            Ready to meet <em className="font-accent font-normal italic">Zyntai?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-medium text-(--zy-amber-ink)/75">
            See it on your business in a free 20-minute demo.
          </p>
          <Link to="/contact" className="btn btn-dark group mt-8 px-8 py-4 text-[1rem]">
            Book a free demo
            <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
