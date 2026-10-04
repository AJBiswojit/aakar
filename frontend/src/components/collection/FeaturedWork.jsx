import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";
import { cx } from "@/utils/format";
import { SectionLabel, Reveal, Mask, CobaltLine } from "@/components/ui/SectionLabel";
import { IconCube, IconArrowRight } from "@/components/ui/Icons";
import { useFeaturedWorks } from "@/hooks/useFeaturedWorks";
import { useOverlay } from "@/state/app/AppContext";
import { usePrefersReducedMotion } from "@/hooks/useMotion";

const LAYOUT = {
  lg: "lg:col-span-7 lg:col-start-1",
  sm: "lg:col-span-4 lg:col-start-9",
};

const LAYOUT_ALT = {
  lg: "lg:col-span-8 lg:col-start-5",
  sm: "lg:col-span-5 lg:col-start-2",
};

/**
 * ROOM 02 — THE EXHIBITION. Asymmetric, one piece at a time, never a grid of
 * identical cards.
 */
export function FeaturedWork() {
  const { works } = useFeaturedWorks();
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { openOverlay } = useOverlay();

  /* gentle counter-parallax on the plates */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      root.querySelectorAll("[data-parallax]").forEach((el) => {
        const depth = Number(el.getAttribute("data-parallax")) || 26;
        gsap.fromTo(
          el,
          { y: depth },
          { y: -depth, ease: "none", scrollTrigger: { trigger: el.closest("[data-piece]"), start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, works.length]);

  return (
    <section
      id="work"
      data-nav-id="work"
      data-nav-theme="light"
      className="tone-light section"
      ref={rootRef}
    >
      <div className="shell">
        <header className="flex flex-col gap-6 border-b border-hair pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="01" total="04">
              Selected Forms
            </SectionLabel>
            <h2 className="u-h2 mt-6">
              <Reveal as="span" className="block">
                Objects built
              </Reveal>
              <Reveal as="span" className="block text-mute" delay={110}>
                to be examined.
              </Reveal>
            </h2>
          </div>
          <Reveal as="p" className="u-body max-w-[26rem] text-mute" delay={180}>
            Four pieces from the atelier, shown at exhibition scale. Each one is a real asset — topology, materials
            and formats documented.
          </Reveal>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-20 lg:mt-20 lg:grid-cols-12 lg:gap-y-28">
          {works.map((work, i) => {
            const map = i % 2 === 0 ? LAYOUT : LAYOUT_ALT;
            const span = work.layout?.span === "lg" ? map.lg : map.sm;
            const offset = work.layout?.offset ? `${work.layout.offset * 0.5}rem` : null;

            return (
              <article
                key={work.id}
                data-piece
                className={cx("group/work relative", span, offset && "work-piece-offset", !offset && i === 1 && "lg:mt-24", !offset && i === 3 && "lg:mt-10")}
                style={offset ? { "--piece-offset": offset } : undefined}
              >
                <button
                  type="button"
                  onClick={() => openOverlay("product", { slug: work.productSlug })}
                  data-cursor={work.interactive ? "VIEW 3D" : "VIEW"}
                  className="fig block w-full cursor-pointer bg-soft"
                  style={{ aspectRatio: work.layout?.ratio || "4 / 5" }}
                  aria-label={`Open ${work.title}`}
                >
                  <Mask className="absolute inset-0">
                    <img
                      src={work.media}
                      alt={`${work.title} — ${work.kind.toLowerCase()} 3D artwork by AAKAR`}
                      loading={i < 2 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-[scale,filter] duration-[1600ms] ease-out group-hover/work:scale-[1.05]"
                      data-parallax={i % 2 === 0 ? 22 : -22}
                    />
                  </Mask>

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cobalt transition-transform duration-[900ms] ease-out group-hover/work:scale-x-100" />

                  <span className="u-label-sm pointer-events-none absolute right-4 top-4 tabular-nums text-ink/50 mix-blend-multiply lg:text-ink/45">
                    {work.index} / 04
                  </span>

                  <span className="pointer-events-none absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 bg-white/92 px-3 py-2 opacity-0 transition-all duration-600 ease-out group-hover/work:translate-y-0 group-hover/work:opacity-100">
                    <IconCube className="h-4 w-4 text-cobalt" />
                    <span className="u-label text-ink">{work.interactive ? "VIEW IN 3D" : "VIEW PIECE"}</span>
                    <IconArrowRight className="h-[9px] w-[18px] text-cobalt" />
                  </span>
                </button>

                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <h3 className="u-h3 uppercase">{work.title}</h3>
                  <p className="u-label-sm text-mute">
                    {work.kind} · {work.year}
                  </p>
                </div>
                <CobaltLine className="mt-4 w-full" delay={120} />
                <p className="u-body mt-4 max-w-[30rem] text-ink/60">{work.line}</p>
              </article>
            );
          })}
        </div>

        <Reveal as="div" className="mt-20 flex items-center justify-between border-t border-hair pt-6 lg:mt-28">
          <p className="u-label text-mute">Additional forms in the atelier</p>
          <a
            href="#store"
            className="u-label group inline-flex items-center gap-3 text-ink transition-colors hover:text-cobalt"
            data-cursor="STORE"
          >
            ENTER THE STORE
            <IconArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default FeaturedWork;
