import { motion } from "framer-motion";
import { LOGOS, STATS } from "../lib/data";
import { Counter, EASE, Reveal } from "../lib/motion";


function Wordmark({ name, style }: { name: string; style: string }) {
  if (style === "meta")
    return <span className="text-[0.86rem] font-medium text-zinc-500 dark:text-zinc-400">{name}</span>;
  if (name.toLowerCase() === "nykaa")
    return <span className="font-serif text-[1.35rem] font-bold tracking-wide">{name}</span>;
  if (name.toLowerCase() === "zomato")
    return <span className="font-display text-[1.25rem] font-black lowercase italic tracking-tight">{name}</span>;
  if (name.toLowerCase() === "boat")
    return <span className="font-display text-[1.25rem] font-extrabold tracking-tight">bo<span className="text-violet-600 dark:text-violet-400">A</span>t</span>;
  if (name.toLowerCase() === "flipkart")
    return <span className="font-display text-[1.25rem] font-bold italic tracking-tight">{name}</span>;
  return <span className="font-display text-[1.25rem] font-bold tracking-tight">{name}</span>;
}

export default function Proof() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative border-y border-zinc-200/80 dark:border-white/[0.05] bg-zinc-50/60 dark:bg-char-900/40 py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-[0.74rem] font-bold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            TRUSTED BY GROWING BRANDS
          </p>
        </Reveal>

        <div className="marquee-mask marquee-paused mt-7 overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-14 pr-14">
            {doubled.map((l, i) => (
              <div
                key={`${l.name}-${i}`}
                className="group flex cursor-default items-center gap-2 text-zinc-800 dark:text-zinc-200 transition-all duration-300 hover:scale-[1.04] hover:text-violet-600 dark:hover:text-violet-400"
              >
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
