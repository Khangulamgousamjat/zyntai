import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const IconMenu = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
    <path d="M8 8h8M8 11.2h8M8 14.4h4.5" />
    <circle cx="15.6" cy="16.4" r="1.7" />
    <path d="M16.9 17.7 18.4 19.2" />
  </svg>
);

export const IconDashboard = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="4.5" width="17" height="12.5" rx="2.2" />
    <path d="M7 14v-3M10.3 14V8.5M13.6 14v-2M16.9 14V6.8" />
    <path d="M9 20.5h6M12 17v3.5" />
  </svg>
);

export const IconUpsell = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 16.5 9.5 11l3.5 3.5L20 7.5" />
    <path d="M15.5 7.5H20V12" />
    <circle cx="6.5" cy="6.5" r="2.1" />
    <path d="M6.5 5.5v2M5.7 6.3h1.2" strokeWidth="1.2" />
  </svg>
);

export const IconChat = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 11.4c0 4-3.6 7.1-8 7.1-1 0-2-.15-2.9-.44L4 19.5l1.3-3.5A6.8 6.8 0 0 1 4 11.4c0-4 3.6-7.1 8-7.1s8 3.1 8 7.1Z" />
    <path d="M13.1 8.2 10.2 12h2l-1.3 3.4 3.6-4.6h-2l.6-2.6Z" strokeWidth="1.3" />
  </svg>
);

export const IconTrack = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="18" r="2.4" />
    <circle cx="18" cy="6" r="2.4" />
    <path d="M8.2 16.6c3.2-1 2.6-3.8 4.4-5.6s4.6-1.3 4.6-4.4" strokeDasharray="2.6 3" />
  </svg>
);

export const IconChart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 4v15a1 1 0 0 0 1 1h15" />
    <rect x="7.5" y="12" width="3" height="5.5" rx="0.8" />
    <rect x="12.5" y="8" width="3" height="9.5" rx="0.8" />
    <path d="M7 6.5c3-2.5 6 1.5 10-2" strokeDasharray="0" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M8.5 6.2c0-1 1.1-1.6 2-1.1l9 5.3c.9.5.9 1.7 0 2.2l-9 5.3c-.9.5-2-.1-2-1.1V6.2Z" />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} strokeWidth={2.1} {...p}>
    <path d="m5 12.8 4.2 4.2L19 7" />
  </svg>
);

export const IconPlus = (p: P) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 2.8 2.7 5.7 6.2.8-4.6 4.3 1.2 6.1L12 16.7l-5.5 3 1.2-6.1-4.6-4.3 6.2-.8L12 2.8Z" />
  </svg>
);

export const IconBolt = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M13.4 2.3 4.6 13.4h5.2l-1.2 8.3 8.8-11.1h-5.2l1.2-8.3Z" />
  </svg>
);

export const IconFlame = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c.4 2.8-3.4 4.6-3.4 8.2a5.4 5.4 0 0 0 10.8 0c0-2.5-1.6-4-2.7-5.6-.4 1-.5 2-1.5 2.6.3-2.2-1.3-4-3.2-5.2Z" />
    <path d="M12 20.5a3 3 0 0 1-3-3c0-1.8 1.6-2.7 3-4.4 1.4 1.7 3 2.6 3 4.4a3 3 0 0 1-3 3Z" />
  </svg>
);

export const IconGlobe = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.6 2.3 3.9 5.2 3.9 8.5s-1.3 6.2-3.9 8.5c-2.6-2.3-3.9-5.2-3.9-8.5s1.3-6.2 3.9-8.5Z" />
  </svg>
);

export const IconSound = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9.5v5h3.2L12 18.8V5.2L7.2 9.5H4Z" />
    <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.6a7.6 7.6 0 0 1 0 10.8" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconLink = (p: P) => (
  <svg {...base} {...p}>
    <path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.24 4.24 0 0 0-6-6l-1.5 1.5" />
    <path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.24 4.24 0 0 0 6 6l1.5-1.5" />
  </svg>
);

export const IconFlow = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="13.5" width="9" height="7" rx="1.8" />
    <path d="M8 4v5.5M5.8 7.3 8 9.5l2.2-2.2" />
    <path d="M16 6.5h4.5M16 10.5h4.5M16 14.5h3" />
  </svg>
);

export const IconSpark = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5c.7 4.9 2.4 6.8 7.5 7.5-5.1.7-6.8 2.6-7.5 7.5-.7-4.9-2.4-6.8-7.5-7.5 5.1-.7 6.8-2.6 7.5-7.5Z" />
    <path d="M19 15.5c.35 2.3 1.15 3.2 3.5 3.5-2.35.3-3.15 1.2-3.5 3.5-.35-2.3-1.15-3.2-3.5-3.5 2.35-.3 3.15-1.2 3.5-3.5Z" opacity="0.7" />
  </svg>
);

export const IconBell = (p: P) => (
  <svg {...base} {...p}>
    <path d="M18 10a6 6 0 1 0-12 0c0 4-1.5 5.5-2 6.5h16c-.5-1-2-2.5-2-6.5Z" />
    <path d="M10 19.5a2.1 2.1 0 0 0 4 0" />
  </svg>
);

export const IconX = (p: P) => (
  <svg {...base} strokeWidth={1.9} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconInstagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconLinkedIn = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3 9h3v11.5H3V9Zm6 0h2.8v1.6h.1c.4-.8 1.5-1.9 3.3-1.9 3.4 0 4.1 2.2 4.1 5.1v6.7h-3v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6.1H9V9Z" />
  </svg>
);

export const IconBird = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7-8.1L2 3h6.3l4.3 5.7L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
  </svg>
);

export const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-[#7C3AED] shadow-sm transition-transform hover:scale-105">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 5.5h12L6 18.5h12" />
      </svg>
    </span>
    <span className="font-display text-[1.35rem] font-bold tracking-tight text-brand-title transition-colors">
      Zyntai
    </span>
  </span>
);
