# Zyntai Design System

The single source of truth for every Zyntai page. All tokens live in `src/index.css`
(`@theme` + `html.light` overrides) so any new page inherits the look automatically.

## Theme

- **Default skin: light.** Off-white canvas `#F8F9FB`, frosted-white glass surfaces,
  near-black ink `#0F1115`, slate body text `#4B5563` / `#6B7280`.
- **Dark mode** is a full re-skin via token inversion under `html.light` —
  components never branch on theme; they use the same utilities in both.
- **Amber is sacred.** The accent (`amber-300 → amber-500`) is byte-identical in both
  modes and reserved for CTAs, live indicators, and key highlights only.
  `--zy-amber-ink` (`#201503`) is the text color used *on* amber.

## Tokens (essentials)

| Token            | Dark        | Light       | Use                          |
| ---------------- | ----------- | ----------- | ---------------------------- |
| `char-950`       | `#0B0A09`   | `#F8F9FB`   | page canvas                  |
| `char-900`       | `#121010`   | `#FDFDFE`   | raised surface               |
| `zinc-50`        | `#FAFAFA`   | `#0F1115`   | headings                     |
| `zinc-400`       | `#A1A1AA`   | `#4B5563`   | body copy                    |
| `zinc-500/600`   | muted       | `#6B7280`   | captions, meta               |
| `white/<alpha>`  | white film  | ink hairline| borders & overlays (auto)    |
| `amber-300/400/500` | `#FCD34D/#FBBF24/#F59E0B` | identical | accent, glow, CTAs |

## Surfaces

- `.glass` — white film + `backdrop-blur(18px)` + 1px hairline border + soft shadow
  (light mode adds an elevated double shadow + inset top light).
- `.surface-solid` — opaque card for elements under scroll-driven 3D transforms
  (never use backdrop-filter on continuously transformed nodes — it janks).
- Corner radii: cards `1.25rem` (20px), buttons `0.875rem` (14px), chips may stay pills.

## Buttons

Reuse the classes — never restyle inline:

- `.btn` base (focus ring, press scale, lift easing)
- `.btn-primary` — amber gradient, glow shadow, hover lift + brightness
- `.btn-ghost` — hairline + translucent fill, amber hover
- `.btn-dark` — ink block with amber text (used on the amber banner)

## Typography

- Display: **Space Grotesk** (600–700, tight tracking) for headings.
- Body: **Instrument Sans** (400–500, ~1.6 line-height).
- Accent: **Instrument Serif italic** in amber for the signature
  “half-bold / half-italic” voice (`<em className="font-accent italic text-amber-300">`).
- Scale contrast is deliberate: ~4.9rem hero → 3.3rem section → 1.65rem card titles.

## Motion

- Easing: `EASE = [0.22, 1, 0.36, 1]` (slow-out), springs for toggles/magnets.
- Entrance: fade-up 26–40px, 0.7–0.95s, staggered 0.06–0.13s, viewport-once.
- Scroll-driven: parallax (`useScroll`+`useTransform`), stacked sticky timeline cards,
  scroll-progress rails. Keep transforms compositor-only (`translate/scale/rotate/opacity`).
- Ambient: fluid shader (hero, half-res), ember particles, cursor glow — all disabled
  under `prefers-reduced-motion`.

## Layout

- Container: `max-w-7xl` (1280px) with `px-5 sm:px-8`.
- Section rhythm: `py-28 sm:py-36` (112–144px).
- Layer order: canvas glows → grid texture → fluid shader → particles → glass → content.

---

*Craft with gous khan*


