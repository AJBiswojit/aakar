"use client";

import Image from "next/image";
import { OverlayShell } from "@/components/overlays/OverlayShell";
import { cx, formatMoney, formatPolygons, specBadges } from "@/lib/format";
import { IconCheck, IconCube } from "@/components/ui/Icons";
import { useAakar, useOverlay, useProductDetail } from "@/hooks/useAakar";

const ROWS = [
  { key: "polygonCount", label: "Topology", format: (v) => formatPolygons(v).replace(" POLYGONS", "") },
  { key: "textureResolution", label: "Textures" },
  { key: "uvMapped", label: "UV mapped", bool: true },
  { key: "rigged", label: "Rigged", bool: true },
  { key: "animated", label: "Animated", bool: true },
  { key: "pbr", label: "PBR materials", bool: true },
];

/**
 * Product detail is fetched through the service layer on open — the same call
 * shape a real API would answer, with a genuine loading state.
 */
export function ProductQuickView() {
  const { kind, payload, closeOverlay } = useOverlay();
  const slug = kind === "product" ? payload?.slug : null;
  const { status, product } = useProductDetail(slug);
  const { cart, wishlist, addToCart, toggleWishlist } = useAakar();
  const inCart = product ? cart.includes(product.id) : false;
  const saved = product ? wishlist.includes(product.id) : false;

  return (
    <OverlayShell open={kind === "product"} onClose={closeOverlay} label="Form details">
      <div className="tone-light h-full w-full overflow-y-auto pb-12 pt-16 pl-8 pr-12">
        {status === "loading" || !product ? (
          <Skeleton />
        ) : (
          <>
            <p className="u-label text-mute">
              Form / {product.category.name} · {product.year}
            </p>

            <h2 className="u-h2 mt-4 text-[clamp(1.9rem,3.4vw,2.6rem)]">{product.name}</h2>

            <div className="fig mt-7 aspect-4/5 w-full">
              <Image
                src={product.media.hero}
                alt={`${product.name} — 3D render`}
                width={1200}
                height={1500}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {specBadges(product.specifications).map((b) => (
                <span key={b} className="u-label-sm rounded-full border border-hair px-2.5 py-1 text-ink/60">
                  {b}
                </span>
              ))}
            </div>

            <p className="u-body mt-6 text-ink/75">{product.description}</p>

            <dl className="mt-8 border-t border-hair">
              {ROWS.map((row) => {
                const raw = product.specifications[row.key];
                const value = row.bool ? (raw ? "Yes" : "No") : row.format ? row.format(raw) : raw;
                return (
                  <div key={row.key} className="flex items-center justify-between border-b border-hair py-3">
                    <dt className="u-label text-mute">{row.label}</dt>
                    <dd className="u-label flex items-center gap-2 text-right">
                      {row.bool ? (
                        <>
                          {raw ? <IconCheck className="h-3 w-3 text-cobalt" /> : null}
                          {String(value).toUpperCase()}
                        </>
                      ) : (
                        String(value).toUpperCase()
                      )}
                    </dd>
                  </div>
                );
              })}
              <div className="flex items-center justify-between border-b border-hair py-3">
                <dt className="u-label text-mute">Formats</dt>
                <dd className="u-label">{product.model.formats.join(" · ")}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-hair py-3">
                <dt className="u-label text-mute">License</dt>
                <dd className="u-label">{String(product.license.type).toUpperCase()}</dd>
              </div>
            </dl>

            <div className="mt-8 flex items-end justify-between">
              <span className="u-label text-mute">Price</span>
              <span className="u-h2 text-[1.8rem] tabular-nums">{formatMoney(product.pricing.amount, product.pricing.currency)}</span>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => addToCart(product.id)}
                className={cx(
                  "u-label flex items-center justify-between px-5 py-4 transition-colors duration-500",
                  inCart ? "bg-ink text-white" : "bg-cobalt text-white hover:bg-cobalt-dark",
                )}
              >
                {inCart ? "IN YOUR BAG ✓" : "ADD TO BAG"} <span aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="u-label flex items-center justify-between border border-ink/15 px-5 py-4 transition-colors duration-500 hover:border-cobalt hover:text-cobalt"
              >
                {saved ? "SAVED TO WISHLIST" : "SAVE TO WISHLIST"}
              </button>
              {product.isShowcase ? (
                <button
                  type="button"
                  onClick={() => {
                    closeOverlay();
                    setTimeout(() => document.querySelector("#examine")?.scrollIntoView({ behavior: "smooth" }), 200);
                  }}
                  className="u-label mt-2 flex items-center gap-3 text-cobalt"
                >
                  <IconCube className="h-4 w-4" /> EXAMINE THE FULL MESH →
                </button>
              ) : (
                <p className="u-label-sm mt-2 text-mute">3D PREVIEW AVAILABLE ON THE SHOWCASE FORM</p>
              )}
            </div>
          </>
        )}
      </div>
    </OverlayShell>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-24 bg-hair" />
      <div className="mt-5 h-8 w-2/3 bg-hair" />
      <div className="mt-7 aspect-4/5 w-full bg-hair" />
      <div className="mt-6 space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-3 w-full bg-hair" />
        ))}
      </div>
    </div>
  );
}

export default ProductQuickView;
