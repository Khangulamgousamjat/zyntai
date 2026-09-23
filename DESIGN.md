# Zyntai Design System

The single source of truth for the Zyntai design language. All core design tokens and adaptive light/dark mode variables are defined in `src/index.css` via modern Tailwind CSS v4 variables and `@theme`, ensuring consistent visual hierarchy, accessibility, and high performance across every page and component.

---

## 🎨 Visual Identity & Brand Philosophy

- **Style**: **Professional + Premium + Modern SaaS + AI**
- **Strict Guidelines**:
  - NOT neon
  - NOT overly colorful
  - NOT cyberpunk
  - NOT gaming-style
  - NOT excessive glassmorphism
  - NOT excessive glow
- **Role of Violet**: Violet is used strictly as an **ACCENT** (primary buttons, active tabs, links, focus rings, key indicators, badge accents). The dominant canvas and card structures remain clean, high-contrast Charcoal / Black and Crisp White.

---

## 🖤 Primary Color System

### Black / Charcoal (Base Canvas & Surface Architecture)
- `#09090B` — Canvas / Deep background (`--color-char-950`)
- `#111113` — Raised cards / Card backgrounds (`--color-char-900`)
- `#18181B` — Surface elements, secondary panels (`--color-char-800`)
- `#27272A` — Borders, divider lines, muted controls (`--color-char-700`)
- `#3F3F46` — Subtle borders, hover highlights (`--color-char-600`)

### Violet (Signature Accent)
- `#7C3AED` — Violet primary (`--color-violet-600`) — Primary CTA buttons, key active states, main brand mark
- `#8B5CF6` — Violet light (`--color-violet-500`) — Hover states, gradient shifts, active badges
- `#A78BFA` — Violet muted (`--color-violet-400`) — Subtle borders, sub-headings, accents

### Light Violet (Tints & Subtle Highlights)
- `#EDE9FE` — Violet tint (`--color-violet-100`) — Light mode active pills, subtle hover fills
- `#F5F3FF` — Violet background tint (`--color-violet-50`) — Light mode subtle chip backgrounds

### White
- `#FFFFFF` — Pure white (`--color-pure-white`) — Contrast text on dark, card base in light mode

---

## 🌓 Light & Dark Mode Architecture

Full system preference detection with zero color inversion hacks. Both themes use clean, semantic CSS variables and direct property assignments.

| Element | Dark Mode (Default) | Light Mode |
| :--- | :--- | :--- |
| **Canvas Background** | `#09090B` (to `#0D0B14`) | `#FFFFFF` (to `#FAFAFA`, `#F8F7FC`) |
| **Card Surface** | `#111113` / `#18181B` | `#FFFFFF` / `#FAFAFA` |
| **Border Hairlines** | `#27272A` / `rgba(255,255,255,0.08)` | `#E4E4E7` / `rgba(0,0,0,0.08)` |
| **Primary Text** | `#FAFAFA` | `#18181B` |
| **Secondary Text** | `#D4D4D8` | `#52525B` |
| **Muted Text** | `#A1A1AA` | `#71717A` |
| **Primary CTA Button** | `#7C3AED` with white text | `#7C3AED` with white text |
| **Ghost Button Hover** | Border `#8B5CF6`, text `#A78BFA` | Border `#7C3AED`, text `#7C3AED` |
| **Success State** | `#22C55E` | `#16A34A` |
| **Error State** | `#EF4444` | `#DC2626` |

---

## 🧱 Component Styling System

### 1. Cards & Surfaces
- Clean, structured borders (`1px solid #27272A` in dark, `1px solid #E4E4E7` in light).
- Micro-elevations via refined box-shadows instead of heavy blurs.
- Standard corner radius: `rounded-2xl` (16px) or `rounded-xl` (12px).
- Subtle hover transitions: `translate-y-[-2px]` with border color shift to `#3F3F46` (dark) or `#D4D4D8` (light).

### 2. Buttons
- **`.btn-primary`**:
  - Background: `#7C3AED` (hover: `#8B5CF6`)
  - Color: `#FFFFFF`
  - Subtle, controlled violet glow shadow: `0 4px 14px -2px rgba(124, 58, 237, 0.35)`
  - Active press scale: `scale-[0.98]`
- **`.btn-ghost`**:
  - Background: Transparent or subtle surface fill
  - Border: 1px border (`#27272A` dark / `#E4E4E7` light)
  - Text: Primary text color
  - Hover: Border `#7C3AED` or `#8B5CF6`, text violet
- **`.btn-dark`**:
  - Solid dark charcoal surface button (`#18181B`) with light text and subtle border.

### 3. Inputs & Forms
- Input field background: `#111113` (dark) / `#FFFFFF` (light)
- Input border: `#27272A` (dark) / `#E4E4E7` (light)
- Focus ring: `outline-none ring-2 ring-[#7C3AED]/40 border-[#7C3AED]`
- Error states: `border-red-500 ring-red-500/20 text-red-500`

### 4. Badges & Micro-Pills
- Neutral pill with violet dot or subtle violet border (`border-violet-500/20 bg-violet-500/10 text-violet-400`).
- Star ratings: Semantic gold (`text-amber-400`).
- Metrics & positive change: Semantic emerald (`text-emerald-400`).

---

## 🔤 Typography

- **Display & Headings**: Space Grotesk / Inter (600–700 font weight, letter-spacing `-0.02em` to `-0.03em`).
- **Body Text**: Instrument Sans / Inter (400–500 font weight, line-height 1.6).
- **Accents**: Instrument Serif italic in violet or subtle gradient for memorable brand emphasis.

---

## ⚡ Performance & Physics

- **Hardware-Accelerated Native Scroll**: Smooth scrolling using native CSS and lightweight transforms without main-thread scroll hijacking.
- **Ambient Lighting**: GPU-efficient WebGL fluid shader tuned to subtle deep violet tones with low alpha, ensuring 60fps across mobile and desktop.
- **Micro-Animations**: Framer Motion entrance animations with cubic bezier easing `[0.22, 1, 0.36, 1]`, respecting `prefers-reduced-motion`.

---

<div align="center">

**Craft with gous khan**

</div>
