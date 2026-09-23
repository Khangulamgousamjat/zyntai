import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { NAV_LINKS } from "../lib/data";
import { useTheme } from "../lib/theme";
import { Logo, IconX, IconBolt } from "../lib/icons";
import { useGotoLanding } from "./Layout";

/** "#pricing" and "#faq" are real routes; everything else is a landing anchor */
const routeFor = (href: string) =>
  href === "#pricing" ? "/pricing" : href === "#faq" ? "/faq" : null;

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const light = theme === "light";
  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Switch to dark mode" : "Switch to light mode"}
      className={`relative grid place-items-center overflow-hidden rounded-full border border-zinc-200 dark:border-char-700 bg-white dark:bg-char-800/80 text-zinc-700 dark:text-zinc-300 shadow-xs dark:shadow-none transition-all duration-300 hover:border-violet-500/50 hover:text-violet-600 dark:hover:text-violet-400 active:scale-90 ${
        compact ? "h-11 w-11" : "h-10 w-10"
      }`}
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -70 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        {light ? (
          /* sun */
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
          </svg>
        ) : (
          /* moon */
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.2 14.5A8.5 8.5 0 0 1 9.5 3.8a8.5 8.5 0 1 0 10.7 10.7Z" />
          </svg>
        )}
      </motion.span>
    </button>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const gotoLanding = useGotoLanding();
  const { scrollYProgress } = useScroll();
  const progress = scrollYProgress;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const route = routeFor(href);
    if (route) return pathname === route;
    return pathname === "/" && active === href;
  };

  const handleAnchor = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    gotoLanding(href.slice(1));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="pointer-events-none absolute left-0 top-0 z-[2] h-[2px] w-full origin-left bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400"
      />

      {/* announcement strip */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={false}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border-b border-zinc-200/80 dark:border-char-700/60 bg-white/95 dark:bg-char-900/90 backdrop-blur-md shadow-xs dark:shadow-none"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-[0.78rem] text-zinc-700 dark:text-zinc-300">
              <IconBolt className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              <span>
                <span className="font-semibold text-violet-600 dark:text-violet-400">Zyntai 2.0</span> is live — AI
                assistant, smart workflows & advanced analytics.
              </span>
              <a
                href="#features"
                onClick={handleAnchor("#features")}
                className="link-underline hidden font-medium text-zinc-900 dark:text-zinc-100 hover:text-violet-600 dark:hover:text-violet-400 sm:inline"
              >
                See what's new
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* glass bar */}
      <div
        className={`relative z-[1] transition-all duration-500 ${
          scrolled
            ? "nav-glass border-b"
            : "nav-glass border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" onClick={handleAnchor("#top")} aria-label="Zyntai home">
            <Logo />
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => {
              const route = routeFor(l.href);
              const cls = `link-underline text-[0.92rem] font-medium transition-colors duration-200 ${
                isActive(l.href) ? "text-violet-600 dark:text-violet-400 font-semibold" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`;
              return (
                <li key={l.href}>
                  {route ? (
                    <Link to={route} data-active={isActive(l.href)} className={cls}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} onClick={handleAnchor(l.href)} data-active={isActive(l.href)} className={cls}>
                      {l.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              to="/login"
              className="rounded-full px-4.5 py-2 text-[0.92rem] font-medium text-zinc-800 dark:text-zinc-200 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary group relative overflow-hidden rounded-xl px-5 py-2.5 text-[0.92rem]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Start free
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle compact />
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-char-700 bg-char-800 text-zinc-200"
            >
              {open ? (
                <IconX className="h-5 w-5" />
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 7h16M4 12h10M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="nav-glass mx-4 mt-2 overflow-hidden rounded-2xl border border-char-700 lg:hidden"
          >
            <div className="flex flex-col p-3">
              {NAV_LINKS.map((l, i) => {
                const route = routeFor(l.href);
                const inner = (
                  <span className="font-display text-lg font-medium">{l.label}</span>
                );
                const cls = `block rounded-xl px-4 py-3.5 transition-colors ${
                  isActive(l.href)
                    ? "bg-violet-500/10 text-violet-400 font-semibold"
                    : "text-zinc-200 hover:bg-white/[0.05] hover:text-violet-400"
                }`;
                return route ? (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link to={route} onClick={() => setOpen(false)} className={cls}>
                      {inner}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={handleAnchor(l.href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className={cls}
                  >
                    {inner}
                  </motion.a>
                );
              })}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-char-700 p-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-char-700 py-3 text-center font-medium text-zinc-200 hover:text-violet-400"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full py-3 text-[0.92rem]"
                >
                  Start free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
