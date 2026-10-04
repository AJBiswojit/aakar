"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { OverlayShell } from "@/components/overlays/OverlayShell";
import { formatMoney } from "@/lib/format";
import { useOverlay, useProducts } from "@/hooks/useAakar";

const normalize = (s = "") => s.toLowerCase();

/** Search runs over the mock product service — same contract as an API query. */
export function SearchOverlay() {
  const { kind, closeOverlay, openOverlay } = useOverlay();
  const products = useProducts();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = normalize(query).trim();
    if (!q) return products.slice(0, 4);
    return products
      .filter((p) =>
        [p.name, p.category?.name, p.shortDescription, ...(p.model?.formats ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [query, products]);

  const open = kind === "search";

  return (
    <OverlayShell open={open} onClose={closeOverlay} label="Search the atelier">
      <div className="tone-light flex h-full w-full flex-col overflow-y-auto pb-10 pt-16 pl-8 pr-14">
        <p className="u-label text-mute">Search / Atelier</p>
        <label className="mt-6 block">
          <span className="sr-only">Search forms</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Characters, rig, 4K, vessel…"
            className="u-h3 w-full border-0 border-b border-hair bg-transparent pb-4 uppercase outline-none placeholder:text-mute/50 focus:border-cobalt"
          />
        </label>

        <p className="u-label-sm mt-4 text-mute">
          {results.length ? `${results.length} FORMS` : "NO FORMS MATCH — TRY “CREATURE” OR “4K”"}
        </p>

        <ul className="mt-6 flex flex-col">
          {results.map((p) => (
            <li key={p.id} className="border-t border-hair last:border-b">
              <button
                type="button"
                onClick={() => openOverlay("product", { slug: p.slug })}
                data-cursor="VIEW"
                className="group flex w-full items-center gap-4 py-4 text-left"
              >
                <span className="fig h-14 w-14 shrink-0">
                  <Image src={p.media.thumbnail} alt="" width={112} height={112} className="h-full w-full object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="u-h3 block truncate text-base normal-case">{p.name}</span>
                  <span className="u-label-sm mt-1 block text-mute">
                    {p.category.name} · {formatMoney(p.pricing.amount, p.pricing.currency)}
                  </span>
                </span>
                <span className="u-label text-cobalt opacity-0 transition-opacity duration-400 group-hover:opacity-100">OPEN →</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </OverlayShell>
  );
}

export default SearchOverlay;
