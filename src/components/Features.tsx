import type { ReactNode } from "react";
import { FEATURES, type FeatureKey } from "../lib/data";
import { SectionHeading, Stagger, StaggerItem } from "../lib/motion";
import { IconChat, IconMenu, IconDashboard, IconUpsell, IconChart, IconTrack } from "../lib/icons";

const ICONS: Record<FeatureKey, (p: { className?: string }) => ReactNode> = {
  ai: (p) => <IconChat {...p} />,
  order: (p) => <IconMenu {...p} />,
  dashboard: (p) => <IconDashboard {...p} />,
  upsell: (p) => <IconUpsell {...p} />,
  insights: (p) => <IconChart {...p} />,
  reengage: (p) => <IconTrack {...p} />,
};

/* ---------- mini visuals ---------- */
function AiVisual() {
  return (
    <div className="w-full max-w-[250px] space-y-2">
      <div className="ml-8 rounded-2xl rounded-br-md border border-char-700/60 bg-char-800/60 px-3.5 py-2.5 text-right">
        <p className="text-[0.7rem] text-zinc-300">Do you ship internationally? 🌍</p>
      </div>
      <div className="mr-8 flex items-start gap-2 rounded-2xl rounded-bl-md border border-violet-500/30 bg-violet-500/10 px-3.5 py-2.5">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-600 text-[0.55rem] font-bold text-white">Z</span>
        <p className="text-[0.7rem] leading-relaxed text-zinc-200">
          Yes — 120+ countries, tracked in 2–4 days. Want me to quote your cart?
        </p>
        <span className="mt-1.5 flex gap-[3px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1 w-1 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </span>
      </div>
      <p className="pl-1 text-[0.6rem] font-medium text-zinc-500">Answered in 1.2s · no human needed</p>
    </div>
  );
}

function OrderVisual() {
  return (
    <div className="w-full max-w-[240px] rounded-2xl border border-char-700/60 bg-char-950/70 p-3.5 shadow-xl">
      <div className="flex gap-1.5">
        {["Plans", "Add-ons", "Services"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full px-2.5 py-1 text-[0.6rem] font-semibold transition-colors ${
              i === 0 ? "bg-violet-600 text-white" : "border border-char-700 text-zinc-500"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
      {[
        ["Pro Plan — annual", "$240"],
        ["Team seat", "$19/mo"],
        ["Consulting · 1h", "$130"],
      ].map(([n, p]) => (
        <div key={n} className="mt-2.5 flex items-center justify-between rounded-xl border border-char-700/60 bg-char-800/40 px-3 py-2 transition-colors duration-300 hover:border-violet-500/40">
          <div>
            <p className="text-[0.72rem] font-semibold text-zinc-200">{n}</p>
            <p className="text-[0.6rem] text-violet-400">{p}</p>
          </div>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-500/15 text-[0.8rem] font-bold leading-none text-violet-400">
            +
          </span>
        </div>
      ))}
    </div>
  );
}

function DashVisual() {
  return (
    <div className="w-full max-w-[220px] rounded-2xl border border-char-700/60 bg-char-950/70 p-3.5 shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text-[0.7rem] font-bold text-zinc-100">Order #1044</p>
        <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[0.56rem] font-bold text-violet-400">NEW</span>
      </div>
      <p className="mt-1 text-[0.62rem] text-zinc-500">Consulting block · 5h — $650</p>
      <div className="mt-2.5 flex items-center gap-2 border-t border-char-700/60 pt-2.5">
        <span className="flex h-3 items-end gap-[2px]">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="eq-bar w-[3px] rounded-full bg-violet-400" style={{ height: "100%", animationDelay: `${i * 0.13}s` }} />
          ))}
        </span>
        <span className="text-[0.58rem] font-medium text-violet-400">alert fired · 0.0s</span>
      </div>
    </div>
  );
}

function UpsellVisual() {
  return (
    <div className="w-full max-w-[220px] rounded-2xl border border-char-700/60 bg-char-950/70 p-3.5 shadow-xl">
      <p className="text-[0.62rem] font-semibold uppercase tracking-wider text-zinc-500">Suggested add-on</p>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-violet-500/25 bg-violet-500/10 px-3 py-2.5">
        <div>
          <p className="text-[0.72rem] font-semibold text-zinc-100">Priority support</p>
          <p className="text-[0.6rem] text-violet-400">+$29 · accepted by 38% of buyers</p>
        </div>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-[0.7rem] font-bold text-white">
          +
        </span>
      </div>
    </div>
  );
}

