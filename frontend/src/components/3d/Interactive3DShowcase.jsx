import { useState } from "react";
import { cx, formatMoney, formatPolygons, specBadges } from "@/utils/format";
import { ModelViewer } from "@/components/3d/ModelViewer";
import { Reveal, SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { IconArrows, IconOrbit } from "@/components/ui/Icons";
import { useShowcaseProduct } from "@/hooks/useProducts";
import { useOverlay } from "@/state/app/AppContext";
import { useCartState } from "@/state/cart/CartContext";

/**
 * ROOM 05 — the museum object. One form, lit, orbitable, documented.
 */
export function Interactive3DShowcase() {
  const { product } = useShowcaseProduct();
  const [meshMode, setMeshMode] = useState("surface");
  const [zoom, setZoom] = useState(1);
  const zoomStep = (dir) => setZoom((z) => Math.min(1.5, Math.max(0.8, Math.round((z + dir * 0.15) * 100) / 100)));
  const { cart, addToCart } = useCartState();
  const { openOverlay } = useOverlay();

  if (!product) return null;

  const specs = [
    formatPolygons(product.specifications.polygonCount),
    `${product.specifications.textureResolution} TEXTURES`,
    ...(product.specifications.pbr ? ["PBR"] : []),
    ...(product.specifications.rigged ? ["RIGGED"] : []),
  ];
  const inCart = cart.includes(product.id);

  return (
    <section
      id="examine"
      data-nav-id="store"
      data-nav-theme="dark"
      className="tone-dark grain relative flex min-h-[104svh] flex-col overflow-hidden py-10 lg:min-h-[100svh]"
    >
      <ModelViewer
        mode="showcase"
        image={product.media.hero}
        alt={`${product.name} — interactive 3D model on a dark plinth`}
        modelUrl={product.model.previewUrl}
        imgClassName="object-contain"
        imageFadeClass="opacity-[0.14]"
        imageBackdropClass="opacity-[0.5]"
        imgWidth={928}
        imgHeight={1152}
        className="absolute inset-0 h-full w-full"
        sceneProps={{ meshMode, zoom }}
      />

      <div className="shell relative z-10 flex flex-1 flex-col justify-between pt-24 pb-6">
        <header className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel tone="dark" index="06">
              3D Showcase / Live viewer
            </SectionLabel>
            <h2 className="u-display mt-6 text-[clamp(2.2rem,6.4vw,4.6rem)] text-white">
              Examine
              <br />
              the form.
            </h2>
          </div>
          <Reveal as="div" className="md:col-span-4 md:col-start-9 md:text-right" delay={140}>
            <p className="u-label text-cobalt-light">
              {product.name} · {product.category.name}
            </p>
            <p className="u-body mt-3 text-white/55 md:text-right">{product.shortDescription}</p>
          </Reveal>
        </header>

        {/* --------------------------------- bottom rail -------------------------------- */}
        <div className="mt-10 grid gap-8 border-t border-white/10 pt-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="u-label-sm text-white/35">SPECIFICATION</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {specs.map((s) => (
                <li key={s} className="u-label text-white/70">
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {specBadges(product.specifications)
                .filter((b) => !["PBR"].includes(b))
                .map((b) => (
                  <li key={b} className="u-label-sm text-cobalt-light/75">
                    {b}
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4 md:col-span-3 md:items-center">
            <div className="flex overflow-hidden rounded-[2px] border border-white/15">
              {[
                { id: "surface", label: "SURFACE" },
                { id: "mesh", label: "MESH" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMeshMode(m.id)}
                  aria-pressed={meshMode === m.id}
                  className={cx(
                    "u-label px-4 py-2.5 transition-colors duration-400",
                    meshMode === m.id ? "bg-cobalt text-white" : "text-white/55 hover:text-white",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => zoomStep(-1)}
                aria-label="Zoom out"
                className="u-label h-7 w-7 border border-white/15 text-white/60 transition-colors hover:border-cobalt hover:text-white"
              >
                −
              </button>
              <span className="u-label-sm w-14 text-center tabular-nums text-white/40">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                onClick={() => zoomStep(1)}
                aria-label="Zoom in"
                className="u-label h-7 w-7 border border-white/15 text-white/60 transition-colors hover:border-cobalt hover:text-white"
              >
                +
              </button>
            </div>
            <p className="u-label-sm flex items-center gap-2 text-white/30">
              <IconOrbit className="h-4 w-4" /> DRAG TO ORBIT
              <IconArrows className="ml-2 h-4 w-4" /> WHEEL SCROLLS THE PAGE
            </p>
          </div>

          <div className="md:col-span-4 md:text-right">
            <p className="u-h3 tabular-nums text-white">
              {formatMoney(product.pricing.amount, product.pricing.currency)}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row md:justify-end">
              <Button variant="primary" size="sm" tone="dark" onClick={() => addToCart(product.id)}>
                {inCart ? "IN YOUR BAG ✓" : "ADD TO BAG"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                tone="dark"
                onClick={() => openOverlay("product", { slug: product.slug })}
              >
                VIEW PRODUCT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Interactive3DShowcase;
