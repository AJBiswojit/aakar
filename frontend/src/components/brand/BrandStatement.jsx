"use client";

import { Reveal, RevealLines, CobaltLine, SectionLabel } from "@/components/ui/SectionLabel";
import { useSite } from "@/hooks/useAakar";

/**
 * ROOM 03 — the brand statement. A single thought, typographic, no imagery.
 */
export function BrandStatement() {
  const site = useSite();

  return (
    <section
      id="about"
      data-nav-id="about"
      data-nav-theme="dark"
      className="tone-dark grain section relative overflow-hidden py-[clamp(6rem,18vh,13rem)]"
    >
      <div className="shell relative z-10">
        <SectionLabel tone="dark" index="02">
          The Premise
        </SectionLabel>

        <CobaltLine tone="dark" className="mt-10 w-full" />

        <h2 className="u-display mt-12 text-[clamp(2.5rem,8.4vw,7.5rem)] font-medium text-white">
          <RevealLines
            lines={["From idea", "to form."]}
            step={170}
          />
        </h2>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <Reveal as="p" className="u-h3 max-w-[34rem] normal-case leading-[1.35] text-white/85 md:col-span-7">
            Every piece begins as an idea. The process is where it becomes tangible.
          </Reveal>
          <Reveal as="div" className="md:col-span-4 md:col-start-9" delay={140}>
            <p className="u-body text-white/50">
              AAKAR exists for the space between the sketch and the render — the discipline of making something
              hold its weight from every angle.
            </p>
            <p className="u-label mt-6 text-cobalt-light">{site?.brand?.statement}</p>
          </Reveal>
        </div>
      </div>

      {/* oversized ghost wordmark for depth, no visual noise */}
      <span
        aria-hidden="true"
        className="u-display pointer-events-none absolute -bottom-[6vw] left-1/2 -translate-x-1/2 select-none text-[26vw] leading-none text-white/[0.035]"
      >
        आकार
      </span>
    </section>
  );
}

export default BrandStatement;
