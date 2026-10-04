import { useMemo, useState } from "react";
import { cx } from "@/utils/format";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { IconArrowRight } from "@/components/ui/Icons";
import { useCategories } from "@/hooks/useCategories";
import { useCollections } from "@/hooks/useCollections";
import { useProducts } from "@/hooks/useProducts";
import { useCategoryFilter } from "@/state/app/AppContext";
import { useMotion } from "@/components/common/MotionProvider";

/**
 * ROOM 04 — the collection. Categories as typography first; the image follows
 * the reader's cursor along the list instead of sitting in seven cards.
 */
export function CollectionSection() {
  const { categories: categoryData } = useCategories();
  const { collections } = useCollections();
  const { products } = useProducts();
  const [, setCategoryFilter] = useCategoryFilter();
  const { scrollTo } = useMotion();
  const categories = useMemo(() => {
    const counts = new Map();
    products.forEach((product) => counts.set(product.category.slug, (counts.get(product.category.slug) ?? 0) + 1));
    return categoryData.map((category) => ({ ...category, count: counts.get(category.slug) ?? 0 }));
  }, [categoryData, products]);
  const [hovered, setHovered] = useState(-1);
  const active = hovered >= 0 ? hovered : 0;
  const current = categories[active];

  const choose = (slug) => {
    setCategoryFilter?.(slug);
    scrollTo("#store-listing");
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
                  onClick={() => {
                    setHovered(i);
                    choose(cat.slug);
                  }}
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
                  <img
                    key={cat.id}
                    src={cat.preview}
                    alt={`${cat.name} preview from the AAKAR collection`}
                    loading={active === i ? "eager" : "lazy"}
                    className={cx(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-out",
                      active === i ? "scale-100 opacity-100" : "pointer-events-none scale-[1.05] opacity-0 lg:scale-100",
                    )}
                  />
                ))}
                <span className="u-label-sm absolute left-4 top-4 text-white/80 mix-blend-difference">
                  {current?.name?.toUpperCase()} / {String(current?.count ?? 0).padStart(2, "0")} FORMS
                </span>
              </div>
              <p className="u-label mt-4 flex flex-col gap-2 text-mute sm:flex-row sm:items-center sm:justify-between">
                <span>HOVER OR SELECT TO PREVIEW</span>
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
