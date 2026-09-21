import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, Reveal } from "../lib/motion";
import { Logo, IconArrow, IconCheck, IconBird, IconInstagram, IconLinkedIn, IconSpark } from "../lib/icons";
import { useGotoLanding } from "./Layout";

/* ---------------- final CTA ---------------- */
export function FinalCta() {
  const reduce = useReducedMotion();
  return (
    <section id="cta" className="relative px-5 py-14 sm:px-8 sm:py-20">
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 56, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: EASE as unknown as number[] }}
        className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 px-6 py-20 text-center shadow-[0_40px_140px_-30px_rgba(245,158,11,0.55)] sm:px-16 sm:py-24"
      >
        {/* decorative rings & sparks */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[22px] border-white/15" />
        <div className="pointer-events-none absolute -bottom-28 -right-16 h-80 w-80 rounded-full border-[28px] border-char-950/[0.07]" />
        <IconSpark className="pointer-events-none absolute left-[12%] top-10 h-8 w-8 animate-spin-slow text-(--zy-amber-ink)/25" />
        <IconSpark className="pointer-events-none absolute bottom-12 right-[14%] h-6 w-6 animate-spin-slow text-white/40" style={{ animationDirection: "reverse" }} />

        <Reveal>
          <p className="font-display text-[0.72rem] font-bold uppercase tracking-[0.3em] text-(--zy-amber-ink)/60">
            Your next quarter could be different
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-balance text-4xl font-bold leading-[1.04] tracking-tight text-(--zy-amber-ink) sm:text-6xl">
            Ready to grow your <em className="font-accent font-normal italic">business?</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-(--zy-amber-ink)/75">
            Join 12,000+ businesses taking more orders with less chaos. Set up tonight, sell smarter
            tomorrow.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/signup" className="btn btn-dark group px-8 py-4 text-[1rem]">
              Get started now
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="text-[0.82rem] font-semibold text-(--zy-amber-ink)/60">Start free. No credit card. Cancel anytime.</p>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ---------------- footer ---------------- */
const FOOTER_COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "#testimonials" },
      { label: "Live demo", href: "#demo" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL: { label: string; href?: string }[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Settings" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);
  const gotoLanding = useGotoLanding();

  const linkProps = (href: string) => {
    if (href.startsWith("/") || href.startsWith("mailto:")) return null; // handled separately
    return {
      href,
      onClick: (e: ReactMouseEvent) => {
        e.preventDefault();
        gotoLanding(href.slice(1));
      },
    };
  };

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3400);
  };

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      showToast("Hmm — that email doesn't look right.");
      return;
    }
    setSubscribed(true);
    showToast("You're on the list. First digest lands Friday. 🎉");
  };

  return (
    <footer className="liquid-glass relative border-t">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <a
              href="#top"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault();
                gotoLanding("top");
              }}
            >
              <Logo />
            </a>
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-zinc-500">
              The AI-powered platform for taking orders, automating busywork, and growing revenue.
            </p>
            <div className="mt-6 flex items-center gap-3">
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

          {FOOTER_COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.2em] text-zinc-400">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => {
                  const cls =
                    "link-underline text-[0.92rem] text-zinc-500 transition-colors hover:text-amber-300";
                  return (
                    <li key={l.label}>
                      {l.href.startsWith("/") ? (
                        <Link to={l.href} className={cls}>
                          {l.label}
                        </Link>
                      ) : (
                        <a {...(linkProps(l.href) ?? { href: l.href })} className={cls}>
                          {l.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          <div>
            <p className="font-display text-[0.78rem] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Growth notes
            </p>
            <p className="mt-5 text-[0.92rem] leading-relaxed text-zinc-500">
              One sharp email a week: what's working for businesses like yours. No fluff.
            </p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.08] px-4 py-3 text-[0.88rem] font-semibold text-emerald-300"
              >
                <IconCheck className="h-4 w-4" /> You're on the list — see you Friday.
              </motion.div>
            ) : (
              <form onSubmit={onSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourcompany.com"
                  className="w-full min-w-0 rounded-full border border-white/10 bg-char-950/70 px-4 py-2.5 text-[0.88rem] text-zinc-200 placeholder:text-zinc-600 transition-colors focus:border-amber-400/50"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid h-10 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-(--zy-amber-ink) transition-all hover:brightness-110 active:scale-90"
                >
                  <IconArrow className="h-4 w-4 rotate-45" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[0.82rem] text-zinc-600">© 2026 Zyntai. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL.map((l) =>
              l.href ? (
                <Link
                  key={l.label}
                  to={l.href}
                  className="link-underline text-[0.82rem] text-zinc-600 transition-colors hover:text-amber-300"
                >
                  {l.label}
                </Link>
              ) : (
                <button
                  key={l.label}
                  onClick={() => showToast(`${l.label} ships with your contract — ping legal@zyntai.app anytime.`)}
                  className="link-underline text-[0.82rem] text-zinc-600 transition-colors hover:text-amber-300"
                >
                  {l.label}
                </button>
              )
            )}
          </div>
          <p className="flex items-center gap-1.5 text-[0.82rem] text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            All systems operational
          </p>
        </div>
      </div>

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE as unknown as number[] }}
            className="glass fixed bottom-6 left-1/2 z-[95] w-max max-w-[92vw] -translate-x-1/2 rounded-full px-5 py-3 text-[0.88rem] font-medium text-zinc-200 shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
