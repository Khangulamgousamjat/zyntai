import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { COMPARISON_GROUPS, PLANS, PRICING_FAQS, type CompareCell } from "../lib/data";
import { EASE, Reveal } from "../lib/motion";
import AccordionItem from "../components/Accordion";
import { useGotoLanding } from "../components/Layout";
import { IconCheck, IconSpark } from "../lib/icons";

function PriceSwap({ value, reduce }: { value: number; reduce: boolean | null }) {
  return (
    <div className="relative h-14 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: EASE as unknown as number[] }}
          className="font-display block text-[3.1rem] font-bold leading-14 tracking-tight text-zinc-50"
        >
          ${value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Cell({ v }: { v: CompareCell }) {
  if (v === true)
    return (
      <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-amber-400/12 text-amber-300">
        <IconCheck className="h-3.5 w-3.5" />
      </span>
    );
  if (v === false) return <span className="block text-center text-zinc-600">—</span>;
  return <span className="block text-center text-[0.82rem] font-semibold text-zinc-300">{v}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const gotoLanding = useGotoLanding();

  useEffect(() => {
    document.title = "Pricing — Zyntai";
  }, []);

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      {/* backdrop */}
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_45%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-32 left-1/2 h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.13),transparent)] blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
              Pricing
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.03] tracking-tight text-zinc-50 sm:text-6xl lg:text-[4.2rem]">
              Simple, <em className="font-accent font-normal italic text-amber-300">transparent</em> pricing.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              One flat price per plan. No transaction fees, no setup fees, no surprises. Start free
              for 14 days — upgrade when it's earning its keep.
            </p>
          </Reveal>

          {/* toggle */}
          <Reveal delay={0.22}>
            <div className="mt-9 flex items-center justify-center gap-3">
              <div className="glass relative flex rounded-full p-1.5">
                <span
                  onClick={() => setAnnual(false)}
                  className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-[0.85rem] font-semibold transition-colors ${
                    !annual ? "text-(--zy-amber-ink)" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Monthly
                </span>
                <span
                  onClick={() => setAnnual(true)}
                  className={`relative z-10 cursor-pointer rounded-full px-5 py-2 text-[0.85rem] font-semibold transition-colors ${
                    annual ? "text-(--zy-amber-ink)" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Yearly
                </span>
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className={`absolute inset-y-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gradient-to-b from-amber-300 to-amber-500 ${
                    annual ? "right-1.5" : "left-1.5"
                  }`}
                />
              </div>
              <AnimatePresence>
                {annual && (
                  <motion.span
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, x: -8 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: EASE as unknown as number[] }}
                    className="rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-wide text-(--zy-amber-ink) shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* plan cards */}
        <div className="mx-auto mt-16 grid max-w-6xl items-stretch gap-6 lg:grid-cols-3 lg:gap-7">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={0.1 * i} y={44} className="h-full">
              <article
                className={`group relative flex h-full flex-col rounded-[1.25rem] p-8 transition-all duration-500 sm:p-9 ${
                  p.highlight
                    ? "border border-amber-400/50 bg-gradient-to-b from-amber-400/[0.09] to-white/[0.02] shadow-[0_0_60px_-16px_rgba(245,158,11,0.35)] lg:-translate-y-4 lg:scale-[1.02] hover:shadow-[0_0_80px_-14px_rgba(245,158,11,0.5)]"
                    : "glass hover:-translate-y-1.5 hover:border-amber-400/25"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-4 py-1.5 text-[0.7rem] font-black uppercase tracking-wider text-(--zy-amber-ink) shadow-[0_0_28px_rgba(245,158,11,0.5)]">
                    <IconSpark className="h-3.5 w-3.5" /> Most popular
                  </span>
                )}
                <h2 className="font-display text-xl font-bold text-zinc-50">{p.name}</h2>
                <p className="mt-2 min-h-10 text-[0.9rem] leading-relaxed text-zinc-400">{p.blurb}</p>

                <div className="mt-6 flex items-end gap-2">
                  <PriceSwap value={annual ? p.annual : p.monthly} reduce={reduce} />
                  <div className="pb-2">
                    <p className="text-[0.82rem] font-medium text-zinc-500">/month</p>
                    <p className={`text-[0.68rem] font-semibold ${annual ? "text-amber-300" : "text-transparent"}`}>
                      billed yearly
                    </p>
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

                <button
                  onClick={() => gotoLanding("cta")}
                  className={`btn mt-8 w-full py-3.5 text-[0.95rem] ${p.highlight ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.cta}
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="text-[0.85rem] text-zinc-500">
            Every plan includes unlimited products · SSL & PCI-ready checkout · 30+ currencies ·
            14-day free trial
          </p>
        </Reveal>

        {/* comparison table */}
        <div className="mt-28">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Compare <em className="font-accent font-normal italic text-amber-300">every</em> detail.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[1rem] text-zinc-400">
              The full picture, side by side. No footnotes, no "contact us to find out."
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass mt-12 overflow-hidden rounded-[1.25rem]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-[0.92rem]">
                  <thead>
                    <tr className="border-b border-white/[0.07]">
                      <th className="sticky left-0 z-10 bg-char-950 px-6 py-6 text-left text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Features
                      </th>
                      {PLANS.map((p) => (
                        <th key={p.name} className={`px-6 py-6 text-center ${p.highlight ? "bg-amber-400/[0.06]" : ""}`}>
                          <span className="font-display text-[1.02rem] font-bold text-zinc-50">{p.name}</span>
                          <span className="mt-1 block text-[0.72rem] font-medium text-zinc-500">
                            ${annual ? p.annual : p.monthly}/mo
                          </span>
                          {p.highlight && (
                            <span className="mt-1.5 inline-block rounded-full bg-amber-400/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-amber-300">
                              Popular
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_GROUPS.map((g) => (
                      <FragmentRows key={g.group} group={g.group} rows={g.rows} />
                    ))}
                    <tr className="border-t border-white/[0.07]">
                      <td className="sticky left-0 z-10 bg-char-950 px-6 py-5" />
                      {PLANS.map((p) => (
                        <td key={p.name} className={`px-6 py-5 text-center ${p.highlight ? "bg-amber-400/[0.06]" : ""}`}>
                          <button
                            onClick={() => gotoLanding("cta")}
                            className={`btn px-5 py-2.5 text-[0.82rem] ${p.highlight ? "btn-primary" : "btn-ghost"}`}
                          >
                            {p.cta}
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>

        {/* pricing FAQ snippet */}
        <div className="mx-auto mt-28 max-w-3xl">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Pricing <em className="font-accent font-normal italic text-amber-300">questions,</em> answered.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-3.5">
            {PRICING_FAQS.map((f, i) => (
              <Reveal key={f.q} delay={0.06 * i}>
                <AccordionItem
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* talk to us banner */}
        <Reveal delay={0.05}>
          <div className="grain relative mt-24 overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-6 py-16 text-center shadow-[0_36px_110px_-28px_rgba(245,158,11,0.5)] sm:px-14">
            <div className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full border-[18px] border-white/15" />
            <IconSpark className="pointer-events-none absolute left-[10%] top-8 h-7 w-7 animate-spin-slow text-(--zy-amber-ink)/25" />
            <h2 className="font-display text-3xl font-bold tracking-tight text-(--zy-amber-ink) sm:text-5xl">
              Still have questions? <em className="font-accent font-normal italic">Talk to us.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[1.02rem] font-medium text-(--zy-amber-ink)/75">
              A real human replies within one business day. No scripts, no sales pressure.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <a href="mailto:hello@zyntai.app" className="btn btn-dark group px-7 py-3.5">
                Talk to us
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <Link
                to="/faq"
                className="btn border border-(--zy-amber-ink)/25 bg-(--zy-amber-ink)/10 px-7 py-3.5 text-(--zy-amber-ink) backdrop-blur-md hover:bg-(--zy-amber-ink)/20"
              >
                Browse the full FAQ
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="h-24" />
      </div>
    </section>
  );
}

function FragmentRows({
  group,
  rows,
}: {
  group: string;
  rows: { feature: string; starter: CompareCell; growth: CompareCell; scale: CompareCell }[];
}) {
  return (
    <>
      <tr>
        <td
          colSpan={4}
          className="sticky left-0 border-t border-white/[0.06] bg-char-950 px-6 pb-2 pt-6 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-amber-300"
        >
          {group}
        </td>
      </tr>
      {rows.map((r) => (
        <tr key={r.feature} className="group/row border-t border-white/[0.04] transition-colors hover:bg-white/[0.025]">
          <td className="sticky left-0 z-10 bg-char-950 px-6 py-4 font-medium text-zinc-300 transition-colors group-hover/row:text-zinc-100">
            {r.feature}
          </td>
          <td className="px-6 py-4"><Cell v={r.starter} /></td>
          <td className="bg-amber-400/[0.06] px-6 py-4"><Cell v={r.growth} /></td>
          <td className="px-6 py-4"><Cell v={r.scale} /></td>
        </tr>
      ))}
    </>
  );
}
