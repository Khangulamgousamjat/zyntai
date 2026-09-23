import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Embers from "./Embers";
import FluidBg from "./FluidBg";
import { EASE, Magnetic } from "../lib/motion";
import {
  IconPlay,
  IconArrow,
  IconStar,
  IconBolt,
  IconChart,
  IconX,
} from "../lib/icons";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};
const word: Variants = {
  hidden: { y: "112%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.85, ease: EASE as unknown as number[] } },
};

function MaskedWord({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span
        variants={word}
        className={`inline-block will-change-transform ${
          accent
            ? "font-accent italic font-normal text-violet-600 dark:text-violet-400 text-[1.06em]"
            : "text-headline-main font-bold"
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

/* Demo modal */
function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: EASE as unknown as number[] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 dark:border-char-700 bg-white dark:bg-char-900 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-char-700 px-5 py-3.5">
              <span className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Zyntai 60-Second Overview
              </span>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-char-800 hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-zinc-950">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Product walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* AI Conversational & Analytics Showcase Mockup */
function HeroShowcase() {
  const reduce = useReducedMotion();
  const [selectedOption, setSelectedOption] = useState<string>("Bracelets");
  const options = ["Bracelets", "Sunglasses", "Earrings", "Other"];

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: EASE as unknown as number[] }}
      className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
    >
      {/* Glow behind */}
      <div className="absolute -inset-4 sm:-inset-8 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_35%,rgba(124,58,237,0.18),transparent_70%)] blur-2xl pointer-events-none" />

      {/* Main layout container */}
      <div className="relative flex flex-col items-center lg:items-start xl:items-center">
        {/* Chat card */}
        <div className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-[1.75rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111113] p-4 sm:p-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] transition-all">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-violet-600 text-white font-bold text-xs shadow-xs">
                Z
              </span>
              <div>
                <h4 className="font-display text-[0.88rem] font-bold text-zinc-900 dark:text-zinc-100 leading-none">
                  Zyntai AI
                </h4>
                <span className="mt-0.5 flex items-center gap-1 text-[0.68rem] font-medium text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button className="grid h-7 w-7 place-items-center rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <circle cx="5" cy="12" r="1.8" />
                <circle cx="12" cy="12" r="1.8" />
                <circle cx="19" cy="12" r="1.8" />
              </svg>
            </button>
          </div>

          {/* Conversation stream */}
          <div className="mt-3.5 space-y-2.5 text-[0.8rem] sm:text-[0.84rem]">
            {/* User message 1 */}
            <div className="flex justify-start">
              <div className="max-w-[84%] rounded-2xl rounded-tl-xs chat-user-bubble px-3.5 py-2.5 leading-relaxed shadow-xs">
                Hi! I'm looking for a customized gift for my friend. Can you help?
              </div>
            </div>

            {/* AI message 1 */}
            <div className="flex justify-end">
              <div className="max-w-[84%] rounded-2xl rounded-tr-xs bg-violet-600 px-3.5 py-2.5 text-white font-medium leading-relaxed shadow-sm">
                Of course! 🎁 What type of item are you looking for?
              </div>
            </div>

            {/* Option pills */}
            <div className="flex flex-wrap items-center justify-end gap-1.5 py-0.5">
              {options.map((opt) => {
                const active = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`rounded-full px-3 py-1 text-[0.72rem] font-medium transition-all ${
                      active
                        ? "border border-violet-500 bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 font-semibold shadow-xs"
                        : "border border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-[#18181B] text-zinc-700 dark:text-zinc-300 hover:border-violet-400 hover:text-violet-600"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* User message 2 */}
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-tl-xs chat-user-bubble px-3.5 py-2 leading-relaxed shadow-xs">
                A bracelet with her name.
              </div>
            </div>

            {/* AI message 2 */}
            <div className="flex justify-end">
              <div className="max-w-[88%] rounded-2xl rounded-tr-xs bg-violet-600 px-3.5 py-2 text-white font-medium leading-relaxed shadow-sm">
                Great choice! Here are some options for you ✨
              </div>
            </div>

            {/* Product cards row */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {/* Product 1 */}
              <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B] p-1.5 transition-all hover:border-violet-500 hover:shadow-xs">
                <div className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-amber-500/5">
                  <svg viewBox="0 0 120 70" className="h-full w-full">
                    <path d="M10 35 C 25 15, 40 25, 50 35 C 60 45, 75 55, 110 35" fill="none" stroke="#D97706" strokeWidth="1.8" strokeDasharray="3 2" />
                    <text x="60" y="38" textAnchor="middle" fill="#D97706" fontSize="13" fontFamily="cursive" fontWeight="bold">Always</text>
                  </svg>
                </div>
                <div className="mt-1 px-1">
                  <p className="truncate text-[0.68rem] font-semibold text-headline-main">Name Cuff</p>
                  <p className="text-[0.62rem] font-bold text-violet-600 dark:text-violet-400">₹1,499</p>
                </div>
              </div>

              {/* Product 2 */}
              <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B] p-1.5 transition-all hover:border-violet-500 hover:shadow-xs">
                <div className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-rose-500/5">
                  <svg viewBox="0 0 120 70" className="h-full w-full">
                    <ellipse cx="60" cy="35" rx="36" ry="18" fill="none" stroke="#E11D48" strokeWidth="5" strokeDasharray="7 4" />
                    <ellipse cx="60" cy="35" rx="36" ry="18" fill="none" stroke="#F59E0B" strokeWidth="5" strokeDasharray="2 9" />
                  </svg>
                </div>
                <div className="mt-1 px-1">
                  <p className="truncate text-[0.68rem] font-semibold text-headline-main">Coral Bead</p>
                  <p className="text-[0.62rem] font-bold text-violet-600 dark:text-violet-400">₹899</p>
                </div>
              </div>

              {/* Product 3 */}
              <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#18181B] p-1.5 transition-all hover:border-violet-500 hover:shadow-xs">
                <div className="relative flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-500/5">
                  <svg viewBox="0 0 120 70" className="h-full w-full">
                    <path d="M15 35 C 30 18, 50 20, 60 30 C 70 20, 90 18, 105 35" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 3" />
                    <path d="M60 33 C 58 26, 50 27, 50 33 C 50 39, 60 46, 60 46 C 60 46, 70 39, 70 33 C 70 27, 62 26, 60 33 Z" fill="none" stroke="#94A3B8" strokeWidth="1.8" />
                  </svg>
                </div>
                <div className="mt-1 px-1">
                  <p className="truncate text-[0.68rem] font-semibold text-headline-main">Heart Link</p>
                  <p className="text-[0.62rem] font-bold text-violet-600 dark:text-violet-400">₹1,299</p>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="mt-3 flex items-center justify-between rounded-full border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-[#18181B] px-3.5 py-1.5 shadow-xs">
              <span className="text-[0.76rem] text-body-muted">Type a message...</span>
              <button
                aria-label="Send"
                className="grid h-6 w-6 place-items-center rounded-full bg-violet-600 text-white shadow-xs transition-transform hover:scale-110 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-px" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Side Cards (Desktop & Tablet) */}
        <div className="hidden sm:block">
          {/* Total Sales Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="absolute -top-3 -right-2 md:-right-6 lg:-right-8 xl:-right-10 z-20 w-44 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#111113]/95 p-3.5 shadow-xl backdrop-blur-md"
          >
            <p className="text-[0.68rem] font-medium text-body-muted">Total Sales</p>
            <p className="mt-0.5 text-[1.18rem] font-bold tracking-tight text-headline-main">₹ 2,48,900</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="flex items-center text-[0.72rem] font-semibold text-emerald-500">
                ↑ 32%
              </span>
              <div className="flex items-end gap-1.5">
                {[35, 60, 48, 80, 100].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h * 0.26}px` }}
                    className="w-2 rounded-t-xs bg-gradient-to-t from-violet-600 to-violet-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Metric Card 1: 12,000+ Active Businesses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className="absolute top-28 -right-2 md:-right-6 lg:-right-8 xl:-right-10 z-20 flex w-48 items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#111113]/95 p-3 shadow-lg backdrop-blur-md"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <div>
              <p className="text-[0.84rem] font-bold text-headline-main leading-tight">12,000+</p>
              <p className="text-[0.68rem] text-body-muted">Active Businesses</p>
            </div>
          </motion.div>

          {/* Metric Card 2: 98% Customer Satisfaction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="absolute top-48 -right-2 md:-right-6 lg:-right-8 xl:-right-10 z-20 flex w-48 items-center gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#111113]/95 p-3 shadow-lg backdrop-blur-md"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </span>
            <div>
              <p className="text-[0.84rem] font-bold text-headline-main leading-tight">98%</p>
              <p className="text-[0.68rem] text-body-muted">Customer Satisfaction</p>
            </div>
          </motion.div>

          {/* Handwritten Annotation: Automate Engage Grow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="absolute -bottom-6 right-0 sm:right-2 lg:-right-4 select-none pointer-events-none z-20 flex flex-col items-center"
          >
            <svg viewBox="0 0 100 60" className="w-16 h-10 text-violet-500/80 -rotate-12 mb-0.5">
              <path d="M80 50 C 50 45, 25 35, 12 15 M 12 15 L 14 26 M 12 15 L 24 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="font-accent italic text-lg sm:text-xl font-bold leading-tight text-violet-600 dark:text-violet-300 drop-shadow-xs">
              <span className="block transform -rotate-4">Automate</span>
              <span className="block transform rotate-2 pl-2">Engage</span>
              <span className="block transform -rotate-3 pl-4">Grow</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero({ introReady = true }: { introReady?: boolean }) {
  const reduce = useReducedMotion();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40">
      {/* Background Lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[650px] w-[950px] -translate-x-1/2 rounded-full bg-violet-600/[0.07] blur-[140px]" />
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-violet-500/[0.04] blur-2xl" />
        <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-violet-700/[0.04] blur-2xl" />
      </div>
      <FluidBg className="opacity-35" />
      <Embers />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headline, Subtitle, CTAs, 3 Value Props */}
          <div className="lg:col-span-6 xl:col-span-5">
            {/* Live pill badge */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE as unknown as number[] }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-zinc-200 dark:border-char-700 bg-white/90 dark:bg-char-900/80 py-1.5 pl-2 pr-4 shadow-xs backdrop-blur-md"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-violet-100 dark:bg-violet-500/15 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse-dot" /> LIVE
              </span>
              <span className="text-[0.82rem] text-body-main">
                Now powering <span className="font-semibold text-headline-main">12,000+ businesses</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={container}
              initial="hidden"
              animate={introReady ? "show" : "hidden"}
              className="font-display text-[2.75rem] font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.2rem]"
            >
              <span className="block">
                <MaskedWord>Turn</MaskedWord>{" "}
                <MaskedWord accent>conversations</MaskedWord>
              </span>
              <span className="block mt-1 sm:mt-2">
                <MaskedWord>into</MaskedWord>{" "}
                <MaskedWord accent>customers.</MaskedWord>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE as unknown as number[] }}
              className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-body-main sm:text-[1.08rem]"
            >
              Zyntai is the AI-powered platform where customers{" "}
              <span className="font-semibold text-headline-main">browse, order, and get answers in seconds</span> — while
              you automate the busywork and grow revenue.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8, ease: EASE as unknown as number[] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Link to="/signup" className="btn btn-primary group relative overflow-hidden rounded-xl px-7 py-3.5 text-[0.95rem] font-medium shadow-md">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Start free trial
                  <IconArrow className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <button
                onClick={() => setDemoOpen(true)}
                className="btn group flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-char-700 bg-zinc-100/90 dark:bg-char-800/80 px-6 py-3.5 text-[0.95rem] font-semibold text-zinc-800 dark:text-zinc-200 shadow-xs transition-colors hover:bg-zinc-200/80 dark:hover:bg-char-700"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 transition-transform duration-300 group-hover:scale-110">
                  <IconPlay className="h-3 w-3 translate-x-px" />
                </span>
                Watch 60s demo
              </button>
            </motion.div>

            {/* 3 Value Props (Quick setup, Boost sales, Happier customers) */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: EASE as unknown as number[] }}
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200/80 dark:border-char-700/60"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
                  <IconBolt className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.82rem] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Quick setup</p>
                  <p className="text-[0.72rem] text-zinc-500 dark:text-zinc-400">Get started in minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
                  <IconChart className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[0.82rem] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Boost sales</p>
                  <p className="text-[0.72rem] text-zinc-500 dark:text-zinc-400">Turn chats into revenue</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-[0.82rem] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Happier customers</p>
                  <p className="text-[0.72rem] text-zinc-500 dark:text-zinc-400">24/7 AI support</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: AI Conversational & Analytics Showcase Mockup */}
          <div className="lg:col-span-6 xl:col-span-7 pt-4 lg:pt-0">
            <HeroShowcase />
          </div>

        </div>
      </div>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
