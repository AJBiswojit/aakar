import { Link, useParams } from "react-router-dom";
import { ModelViewer } from "@/components/3d/ModelViewer";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useProduct } from "@/hooks/useProduct";
import { useCartState } from "@/state/cart/CartContext";
import { useWishlistState } from "@/state/wishlist/WishlistContext";
import { formatMoney, formatPolygons, specBadges } from "@/utils/format";
import { RouteNotice } from "@/components/common/RouteNotice";

export function ProductPage() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug);
  const { cart, addToCart } = useCartState();
  const { wishlist, toggleWishlist } = useWishlistState();

  if (loading) {
    return <RouteNotice eyebrow="AAKAR / Store" title="Opening the form…">Loading product details.</RouteNotice>;
  }

  if (error || !product) {
    return (
      <RouteNotice eyebrow="AAKAR / Store" title="Form not found.">
        This form is not available in the current collection.
      </RouteNotice>
    );
  }

  const inCart = cart.includes(product.id);
  const saved = wishlist.includes(product.id);
  const specs = product.specifications ?? {};

  return (
    <main id="main" className="tone-light section pt-32">
      <div className="shell">
        <Link to="/collection" className="u-label link-underline text-mute hover:text-cobalt">
          ← BACK TO THE COLLECTION
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="fig aspect-4/5 w-full bg-soft lg:aspect-[4/3]">
              {product.model?.previewUrl ? (
                <ModelViewer
                  mode="showcase"
                  image={product.media.hero}
                  alt={`${product.name} — product preview`}
                  modelUrl={product.model.previewUrl}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="object-contain"
                  imageFadeClass="opacity-20"
                />
              ) : (
                <img
                  src={product.media.hero}
                  alt={`${product.name} — ${product.category.name.toLowerCase()} 3D artwork`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              )}
              <span className="u-label-sm absolute left-4 top-4 bg-white/85 px-2.5 py-2 text-ink">
                {product.model?.previewUrl ? "INTERACTIVE 3D PREVIEW" : "STATIC PREVIEW"}
              </span>
            </div>
          </div>

          <section className="lg:col-span-5" aria-labelledby="product-title">
            <SectionLabel>{product.category.name} · {product.year}</SectionLabel>
            <h1 id="product-title" className="u-display mt-6 text-[clamp(2.4rem,5vw,4.6rem)]">
              {product.name}
            </h1>
            <p className="u-body mt-6 text-ink/70">{product.description}</p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technical highlights">
              {specBadges(specs).map((badge) => (
                <li key={badge} className="u-label-sm rounded-full border border-hair px-3 py-2 text-ink/65">
                  {badge}
                </li>
              ))}
            </ul>

            <dl className="mt-8 border-t border-hair">
              <div className="flex justify-between gap-6 border-b border-hair py-3">
                <dt className="u-label text-mute">Topology</dt>
                <dd className="u-label text-right">{formatPolygons(specs.polygonCount)}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-hair py-3">
                <dt className="u-label text-mute">Formats</dt>
                <dd className="u-label text-right">{product.model?.formats?.join(" · ") || "—"}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-hair py-3">
                <dt className="u-label text-mute">License</dt>
                <dd className="u-label text-right">{product.license?.type ?? "—"}</dd>
              </div>
            </dl>

            <p className="u-h3 mt-8 tabular-nums">{formatMoney(product.pricing.amount, product.pricing.currency)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => addToCart(product.id)}>
                {inCart ? "IN YOUR BAG" : "ADD TO BAG"}
              </Button>
              <Button variant="outline" arrow={false} onClick={() => toggleWishlist(product.id)} aria-pressed={saved}>
                {saved ? "SAVED" : "SAVE FOR LATER"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductPage;
