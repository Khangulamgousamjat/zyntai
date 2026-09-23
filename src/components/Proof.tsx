import { motion } from "framer-motion";
import { LOGOS, STATS } from "../lib/data";
import { Counter, EASE, Reveal } from "../lib/motion";

function LogoMark({ i }: { i: number }) {
  const cls = "h-5 w-5 transition-colors duration-500";
  switch (i % 4) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h4l2.5-6 4 12 2.5-6H21" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9Z" />
          <path d="M12 8v4l2.5 1.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15.5 12 4l8 11.5H4Z" />
          <path d="M9 19.5h6" />
        </svg>
      );
  }
}

function Wordmark({ name, style }: { name: string; style: string }) {
  if (style === "serif")
    return <span className="font-accent text-[1.35rem] italic tracking-wide">{name}</span>;
  if (style === "wide")
    return <span className="font-display text-[0.95rem] font-bold tracking-[0.28em]">{name}</span>;
  return <span className="font-display text-[1.15rem] font-medium tracking-tight">{name}</span>;
}

export default function Proof() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative border-y border-white/[0.05] bg-char-900/40 py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-zinc-600">
            Powering teams at
          </p>
        </Reveal>

        <div className="marquee-mask marquee-paused mt-8 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-14 pr-14">
            {doubled.map((l, i) => (
              <div
                key={`${l.name}-${i}`}
                className="group flex cursor-default items-center gap-2.5 text-zinc-600 transition-all duration-500 hover:scale-[1.04] hover:text-violet-400"
              >
                <LogoMark i={i} />
                <Wordmark name={l.name} style={l.style} />
              </div>
            ))}
          </div>
        </div>

        {/* stats band */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE as unknown as number[] }}
          className="glass mt-14 grid grid-cols-2 overflow-hidden rounded-[1.6rem] border border-char-700/60 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`group relative px-6 py-8 text-center transition-colors duration-500 hover:bg-violet-500/[0.04] sm:px-8 ${
                i !== 0 ? "border-l border-char-700/60 max-lg:[&:nth-child(3)]:border-l-0" : ""
              } ${i >= 2 ? "max-lg:border-t max-lg:border-char-700/60" : ""}`}
            >
              <p className="font-display text-4xl font-bold tracking-tight text-zinc-50 transition-colors duration-500 group-hover:text-violet-400 sm:text-[2.75rem]">
                <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-zinc-500">
                {s.label}
              </p>
              <span className="pointer-events-none absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-violet-500 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
