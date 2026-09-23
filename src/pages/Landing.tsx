import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/motion";
import Hero from "../components/Hero";
import Proof from "../components/Proof";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Automation from "../components/Automation";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import Faq from "../components/Faq";
import { FinalCta } from "../components/Closing";

/* floating CTA for phones */
function MobileCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShow(window.scrollY > 640);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex justify-center sm:hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.92 }}
            transition={{ duration: 0.4, ease: EASE as unknown as number[] }}
            className="pointer-events-auto"
          >
            <Link
              to="/signup"
              className="liquid-glass flex items-center gap-2.5 rounded-full py-3 pl-5 pr-3 font-semibold text-amber-300 ring-1 ring-amber-400/25"
            >
              Start free trial
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-(--zy-amber-ink)">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Landing({ introReady = true }: { introReady?: boolean }) {
  return (
    <>
      <Hero introReady={introReady} />
      <Proof />
      <Features />
      <HowItWorks />
      <Automation />
      <Testimonials />
      <Pricing />
      <Faq />
      <FinalCta />
      <MobileCta />
    </>
  );
}
