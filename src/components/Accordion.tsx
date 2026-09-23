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
      className={`glass overflow-hidden rounded-[1.25rem] border transition-colors duration-300 ${
        open ? "border-violet-500/40 bg-violet-500/[0.04]" : "border-char-700/60 hover:border-violet-500/30"
      } ${className}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer sm:px-7"
      >
        <span
          className={`font-display text-[1.02rem] font-semibold transition-colors ${
            open ? "text-violet-400" : "text-zinc-100"
          }`}
        >
          {q}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-violet-500/50 bg-violet-500/15 text-violet-400"
              : "border-char-700 text-zinc-400"
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
            transition={{ duration: 0.35, ease: EASE as unknown as number[] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-zinc-400 sm:px-7">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
