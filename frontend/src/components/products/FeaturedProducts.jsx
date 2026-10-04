"use client";

import { useMemo } from "react";
import { cx } from "@/lib/format";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { useCategories, useCategoryFilter, useFeaturedProducts, useProducts, useSite } from "@/hooks/useAakar";

/**
 * ROOM 04.5 — the store itself. Only purchasable forms, only real specs.
 */
export function FeaturedProducts() {
  const products = useProducts();
  const featured = useFeaturedProducts();
  const categories = useCategories();
  const [categoryFilter, setCategoryFilter] = useCategoryFilter();
  const intro = useSite()?.storeIntro;

  const chips = useMemo(() => {
    const inUse = new Map();
    products.forEach((p) => inUse.set(p.category.slug, (inUse.get(p.category.slug) ?? 0) + 1));
    return categories
      .filter((c) => inUse.get(c.slug))
      .map((c) => ({ slug: c.slug, name: c.name, count: inUse.get(c.slug) }));
  }, [products, categories]);

  const list = useMemo(() => {
    const source = categoryFilter ? products.filter((p) => p.category.slug === categoryFilter) : featured;
    return source.length ? source : products;
  }, [categoryFilter, products, featured]);

  return (
    <section id="store-listing" data-nav-id="store" data-nav-theme="light" className="tone-soft section">
      <div className="shell">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="05">{intro?.eyebrow ?? "Available in the atelier"}</SectionLabel>
            <h2 className="u-h2 mt-6">
              {(intro?.headline ?? ["Ready to", "download"]).map((line, i) => (
                <Reveal key={line} as="span" className={cx("block", i === 2 && "text-mute")} delay={i * 110}>
                  {line}
                </Reveal>
              ))}
            </h2>
          </div>
          <Reveal as="p" className="u-body max-w-[24rem] text-mute" delay={160}>
            {intro?.supporting}
          </Reveal>
        </header>

        {/* ---------------------------------- filters --------------------------------- */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-y border-hair py-4">
          <span className="u-label-sm mr-3 text-mute">FILTER</span>
          <button
            type="button"
            onClick={() => setCategoryFilter?.(null)}
            className={cx(
              "u-label-sm rounded-full border px-3 py-1.5 transition-colors duration-400",
              !categoryFilter ? "border-ink bg-ink text-white" : "border-hair text-ink/60 hover:border-cobalt hover:text-cobalt",
            )}
          >
            ALL ({String(products.length).padStart(2, "0")})
          </button>
          {chips.map((chip) => {
            const on = categoryFilter === chip.slug;
            return (
              <button
                key={chip.slug}
                type="button"
                onClick={() => setCategoryFilter?.(on ? null : chip.slug)}
                className={cx(
                  "u-label-sm rounded-full border px-3 py-1.5 transition-colors duration-400",
                  on ? "border-cobalt bg-cobalt text-white" : "border-hair text-ink/60 hover:border-cobalt hover:text-cobalt",
                )}
              >
                {chip.name.toUpperCase()} ({String(chip.count).padStart(2, "0")})
              </button>
            );
          })}
          <span className="u-label-sm ml-auto hidden text-mute lg:block">
            FORMATS · {(intro?.formats ?? []).join(" / ")}
          </span>
        </div>

        <div className="mt-14 lg:mt-20">
          <ProductGrid products={list} columns={list.length > 4 ? 3 : 2} />
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-hair pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="u-label text-mute">
            {categoryFilter ? `SHOWING ${String(categoryFilter).toUpperCase()} — ` : ""}
            {String(list.length).padStart(2, "0")} FORMS · PRICES EXCL. GST
          </p>
          {categoryFilter ? (
            <button
              type="button"
              onClick={() => setCategoryFilter?.(null)}
              className="u-label self-start text-cobalt underline-offset-4 hover:underline sm:self-auto"
            >
              CLEAR FILTER ×
            </button>
          ) : (
            <a href="#examine" className="u-label link-underline self-start sm:self-auto" data-cursor="3D">
              EXAMINE A FORM IN 3D →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
