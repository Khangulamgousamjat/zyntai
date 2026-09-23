import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "./Nav";
import { Footer } from "./Closing";

/* soft violet light that trails the cursor (fine pointers only) */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    let raf = 0;
    let running = false;
    let tx = window.innerWidth / 2;
    let ty = 300;
    let x = tx;
    let y = ty;

    const loop = () => {
      const dx = tx - x;
      const dy = ty - y;
      x += dx * 0.12;
      y += dy * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
      }
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] h-[520px] w-[520px] rounded-full opacity-60 will-change-transform"
      style={{
        background:
          "radial-gradient(closest-side, rgba(124,58,237,0.08), rgba(124,58,237,0.02) 55%, transparent 70%)",
      }}
    />
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShow(window.scrollY > 900);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[60] hidden h-12 w-12 place-items-center rounded-full border border-char-700 bg-char-900/90 text-violet-400 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:text-violet-300 cursor-pointer sm:grid ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5m0 0-6 6m6-6 6 6" />
      </svg>
    </button>
  );
}

/** smooth-scroll to a landing section from any route */
export function useGotoLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  return (anchor: string) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { anchor } });
    } else {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById(anchor)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };
}

/* ---------------- per-route SEO ---------------- */
const OG_IMAGE =
  "https://image.qwenlm.ai/generated-images/a72108c7-bb2f-47cc-8b92-db95e270911e/_result.png";

const META: Record<string, { title: string; desc: string }> = {
  "/": {
    title: "Zyntai — The Operating System for Modern Businesses",
    desc: "Turn conversations into customers. Zyntai automates ordering, replies, upsells and follow-ups so online businesses grow on autopilot.",
  },
  "/pricing": {
    title: "Zyntai — Simple, Transparent Pricing",
    desc: "Plans from $19/mo. Start free for 14 days — no credit card, no contracts, cancel anytime. Save 20% with annual billing.",
  },
  "/faq": {
    title: "Zyntai — Frequently Asked Questions",
    desc: "Setup, the AI assistant, security, billing and more — clear answers to everything teams ask about Zyntai.",
  },
  "/about": {
    title: "Zyntai — Why We Exist",
    desc: "We built Zyntai because businesses lose customers to slow replies and clunky ordering. Meet the team automating the busywork.",
  },
  "/contact": {
    title: "Zyntai — Book a Free Demo",
    desc: "See Zyntai in action. Book a free 20-minute demo — we reply within 24 hours. No credit card, no pressure.",
  },
  "/login": {
    title: "Zyntai — Log In",
    desc: "Log in to your Zyntai dashboard. Orders, automations and analytics in one place.",
  },
  "/signup": {
    title: "Zyntai — Create Your Free Account",
    desc: "Start your 14-day free trial of Zyntai. No credit card required — set up in minutes.",
  },
  "/privacy": {
    title: "Zyntai — Privacy Policy",
    desc: "How Zyntai collects, uses and protects your data. Your rights, cookies, security and contact details.",
  },
  "/terms": {
    title: "Zyntai — Terms of Service",
    desc: "The terms that govern your use of Zyntai — accounts, subscriptions, cancellation and liability.",
  },
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function useSeo(pathname: string) {
  useEffect(() => {
    const m = META[pathname] ?? META["/"];
    document.title = m.title;
    upsertMeta("name", "description", m.desc);
    upsertMeta("property", "og:title", m.title);
    upsertMeta("property", "og:description", m.desc);
    upsertMeta("property", "og:url", `https://zyntai.app${pathname}`);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", m.title);
    upsertMeta("name", "twitter:description", m.desc);
    upsertMeta("name", "twitter:image", OG_IMAGE);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://zyntai.app${pathname === "/" ? "/" : pathname}`;
  }, [pathname]);
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduce = useReducedMotion();
  useSeo(location.pathname);

  /* route change: scroll to anchor (hash or state) or top */
  useEffect(() => {
    const anchor =
      (location.state as { anchor?: string } | null)?.anchor ??
      (location.hash ? location.hash.slice(1) : null);
    if (anchor) {
      const t = window.setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.state, location.hash, reduce]);

  const authPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {!authPage && <CursorGlow />}
      {!authPage && <Nav />}
      <motion.main
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {children}
      </motion.main>
      {!authPage && <Footer />}
      {!authPage && <BackToTop />}
      <span className="sr-only">{location.pathname}</span>
    </div>
  );
}
