"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/format";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowRight } from "@/components/ui/Icons";
import { useCategories, useCollections, useAakar } from "@/hooks/useAakar";
import { useMotion } from "@/components/system/MotionProvider";

/**
 * ROOM 04 — the collection. Categories as typography first; the image follows
 * the reader's cursor along the list instead of sitting in seven cards.
 */
export function CollectionSection() {
  const categories = useCategories();
  const collections = useCollections();
  const { setCategoryFilter } = useAakar();
  const { scrollTo } = useMotion();
  const [hovered, setHovered] = useState(-1);
  const active = hovered >= 0 ? hovered : 0;
  const current = categories[active];

  const choose = (slug) => {
    setCategoryFilter?.(slug);
    scrollTo("#store");
  };

  return (
    <section id="store" data-nav-id="store" data-nav-theme="light" className="tone-light section">
      <div className="shell">
        <header className="flex flex-col gap-8 border-b border-hair pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04">The Collection</SectionLabel>
            <h2 className="u-h2 mt-6">
              <Reveal as="span" className="block">The Collection</Reveal>
            </h2>
          </div>
          <Reveal as="div" className="max-w-[26rem]" delay={120}>
            <p className="u-body text-mute">
              Digital forms built for artists, creators and worlds yet to be made.
            </p>
            {collections[0] ? (
              <p className="u-label-sm mt-4 text-ink/45">
                {collections[0].name.toUpperCase()} · {collections[0].volume} · {collections[0].year}
              </p>
            ) : null}
          </Reveal>
        </header>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* --------------------------------- the list -------------------------------- */}
          <ul className="lg:col-span-7" onMouseLeave={() => setHovered(-1)}>
            {categories.map((cat, i) => (
              <li key={cat.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onClick={() => choose(cat.slug)}
                  data-cursor="OPEN"
                  className={cx(
                    "group/cat relative flex w-full items-center justify-between gap-6 border-b border-hair py-5 text-left transition-colors duration-500 md:py-7",
                    hovered === i && "border-transparent",
                  )}
                >
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-cobalt transition-transform duration-[700ms] ease-out" style={{ transform: `scaleX(${hovered === i ? 1 : 0})` }} />
                  <span className="flex items-baseline gap-4 md:gap-7">
                    <span className={cx("u-label tabular-nums transition-colors duration-500", hovered === i ? "text-cobalt" : "text-mute")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cx(
                        "u-display text-[clamp(1.6rem,4.4vw,3.1rem)] transition-all duration-[600ms] ease-out",
                        hovered === i ? "translate-x-1.5 text-cobalt" : "text-ink",
                      )}
                    >
                      {cat.name}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-4 md:gap-7">
                    <span className="hidden max-w-[14rem] text-right u-label-sm text-mute md:block">{cat.note}</span>
                    <span className="u-label tabular-nums text-mute">{String(cat.count).padStart(2, "0")}</span>
                    <IconArrowRight className={cx("transition-all duration-500", hovered === i ? "translate-x-1 text-cobalt" : "text-ink/30")} />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* --------------------------------- preview --------------------------------- */}
          <div className="lg:col-span-5">
            <div className="sticky top-[18vh]">
              <div className="fig aspect-4/5 w-full bg-soft">
                {categories.map((cat, i) => (
                  <Image
                    key={cat.id}
                    src={cat.preview}
                    alt={`${cat.name} preview from the AAKAR collection`}
                    fill
                    sizes="(max-width: 1023px) 92vw, 32vw"
                    className={cx(
                      "object-cover transition-all duration-[1100ms] ease-out",
                      active === i ? "scale-100 opacity-100" : "scale-[1.05] opacity-0 lg:scale-100",
                      active === i ? "" : "pointer-events-none absolute inset-0",
                    )}
                    style={{ opacity: active === i ? 1 : 0 }}
                  />
                ))}
                <span className="u-label-sm absolute left-4 top-4 text-white/80 mix-blend-difference">
                  {current?.name?.toUpperCase()} / {String(current?.count ?? 0).padStart(2, "0")} FORMS
                </span>
              </div>
              <p className="u-label mt-4 flex items-center justify-between text-mute">
                <span>HOVER TO PREVIEW</span>
                <span className="text-cobalt">CLICK TO FILTER THE STORE</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
