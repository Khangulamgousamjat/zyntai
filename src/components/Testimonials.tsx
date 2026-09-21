import { TESTIMONIALS } from "../lib/data";
import { SectionHeading, Stagger, StaggerItem } from "../lib/motion";
import { IconStar } from "../lib/icons";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute right-1/4 top-0 h-72 w-72 rounded-full bg-amber-500/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Proof, not promises"
          title="Founders don't do"
          accent="hype."
          tail="They do results."
          sub="Owners and operators across 120+ countries run their customer journey on Zyntai. Here's what changed for them."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8" step={0.13}>
          {TESTIMONIALS.map((t, i) => (
            <StaggerItem key={t.name} y={40} className={i === 1 ? "md:translate-y-8" : ""}>
              <figure
                className={`group glass relative h-full rounded-[1.6rem] p-8 transition-all duration-500 hover:z-10 hover:rotate-0 hover:border-amber-400/35 hover:shadow-[0_30px_80px_-28px_rgba(245,158,11,0.3)] ${t.tilt} motion-reduce:rotate-0`}
              >
                <span aria-hidden className="font-accent absolute right-7 top-4 select-none text-[5rem] italic leading-none text-amber-400/10 transition-colors duration-500 group-hover:text-amber-400/20">
                  "
                </span>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: `${s * 40}ms` }} />
                  ))}
                </div>

                <blockquote className="mt-5 text-[1.02rem] leading-relaxed text-zinc-300">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-white/[0.07] pt-6">
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 font-display text-sm font-bold text-(--zy-amber-ink)">
                    {t.initials}
                    <span className="absolute -inset-1 -z-10 rounded-full border border-amber-400/30 transition-transform duration-500 group-hover:scale-110" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[0.98rem] font-bold text-zinc-50">{t.name}</p>
                    <p className="truncate text-[0.78rem] text-zinc-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>

                <span className="mt-5 inline-block rounded-full border border-amber-400/25 bg-amber-400/[0.07] px-3.5 py-1.5 text-[0.72rem] font-bold text-amber-300">
                  {t.metric}
                </span>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
