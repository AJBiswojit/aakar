"use client";

import { Reveal, RevealLines } from "@/components/ui/SectionLabel";
import { useSite } from "@/hooks/useAakar";

/**
 * The closing beat: the wordmark, the three words, then silence.
 */
export function FinalStatement() {
  const site = useSite();
  const closing = site?.brandClosing ?? { eyebrow: "AAKAR", lines: ["Form.", "Craft.", "Digital."] };

  return (
    <section data-nav-theme="light" className="tone-soft relative overflow-hidden py-[clamp(5rem,13vh,9rem)]">
      <div className="shell">
        <p className="u-label text-cobalt">{closing.eyebrow}</p>

        <h2 className="u-display mt-8 text-[clamp(3.6rem,15.5vw,15rem)] font-medium leading-[0.84] text-ink">
          AAKAR
        </h2>

        <div className="mt-10 flex flex-col gap-10 border-t border-hair pt-8 md:flex-row md:items-end md:justify-between">
          <RevealLines
            as="div"
            lines={closing.lines}
            className="u-display text-[clamp(1.5rem,3.4vw,2.75rem)] text-ink/85"
            step={120}
          />
          <Reveal as="p" className="u-body max-w-[22rem] text-mute md:text-right" delay={200}>
            {closing.line}
          </Reveal>
        </div>

        <Reveal as="div" className="mt-14 flex items-center justify-between" delay={260}>
          <p className="u-label-sm text-mute">
            {site?.brand?.origin?.toUpperCase()} · EST {site?.brand?.established}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="u-label link-underline text-ink transition-colors hover:text-cobalt"
            data-cursor="TOP"
          >
            RETURN TO THE ENTRANCE ↑
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export default FinalStatement;
