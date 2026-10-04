import { useEffect, useRef, useState } from "react";
import { gsap } from "@/utils/gsap";
import { bindHeroScroll, sceneState } from "@/utils/gsap";
import { CobaltLine, RevealLines } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ModelViewer } from "@/components/3d/ModelViewer";
import { cx } from "@/utils/format";
import { useSite } from "@/hooks/useSite";
import { useShowcaseProduct } from "@/hooks/useProducts";
import { usePrefersReducedMotion } from "@/hooks/useMotion";

/**
 * ROOM 01 — THE ARRIVAL.
 * One form, exhibited in the dark. Type anchored bottom-left, technical
 * metadata in the margins, the model reacting to the cursor behind it.
 */
export function Hero() {
  const { data: site } = useSite();
  const hero = site?.hero;
  const { product: showcase } = useShowcaseProduct();
  const sectionRef = useRef(null);
  const sweepRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [sceneStatus, setSceneStatus] = useState("loading");
  const loading = sceneStatus === "loading" || sceneStatus === "idle";

  /* cinematic hand-off: the form recedes, a cobalt line crosses the seam */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduced || typeof window === "undefined") return;

    const killScroll = bindHeroScroll(el);

    const st = gsap.fromTo(
      sweepRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "bottom 88%", end: "bottom 22%", scrub: true },
      },
    );

    return () => {
      killScroll();
      st.scrollTrigger?.kill();
      st.kill();
      sceneState.heroProgress = 0;
    };
  }, [reduced]);

  if (!hero) return null;

  return (
    <section
      id="arrival"
      ref={sectionRef}
      data-nav-theme="dark"
      className="hero grain relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ------------------------------- the exhibit ------------------------------ */}
      <div className="absolute inset-0">
        <ModelViewer
          mode="hero"
          image={hero.image}
          alt="AAKAR hero sculpture: an armored character bust lit in a dark gallery with a cobalt rim light"
          modelUrl={showcase?.model?.previewUrl}
          priority
          sizes="100vw"
          className="h-full w-full"
          imageFadeClass="opacity-[0.18]"
          imgClassName="object-[62%_45%] lg:object-[58%_42%]"
          onStatus={setSceneStatus}
        />

        <div className="hero__scrim pointer-events-none absolute inset-0" />
      </div>

      {/* --------------------------------- content -------------------------------- */}
      <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-14 pt-28 sm:pb-20 lg:pb-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[46rem]">
            <div className="mb-6 flex items-center gap-3 sm:mb-8">
              <span className="h-[5px] w-[5px] rounded-full bg-cobalt-light" aria-hidden="true" />
              <p className="u-label text-white/45">{hero.eyebrow}</p>
            </div>

            <h1 className="sr-only">
              AAKAR — giving imagination form. An independent 3D studio crafting characters, creatures, objects
              and digital worlds.
            </h1>

            <RevealLines
              as="div"
              aria-hidden="true"
              lines={hero.lines}
              className="u-display text-[clamp(2.75rem,9.2vw,9rem)] font-medium"
              step={150}
              delay={120}
            />

            <CobaltLine tone="dark" className="mt-8 w-20 lg:w-28" delay={520} />

            <p className="u-label mt-7 text-white/55 sm:mt-9">{site?.brand?.statement}</p>

            <p className="u-body mt-6 max-w-[34rem] text-white/70 lg:mt-8">{hero.supporting}</p>

            <div className="mt-9 flex flex-col gap-4 sm:mt-11 sm:flex-row sm:items-center sm:gap-8">
              <Button href="#store" variant="primary" size="md" tone="dark" data-cursor="ENTER">
                EXPLORE COLLECTION
              </Button>
              <Button href="#work" variant="ghost" size="md" tone="dark" data-cursor="VIEW">
                VIEW THE WORK
              </Button>
            </div>
          </div>

          {/* ---------------------------- technical margins ---------------------------- */}
          <div className="flex shrink-0 flex-col items-start gap-6 lg:items-end">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:items-end lg:gap-3">
              {hero.disciplines.map((d, i) => (
                <li key={d} className="u-label flex items-center gap-3 text-white/55">
                  <span className="tabular-nums text-cobalt-light/70">{String(i + 1).padStart(2, "0")}</span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="u-label-sm text-white/35">
              {hero.location} · {hero.year}
            </p>
          </div>
        </div>

        {/* --------------------------------- bottom rail -------------------------------- */}
        <div className="mt-12 flex items-end justify-between border-t border-white/10 pt-5 lg:mt-16">
          <div className="flex items-center gap-4">
            <span className="u-label text-cobalt-light">{hero.room.index}</span>
            <span className="u-label text-white/45">{hero.room.name}</span>
          </div>

          <a
            href="#work"
            data-cursor="SCROLL"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#work")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
            }}
            className="group flex items-center gap-3"
          >
            <span className="u-label-sm text-white/40 transition-colors group-hover:text-white">{hero.scroll}</span>
            <span className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-4 bg-cobalt-light motion-safe:animate-[aakar-cue_2.4s_var(--ease-out-soft)_infinite]" />
            </span>
          </a>
        </div>
      </div>

      {/* thin cobalt loading rail at the seam — only while the form resolves */}
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute right-8 top-[36%] z-20 hidden text-right transition-opacity duration-700 xl:block",
          loading ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="u-label text-white/60">AAKAR</p>
        <p className="u-label-sm mt-1 text-cobalt-light">/ {hero.loader.toUpperCase()}</p>
        <span className="mt-3 block h-px w-28 overflow-hidden bg-white/15">
          <span className="block h-full w-1/3 bg-cobalt-light motion-safe:animate-[aakar-scan_1.7s_var(--ease-out-soft)_infinite]" />
        </span>
      </div>

      <span ref={sweepRef} aria-hidden="true" className="hero__sweep" />
    </section>
  );
}

export default Hero;