function InsightsVisual() {
  const items = [
    { n: "Pro Plan — annual", s: "342 sold", p: "92%" },
    { n: "Team seats", s: "289 sold", p: "78%" },
    { n: "Consulting blocks", s: "244 sold", p: "66%" },
  ];
  return (
    <div className="grid w-full gap-3 sm:grid-cols-[1fr_auto]">
      <div className="space-y-2.5">
        {items.map((it) => (
          <div key={it.n} className="rounded-xl border border-char-700/60 bg-char-950/60 px-4 py-3 transition-colors hover:border-violet-500/30">
            <div className="flex items-center justify-between">
              <p className="text-[0.78rem] font-semibold text-zinc-200">{it.n}</p>
              <p className="text-[0.68rem] font-medium text-violet-400">{it.s}</p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-char-700/50">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-700 to-violet-500" style={{ width: it.p }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-2 rounded-xl border border-char-700/60 bg-char-950/60 px-5 py-4 sm:w-44">
        <p className="text-[0.62rem] uppercase tracking-wider text-zinc-500">This week</p>
        <p className="font-display text-2xl font-bold text-zinc-50">$48,420</p>
        <p className="text-[0.68rem] font-semibold text-emerald-400">↑ 22% vs last week</p>
      </div>
    </div>
  );
}

function ReengageVisual() {
  return (
    <div className="w-full max-w-[250px] rounded-2xl border border-char-700/60 bg-char-950/70 p-3.5 shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-[0.7rem] font-bold text-zinc-100">Win-back · Q1</p>
        <span className="rounded-full bg-emerald-400/12 px-2 py-0.5 text-[0.56rem] font-bold text-emerald-400">SENT</span>
      </div>
      <p className="mt-1 text-[0.62rem] text-zinc-500">“We saved your cart — it's 15% off today.”</p>
      <div className="mt-2.5 grid grid-cols-3 gap-2 border-t border-char-700/60 pt-2.5 text-center">
        {[
          ["1,240", "sent"],
          ["389", "reopened"],
          ["$4.2k", "won back"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-display text-[0.8rem] font-bold text-violet-400">{v}</p>
            <p className="text-[0.56rem] text-zinc-500">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const VISUAL: Record<FeatureKey, () => ReactNode> = {
  ai: AiVisual,
  order: OrderVisual,
  dashboard: DashVisual,
  upsell: UpsellVisual,
  insights: InsightsVisual,
  reengage: ReengageVisual,
};

const SPAN: Record<FeatureKey, string> = {
  ai: "lg:col-span-4",
  order: "lg:col-span-2",
  dashboard: "lg:col-span-2",
  upsell: "lg:col-span-2",
  insights: "lg:col-span-2",
  reengage: "lg:col-span-6",
};

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-violet-600/[0.04] blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Everything included"
          title="One platform,"
          accent="zero"
          tail="busywork."
          sub="Every tool your customer journey needs — ordering, answers, fulfillment, and growth — wired together so nothing falls through the cracks."
        />

        <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6" step={0.08}>
          {FEATURES.map((f) => {
            const Visual = VISUAL[f.icon];
            const wide = f.icon === "ai";
            const full = f.icon === "reengage";
            return (
              <StaggerItem
                key={f.title}
                className={`${SPAN[f.icon]} ${full || wide ? "sm:col-span-2" : ""}`}
              >
                <article
                  className={`group glass relative h-full overflow-hidden rounded-[1.25rem] border border-char-700/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)] ${
                    full || wide ? "lg:flex lg:items-center lg:gap-10" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/[0.05] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className={wide || full ? "max-w-md" : ""}>
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-400 transition-all duration-300 group-hover:scale-105 group-hover:border-violet-500/40">
                        {ICONS[f.icon]({ className: "h-6 w-6" })}
                      </span>
                      <span className="rounded-full border border-char-700 bg-char-800/80 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-zinc-400 transition-colors duration-300 group-hover:border-violet-500/40 group-hover:text-violet-400">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-zinc-50">
                      {f.title}
                    </h3>
                    <p className="mt-2.5 text-[0.95rem] leading-relaxed text-zinc-400">{f.desc}</p>
                  </div>

                  <div className={`relative z-10 ${wide || full ? "mt-6 lg:mt-0 lg:w-auto lg:shrink-0" : "mt-6"}`}>
                    <Visual />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
