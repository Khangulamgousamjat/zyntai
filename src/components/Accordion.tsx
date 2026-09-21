import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/motion";
import { IconPlus } from "../lib/icons";

export default function AccordionItem({
  q,
  a,
  open,
  onToggle,
  className = "",
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div
      className={`glass overflow-hidden rounded-[1.25rem] transition-colors duration-400 ${
        open ? "border-amber-400/30 bg-amber-400/[0.04]" : "hover:border-amber-400/20"
      } ${className}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-7"
      >
        <span
          className={`font-display text-[1.02rem] font-semibold transition-colors ${
            open ? "text-amber-300" : "text-zinc-100"
          }`}
        >
          {q}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
            open
              ? "rotate-45 border-amber-400/50 bg-amber-400/15 text-amber-300"
              : "border-white/10 text-zinc-400"
          }`}
        >
          <IconPlus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE as unknown as number[] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-zinc-400 sm:px-7">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
