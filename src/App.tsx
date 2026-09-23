import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ThemeProvider, useTheme } from "./lib/theme";
import { EASE } from "./lib/motion";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import PricingPage from "./pages/PricingPage";
import FaqPage from "./pages/FaqPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";

/* buttery smooth scrolling + eased anchor navigation */
function useLenis(reduce: boolean | null, enabled: boolean) {
  useEffect(() => {
    if (reduce || !enabled) return;
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
    });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href") ?? "";
      if (id.length <= 1) return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -84, duration: 0.7, easing: (p) => 1 - Math.pow(1 - p, 4) });
      }
    };
    document.addEventListener("click", onAnchor);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onAnchor);
    };
  }, [enabled, reduce]);
}

/* first-paint curtain */
function Intro({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : {}}
      transition={{ duration: 1, ease: EASE as unknown as number[], delay: 0.2 }}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-char-950"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE as unknown as number[] }}
        className="grid h-16 w-16 place-items-center rounded-[1.3rem] bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_0_60px_rgba(245,158,11,0.4)]"
      >
        <svg viewBox="0 0 32 32" className="h-9 w-9 text-(--zy-amber-ink)" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 8h16L8 24h16" />
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="font-display mt-5 text-xl font-bold tracking-tight text-zinc-50"
      >
        Zyntai<span className="text-amber-400">.</span>
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE as unknown as number[] }}
        className="mt-4 h-px w-24 origin-left bg-gradient-to-r from-amber-400 to-transparent"
      />
    </motion.div>
  );
}

function Site() {
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const { pathname } = useLocation();
  useLenis(reduce, pathname === "/");

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-char-950 text-zinc-200 antialiased">
      <AnimatePresence>
        <Intro done={ready} />
      </AnimatePresence>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing introReady={ready} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Layout>
      {/* repaint hint for theme swap */}
      <span className="sr-only">{theme}</span>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Site />
      </BrowserRouter>
    </ThemeProvider>
  );
}
