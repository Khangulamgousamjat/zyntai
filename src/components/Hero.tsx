import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Embers from "./Embers";
import FluidBg from "./FluidBg";
import { TICKER_ORDERS } from "../lib/data";
import { EASE, Magnetic } from "../lib/motion";
import {
  IconPlay,
  IconArrow,
  IconStar,
  IconBell,
  IconSound,
  IconUpsell,
  IconX,
  IconBolt,
  IconCheck,
  IconTrack,
  IconChart,
} from "../lib/icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } },
};
const word: Variants = {
  hidden: { y: "112%", rotate: 5 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: EASE as unknown as number[] } },
};

function MaskedWord({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span
        variants={word}
        className={`inline-block will-change-transform ${
          accent ? "font-accent italic font-normal text-amber-300 text-[1.06em]" : ""
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

const HEADLINE: { t: string; accent?: boolean; br?: boolean }[] = [
  { t: "Turn" },
  { t: "conversations", accent: true },
  { t: "into", br: true },
  { t: "customers.", accent: true },
];

const STATUS_STYLE: Record<string, string> = {
  New: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  Processing: "bg-orange-500/10 text-orange-300 border-orange-400/25",
  Paid: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25",
};

function DashboardMockup() {
  const reduce = useReducedMotion();
  const [orders, setOrders] = useState(
    TICKER_ORDERS.slice(0, 4).map((o, i) => ({ ...o, key: i }))
  );
  const [revenue, setRevenue] = useState(4182);
  const idx = useRef(4);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      const next = TICKER_ORDERS[idx.current % TICKER_ORDERS.length];
      idx.current += 1;
      setOrders((prev) => [{ ...next, key: idx.current + 100 }, ...prev].slice(0, 4));
      setRevenue((r) => r + Math.round(28 + Math.random() * 62));
    }, 3400);
    return () => clearInterval(t);
  }, [reduce]);

  const bars = [36, 48, 42, 58, 52, 66, 60, 74, 69, 85, 78, 91, 88, 100];
  const days = ["M", "T", "W", "T", "F", "S", "S", "M", "T", "W", "T", "F", "S", "S"];

  return (
    <motion.div
      id="demo"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 70, rotateX: 7 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, ease: EASE as unknown as number[] }}
      style={{ transformPerspective: 1200 }}
      className="relative mx-auto w-full max-w-5xl"
    >
      {/* glow behind */}
      <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_35%,rgba(245,158,11,0.18),transparent_70%)] blur-2xl" />

      <div className="glass relative overflow-hidden rounded-[1.25rem] shadow-[0_40px_120px_-24px_rgba(15,17,21,0.45)]">
        {/* chrome bar */}
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-full border border-white/[0.07] bg-char-950/70 px-4 py-1 text-[0.72rem] text-zinc-500">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            app.zyntai.com/orders
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 text-[0.68rem] font-semibold text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />
            LIVE
          </span>
        </div>

        <div className="grid grid-cols-[auto_1fr]">
          {/* sidebar */}
          <div className="hidden w-14 flex-col items-center gap-5 border-r border-white/[0.06] py-5 sm:flex">
            {["grid", "menu", "chat", "chart", "gear"].map((k, i) => (
              <span
                key={k}
                className={`grid h-9 w-9 place-items-center rounded-xl ${
                  i === 0 ? "bg-amber-400/15 text-amber-300" : "text-zinc-600"
                }`}
              >
                {k === "grid" && (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="4" y="4" width="7" height="7" rx="1.6" />
                    <rect x="13" y="4" width="7" height="7" rx="1.6" />
                    <rect x="4" y="13" width="7" height="7" rx="1.6" />
                    <rect x="13" y="13" width="7" height="7" rx="1.6" />
                  </svg>
                )}
                {k === "menu" && (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M5 6h14M5 12h14M5 18h9" />
                  </svg>
                )}
                {k === "chat" && (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-.8 3.4A8 8 0 0 1 21 12Z" />
                  </svg>
                )}
                {k === "chart" && (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M5 20V10M12 20V4M19 20v-7" />
                  </svg>
                )}
                {k === "gear" && (
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <circle cx="12" cy="12" r="3.2" />
                    <path d="M12 3.5v2.4M12 18.1v2.4M3.5 12h2.4M18.1 12h2.4M6 6l1.7 1.7M16.3 16.3 18 18M18 6l-1.7 1.7M7.7 16.3 6 18" />
                  </svg>
                )}
              </span>
            ))}
          </div>

          {/* main */}
          <div className="p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-display text-sm font-semibold text-zinc-100">Nova Studio — live orders</p>
                <p className="text-[0.72rem] text-zinc-500">Dashboard · updated just now</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5">
                <IconSound className="h-3.5 w-3.5 text-amber-300" />
                <span className="flex h-3.5 items-end gap-[3px]">
                  {[0.9, 0.5, 1, 0.65, 0.8].map((d, i) => (
                    <span
                      key={i}
                      className="eq-bar w-[3px] rounded-full bg-amber-400"
                      style={{ height: "100%", animationDelay: `${i * 0.12}s`, animationDuration: `${d}s` }}
                    />
                  ))}
                </span>
                <span className="text-[0.68rem] font-medium text-zinc-400">Instant alerts on</span>
              </div>
            </div>

            {/* KPI row */}
            <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: "Today's revenue", val: `$${revenue.toLocaleString()}`, delta: "+18%", live: true },
                { label: "Orders", val: `${96 + (idx.current - 4)}`, delta: "+12%" },
                { label: "Avg. order", val: "$43.50", delta: "+6%" },
                { label: "Avg. response", val: "1m 20s", delta: "−40s" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3.5 transition-colors hover:border-amber-400/25"
                >
                  <p className="text-[0.68rem] uppercase tracking-wider text-zinc-500">{k.label}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-lg font-bold text-zinc-50 sm:text-xl">{k.val}</span>
                    <span className={`text-[0.66rem] font-semibold ${k.delta.startsWith("−") ? "text-emerald-300" : "text-amber-300"}`}>
                      {k.delta}
                    </span>
                    {k.live && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" />}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
              {/* chart */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-[0.8rem] font-semibold text-zinc-200">Revenue · last 14 days</p>
                  <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[0.64rem] font-semibold text-amber-300">
                    Peak: Sat $2.4k
                  </span>
                </div>
                <div className="flex h-32 items-end gap-[5px] sm:gap-2">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={reduce ? { opacity: 0 } : { scaleY: 0.06 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.05 * i, ease: EASE as unknown as number[] }}
                      style={{ height: `${h}%`, transformOrigin: "bottom" }}
                      className={`group relative flex-1 rounded-t-md ${
                        i === bars.length - 1
                          ? "bg-gradient-to-t from-orange-500 to-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.45)]"
                          : "bg-gradient-to-t from-amber-500/25 to-amber-400/70 group-hover:to-amber-300"
                      } transition-colors`}
                    >
                      <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-char-950 px-1.5 py-0.5 text-[0.58rem] text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100">
                        {days[i]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* live feed */}
              <div className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-display text-[0.8rem] font-semibold text-zinc-200">Incoming orders</p>
                  <span className="flex items-center gap-1.5 text-[0.66rem] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                    streaming
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <AnimatePresence initial={false} mode="popLayout">
                    {orders.map((o) => (
                      <motion.div
                        key={o.key}
                        layout
                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: -22, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.45, ease: EASE as unknown as number[] }}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-char-950/60 px-3 py-2.5"
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-400/12 text-amber-300">
                          <IconBell className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.78rem] font-semibold text-zinc-100">
                            {o.id} · {o.item}
                          </p>
                          <p className="text-[0.66rem] text-zinc-500">{o.meta}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.78rem] font-bold text-zinc-100">{o.total}</p>
                          <span className={`mt-0.5 inline-block rounded-full border px-1.5 py-[1px] text-[0.58rem] font-semibold ${STATUS_STYLE[o.status]}`}>
                            {o.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* floating chips around the mockup */
function FloatChips() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.7, ease: EASE as unknown as number[] }}
        className="glass absolute -left-8 top-16 z-10 hidden items-center gap-2.5 rounded-xl px-4 py-3 shadow-xl md:flex animate-float-slow"
        style={{ "--tilt": "-3deg" } as React.CSSProperties}
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
          <IconBell className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-[0.74rem] font-semibold text-zinc-100">New order · #1042</p>
          <p className="text-[0.66rem] text-zinc-500">Pro Plan — annual · $240</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE as unknown as number[] }}
        className="glass absolute -right-6 top-1/3 z-10 hidden items-center gap-2 rounded-xl px-4 py-3 shadow-xl lg:flex animate-float-slower"
        style={{ "--tilt": "2.5deg" } as React.CSSProperties}
      >
        <IconUpsell className="h-4.5 w-4.5 text-amber-300" />
        <div>
          <p className="text-[0.74rem] font-semibold text-zinc-100">+24% order value</p>
          <p className="text-[0.66rem] text-zinc-500">smart upsells this week</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3, duration: 0.7, ease: EASE as unknown as number[] }}
        className="glass absolute -bottom-6 left-14 z-10 hidden items-center gap-2.5 rounded-xl px-4 py-3 shadow-xl lg:flex animate-float-slow"
        style={{ "--tilt": "1.5deg", animationDelay: "1.2s" } as React.CSSProperties}
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <IconCheck className="h-4 w-4" />
        </span>
        <p className="text-[0.74rem] font-semibold text-zinc-100">
          Order #1041 fulfilled <span className="text-zinc-500">· customer notified</span>
        </p>
      </motion.div>
    </>
  );
}

function RotatingBadge() {
  return (
    <div className="absolute -right-9 -top-9 z-10 hidden h-28 w-28 lg:block animate-spin-slow">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="circ" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        </defs>
        <circle cx="50" cy="50" r="49" className="fill-char-900/80 stroke-white/10" />
        <text className="fill-amber-300/90 text-[8.2px] font-semibold uppercase tracking-[0.32em]">
          <textPath href="#circ">zyntai · customer os · since 2024 ·</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <IconBolt className="h-6 w-6 text-amber-400" />
      </span>
    </div>
  );
}

/* ---------- demo modal ---------- */
const SLIDES = [
  {
    title: "Your catalog, online in minutes",
    desc: "Upload a spreadsheet — Zyntai builds a beautiful, branded order page with your logo, colors, and pricing.",
    icon: IconCheck,
    visual: "menu",
  },
  {
    title: "Orders land instantly",
    desc: "Your dashboard chimes, every order queues by priority, and nothing slips through the cracks.",
    icon: IconBell,
    visual: "bell",
  },
  {
    title: "Customers stay in the loop",
    desc: "Live status pages and instant updates cut “where's my order?” tickets by 68%.",
    icon: IconTrack,
    visual: "track",
  },
  {
    title: "Watch revenue climb",
    desc: "Smart upsells and re-engagement run on autopilot — most teams see +24% order value.",
    icon: IconChart,
    visual: "chart",
  },
];

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [slide, setSlide] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    setSlide(0);
    document.body.style.overflow = "hidden";
    let t: number | undefined;
    if (!reduce) {
      t = window.setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 4000);
    }
    return () => {
      window.clearInterval(t);
      document.body.style.overflow = "";
    };
  }, [open, reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const s = SLIDES[slide];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] grid place-items-center bg-char-950/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: EASE as unknown as number[] }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-lg overflow-hidden rounded-[1.25rem] p-7 shadow-2xl sm:p-9"
          >
            <button
              onClick={onClose}
              aria-label="Close demo"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-amber-400/40 hover:text-amber-300"
            >
              <IconX className="h-4 w-4" />
            </button>

            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-amber-300">
              60-second tour · {slide + 1}/{SLIDES.length}
            </p>

            <div className="mt-5 grid h-40 place-items-center rounded-xl border border-white/[0.07] bg-char-950/60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 text-(--zy-amber-ink) shadow-[0_0_36px_rgba(245,158,11,0.4)]">
                    <s.icon className="h-7 w-7" />
                  </span>
                  {s.visual === "track" && (
                    <div className="flex items-center gap-1.5">
                      {["Received", "Processing", "Done"].map((t, i) => (
                        <span
                          key={t}
                          className={`rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold ${
                            i === 1 ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-white/10 text-zinc-500"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {s.visual === "chart" && (
                    <div className="flex h-8 items-end gap-1.5">
                      {[40, 65, 50, 85, 100].map((h, i) => (
                        <motion.span
                          key={i}
                          initial={{ scaleY: 0.2 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.5 }}
                          style={{ height: h, transformOrigin: "bottom" }}
                          className="w-4 rounded-t bg-gradient-to-t from-orange-500 to-amber-300"
                        />
                      ))}
                    </div>
                  )}
                  {s.visual === "bell" && (
                    <span className="flex h-6 items-end gap-1">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <span key={i} className="eq-bar w-1.5 rounded-full bg-amber-400" style={{ height: "100%", animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </span>
                  )}
                  {s.visual === "menu" && (
                    <div className="flex gap-2">
                      {["Plans", "Add-ons", "Services"].map((t, i) => (
                        <span key={t} className={`rounded-full border px-3 py-1 text-[0.64rem] font-semibold ${i === 0 ? "border-amber-400/40 bg-amber-400/10 text-amber-300" : "border-white/10 text-zinc-500"}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-display mt-5 text-xl font-bold text-zinc-50">{s.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-zinc-400">{s.desc}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === slide ? "w-8 bg-amber-400" : "w-3 bg-white/15 hover:bg-white/30"
                    }`}
                  />
                ))}
              </div>
              <Link to="/signup" onClick={onClose} className="btn btn-primary px-4 py-2 text-[0.82rem]">
                Try it free <IconArrow className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- hero ---------- */
export default function Hero({ introReady = true }: { introReady?: boolean }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const yMockup = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const fadeContent = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-36 sm:pt-44">
      {/* layered backdrop */}
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(75%_65%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.16),transparent)] blur-xl" />
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-orange-400/[0.08] blur-2xl" />
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-amber-500/[0.08] blur-2xl" />
      </div>
      <FluidBg className="opacity-60" />
      <Embers />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div className="max-w-5xl" style={{ y: yContent, opacity: fadeContent }}>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE as unknown as number[] }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-amber-400/15 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse-dot" /> Live
            </span>
            <span className="text-[0.82rem] text-zinc-400">
              Now powering <span className="font-semibold text-zinc-200">12,000+ businesses</span>
            </span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate={introReady ? "show" : "hidden"}
            className="font-display text-[2.75rem] font-bold leading-[1.04] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl xl:text-[4.9rem]"
          >
            {HEADLINE.map((w, i) => (
              <span key={i}>
                {w.br && <br className="hidden md:block" />}
                <MaskedWord accent={w.accent}>{w.t}</MaskedWord>{" "}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: EASE as unknown as number[] }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            Zyntai is the AI-powered platform where customers{" "}
            <span className="text-zinc-200">browse, order, and get answers in seconds</span> — while
            you automate the busywork and grow revenue.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: EASE as unknown as number[] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link to="/signup" className="btn btn-primary group relative overflow-hidden px-7 py-3.5 text-[0.98rem]">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Start free trial
                <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
            <button onClick={() => setDemoOpen(true)} className="btn btn-ghost group px-6 py-3.5 text-[0.98rem] font-semibold">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-400/15 text-amber-300 transition-transform duration-300 group-hover:scale-110">
                <IconPlay className="h-3.5 w-3.5 translate-x-[1px]" />
              </span>
              Watch 60s demo
            </button>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8, ease: EASE as unknown as number[] }}
            className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <div className="flex -space-x-2.5">
              {["ML", "DR", "AO", "JK"].map((ini, i) => (
                <span
                  key={ini}
                  className={`grid h-9 w-9 place-items-center rounded-full border-2 border-char-950 text-[0.62rem] font-bold text-(--zy-amber-ink) ${
                    ["bg-amber-300", "bg-orange-400", "bg-amber-200", "bg-orange-300"][i]
                  }`}
                >
                  {ini}
                </span>
              ))}
              <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-char-950 bg-char-800 text-[0.6rem] font-bold text-amber-300">
                12k+
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-3.5 w-3.5" />
                ))}
                <span className="ml-1.5 text-[0.8rem] font-semibold text-zinc-200">4.9/5</span>
              </div>
              <p className="mt-0.5 text-[0.8rem] text-zinc-500">
                Trusted by <span className="font-semibold text-amber-300/90">12,000+ businesses</span> · no credit card required
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* mockup */}
        <motion.div style={{ y: yMockup }} className="relative mt-16 pb-10 sm:mt-20 lg:pb-16">
          <FloatChips />
          <RotatingBadge />
          <DashboardMockup />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-8 flex items-center justify-center gap-2 text-[0.78rem] text-zinc-600"
          >
            <span className="inline-block h-4 w-4 animate-bob">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v14m0 0-5-5m5 5 5-5" />
              </svg>
            </span>
            Live product preview — orders stream in every few seconds
          </motion.p>
        </motion.div>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
