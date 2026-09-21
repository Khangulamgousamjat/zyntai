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
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_42%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.12),transparent)] blur-2xl" />
      <div className="absolute -right-32 top-64 h-80 w-80 rounded-full bg-amber-500/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* header */}
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
              Help center
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.03] tracking-tight text-zinc-50 sm:text-6xl lg:text-[4.2rem]">
              Frequently asked <em className="font-accent font-normal italic text-amber-300">questions.</em>
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
                    className="group flex w-full items-center justify-between rounded-[1rem] border border-white/[0.06] bg-white/[0.025] px-5 py-4 text-left transition-all duration-300 hover:translate-x-1.5 hover:border-amber-400/30 hover:bg-amber-400/[0.05]"
                  >
                    <span className="font-display text-[1.02rem] font-semibold text-zinc-200 transition-colors group-hover:text-amber-300">
                      {g.group}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="rounded-full border border-white/[0.08] px-2.5 py-0.5 text-[0.68rem] font-bold text-zinc-500">
                        {g.items.length}
                      </span>
                      <span className="text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                        →
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="glass relative mt-8 overflow-hidden rounded-[1.25rem] p-7">
                <IconSpark className="absolute -right-4 -top-4 h-16 w-16 text-amber-400/10" />
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
                    className="btn btn-ghost w-full py-3 text-[0.9rem]"
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
                    <span className="font-accent text-2xl italic text-amber-300/70">
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
              <div className="grain relative overflow-hidden rounded-[1.9rem] bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-6 py-14 text-center shadow-[0_36px_110px_-28px_rgba(245,158,11,0.5)] sm:px-12">
                <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full border-[16px] border-white/15" />
                <h2 className="font-display text-3xl font-bold tracking-tight text-(--zy-amber-ink) sm:text-4xl">
                  Still have <em className="font-accent font-normal italic">questions?</em>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[0.98rem] font-medium text-(--zy-amber-ink)/75">
                  Skip the docs — ask us directly, or watch the 60-second tour.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                  <a href="mailto:hello@zyntai.app" className="btn btn-dark group px-7 py-3.5">
                    Talk to us
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                  <button
                    onClick={() => gotoLanding("demo")}
                    className="btn border border-(--zy-amber-ink)/25 bg-(--zy-amber-ink)/10 px-7 py-3.5 text-(--zy-amber-ink) backdrop-blur-md hover:bg-(--zy-amber-ink)/20"
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
