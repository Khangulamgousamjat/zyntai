import { useEffect, useState } from "react";
import { FAQ_GROUPS } from "../lib/data";
import { Reveal } from "../lib/motion";
import AccordionItem from "../components/Accordion";
import { useGotoLanding } from "../components/Layout";
import { IconSpark } from "../lib/icons";

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>("0-0");
  const gotoLanding = useGotoLanding();

  useEffect(() => {
    document.title = "FAQ — Zyntai";
  }, []);

  const jump = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-44">
      {/* backdrop */}
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_42%_at_50%_0%,black,transparent)] pointer-events-none" />
      <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,0.1),transparent)] blur-2xl pointer-events-none" />
      <div className="absolute -right-32 top-64 h-80 w-80 rounded-full bg-violet-600/[0.04] blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-violet-400">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-dot" />
              Help center
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.03] tracking-tight text-zinc-50 sm:text-6xl lg:text-[4.2rem]">
              Frequently asked <em className="font-accent font-normal italic text-violet-400">questions.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              Everything you need to know before you start. Clear answers, no runaround — and a
              human on the other side when you need one.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* sticky rail */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-zinc-500">
                Browse by topic
              </p>
              <div className="mt-5 space-y-2.5">
                {FAQ_GROUPS.map((g, i) => (
                  <button
                    key={g.group}
                    onClick={() => jump(`faq-group-${i}`)}
                    className="group flex w-full items-center justify-between rounded-[1rem] border border-char-700/60 bg-char-900/60 px-5 py-4 text-left transition-all duration-300 hover:translate-x-1 hover:border-violet-500/30 hover:bg-violet-500/[0.04] cursor-pointer"
                  >
                    <span className="font-display text-[1.02rem] font-semibold text-zinc-200 transition-colors group-hover:text-violet-400">
                      {g.group}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="rounded-full border border-char-700 bg-char-800/80 px-2.5 py-0.5 text-[0.68rem] font-bold text-zinc-400">
                        {g.items.length}
                      </span>
                      <span className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-400">
                        →
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass relative mt-8 overflow-hidden rounded-[1.25rem] border border-char-700/60 p-7">
                <IconSpark className="absolute -right-4 -top-4 h-16 w-16 text-violet-500/10 pointer-events-none" />
                <p className="font-display text-xl font-bold text-zinc-50">Still stuck?</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-zinc-400">
                  Write to us — a human replies within one business day. No ticket numbers, no bots
                  pretending to care.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href="mailto:hello@zyntai.app" className="btn btn-primary w-full py-3 text-[0.9rem]">
                    Email hello@zyntai.app
                  </a>
                  <button
                    onClick={() => gotoLanding("demo")}
                    className="btn btn-ghost w-full py-3 text-[0.9rem] cursor-pointer"
                  >
                    See the product live
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* grouped accordions */}
          <div className="space-y-14">
            {FAQ_GROUPS.map((g, gi) => (
              <div key={g.group} id={`faq-group-${gi}`} className="scroll-mt-32">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-accent text-2xl italic text-violet-400/80">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-50 sm:text-[1.7rem]">
                      {g.group}
                    </h2>
                  </div>
                </Reveal>
                <div className="mt-6 space-y-3.5">
                  {g.items.map((item, ii) => {
                    const key = `${gi}-${ii}`;
                    return (
                      <Reveal key={key} delay={0.05 * ii}>
                        <AccordionItem
                          q={item.q}
                          a={item.a}
                          open={open === key}
                          onToggle={() => setOpen(open === key ? null : key)}
                        />
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* bottom CTA */}
            <Reveal>
              <div className="relative overflow-hidden rounded-[1.5rem] border border-char-700 bg-char-900/90 px-6 py-14 text-center shadow-2xl sm:px-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_65%)]" />
                <h2 className="font-display relative text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
                  Still have <em className="font-accent font-normal italic text-violet-400">questions?</em>
                </h2>
                <p className="relative mx-auto mt-3 max-w-md text-[0.98rem] font-normal text-zinc-400">
                  Skip the docs — ask us directly, or watch the 60-second tour.
                </p>
                <div className="relative mt-7 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                  <a href="mailto:hello@zyntai.app" className="btn btn-primary group px-7 py-3.5">
                    Talk to us
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <button
                    onClick={() => gotoLanding("demo")}
                    className="btn btn-ghost px-7 py-3.5 text-zinc-200 cursor-pointer"
                  >
                    Watch the demo
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="h-24" />
      </div>
    </section>
  );
}
