"use client";

import Image from "next/image";
import { CobaltLine, Mask, Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { useArtist, useMotionSafeScrollTo } from "@/hooks/useArtist";

/**
 * ROOM 06 — the human behind the work. Deliberately short: a practice,
 * a philosophy, a toolkit. No invented credentials.
 */
export function StudioSection() {
  const artist = useArtist();
  const scrollTo = useMotionSafeScrollTo();
  if (!artist) return null;

  return (
    <section id="studio" data-nav-id="studio" data-nav-theme="light" className="tone-light section">
      <div className="shell">
        <header className="grid gap-10 border-b border-hair pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel index="07">{artist.eyebrow}</SectionLabel>
            <h2 className="u-h2 mt-6">
              {artist.headline.map((line, i) => (
                <Reveal key={line} as="span" className={i === 1 ? "block text-mute" : "block"} delay={i * 120}>
                  {line}
                </Reveal>
              ))}
            </h2>
          </div>
          <Reveal as="p" className="u-h3 max-w-[34rem] normal-case leading-[1.4] text-ink/75 lg:col-span-4 lg:col-start-9" delay={160}>
            {artist.statement}
          </Reveal>
        </header>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* -------------------------------- portrait -------------------------------- */}
          <div className="lg:col-span-5">
            <Mask className="fig aspect-4/5 w-full bg-soft">
              <Image
                src={artist.portrait}
                alt="Inside the AAKAR studio: a lone artist at a dark desk, a 3D sculpt lit on screen"
                fill
                sizes="(max-width: 1023px) 92vw, 40vw"
                className="object-cover transition-transform duration-[1800ms] ease-out hover:scale-[1.03]"
              />
            </Mask>
            <div className="mt-4 flex items-center justify-between">
              <p className="u-label-sm text-mute">THE STUDIO · BENGALURU, INDIA</p>
              <p className="u-label-sm text-mute">SOLO PRACTICE</p>
            </div>

            <ul className="mt-10 hidden flex-wrap gap-2 lg:flex">
              {(artist.toolkit ?? []).map((tool) => (
                <li key={tool} className="u-label-sm rounded-full border border-hair px-3 py-1.5 text-ink/55">
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------- the text --------------------------------- */}
          <div className="lg:col-span-6 lg:col-start-7">
            {artist.body.map((para, i) => (
              <Reveal key={para.slice(0, 16)} as="p" className="u-body max-w-[34rem] text-ink/70" delay={i * 120}>
                {para}
              </Reveal>
            ))}

            <div className="mt-12">
              <p className="u-label text-mute">Philosophy</p>
              <ul className="mt-5 flex flex-col gap-4">
                {artist.philosophy.map((p, i) => (
                  <li key={p.id} className="flex items-start gap-4">
                    <span className="u-label-sm pt-1 text-cobalt">{String(i + 1).padStart(2, "0")}</span>
                    <span className="u-h3 max-w-[26rem] normal-case leading-[1.45] text-[1.05rem] font-normal">{p.line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <p className="u-label text-mute">Practice</p>
              <ul className="mt-5 border-t border-hair">
                {artist.practice.map((row) => (
                  <li key={row.id} className="group/pr flex items-start justify-between gap-8 border-b border-hair py-5">
                    <span className="u-h3 text-[1.05rem] uppercase transition-colors duration-500 group-hover/pr:text-cobalt">
                      {row.title}
                    </span>
                    <span className="u-body max-w-[20rem] text-right text-mute">{row.line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="mt-12 flex flex-wrap gap-2 lg:hidden">
              {(artist.toolkit ?? []).map((tool) => (
                <li key={tool} className="u-label-sm rounded-full border border-hair px-3 py-1.5 text-ink/55">
                  {tool}
                </li>
              ))}
            </ul>

            <CobaltLine className="mt-14 w-full" />
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <Button variant="primary" size="md" onClick={() => scrollTo("#commission")} data-cursor="WRITE">
                START A PROJECT
              </Button>
              <Button variant="ghost" size="md" onClick={() => scrollTo("#process")} arrow={false}>
                SEE THE METHOD →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudioSection;
