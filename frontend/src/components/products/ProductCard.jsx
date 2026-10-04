import { Link } from "react-router-dom";
import { cx, formatMoney, specBadges } from "@/utils/format";
import { CobaltLine } from "@/components/ui/SectionLabel";
import { IconCube, IconHeart } from "@/components/ui/Icons";
import { useCartState } from "@/state/cart/CartContext";
import { useWishlistState } from "@/state/wishlist/WishlistContext";
import { useOverlay } from "@/state/app/AppContext";

/**
 * A product card that uses hierarchy instead of chrome: image first, metadata
 * small and monospaced, one cobalt hairline as the only decoration.
 */
export function ProductCard({ product, index = 0, total = 4, offset = false }) {
  const { cart, addToCart } = useCartState();
  const { wishlist, toggleWishlist } = useWishlistState();
  const { openOverlay } = useOverlay();

  if (!product) return null;

  const inCart = cart.includes(product.id);
  const saved = wishlist.includes(product.id);
  const badges = specBadges(product.specifications);

  return (
    <article
      className={cx("group/product relative", offset && "lg:translate-y-16")}
      data-cursor="VIEW"
    >
      <button
        type="button"
        onClick={() => openOverlay("product", { slug: product.slug })}
        className="fig block w-full bg-soft"
        style={{ aspectRatio: "4 / 5" }}
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.media.thumbnail}
          alt={`${product.name} — ${product.category.name.toLowerCase()} 3D asset render`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-[scale] duration-[1400ms] ease-out group-hover/product:scale-[1.04]"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-cobalt transition-transform duration-700 ease-out group-hover/product:scale-x-100" />
        <span className="u-label-sm pointer-events-none absolute left-4 top-4 text-white/70 mix-blend-difference">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="u-label-sm pointer-events-none absolute right-4 top-4 flex items-center gap-1.5 text-white/60 mix-blend-difference transition-colors duration-500 group-hover/product:text-cobalt-light">
          [ 3D MODEL ]
        </span>
        <span className="u-label pointer-events-none absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 text-white opacity-0 transition-all duration-500 ease-out group-hover/product:translate-y-0 group-hover/product:opacity-100">
          <IconCube className="h-4 w-4" /> VIEW IN 3D
        </span>
      </button>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="u-h3 text-[1.15rem] uppercase transition-colors duration-500 group-hover/product:text-cobalt">
            {product.name}
          </h3>
          <p className="u-label-sm mt-2 text-mute">
            {product.category.name} · {product.year}
          </p>
          <p className="u-label-sm mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink/55">
            {badges.map((b, i) => (
              <span key={b}>
                {b}
                {i < badges.length - 1 ? <span className="px-1 text-hair">/</span> : null}
              </span>
            ))}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="u-h3 text-[1.05rem] tabular-nums">{formatMoney(product.pricing.amount, product.pricing.currency)}</p>
          <p className="u-label-sm mt-1 text-mute">{product.model.formats.slice(0, 3).join(" · ")}</p>
        </div>
      </div>

      <CobaltLine className="mt-5 w-full opacity-0 transition-opacity duration-500 group-hover/product:opacity-100" />

      <div className="mt-4 flex items-center gap-5">
        <Link
          to={`/product/${product.slug}`}
          className="u-label link-underline text-ink transition-colors duration-400 hover:text-cobalt"
        >
          VIEW PRODUCT →
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          className={cx("u-label inline-flex items-center gap-2 transition-colors duration-400", saved ? "text-cobalt" : "text-mute hover:text-ink")}
        >
          <IconHeart filled={saved} className="h-3.5 w-3.5" /> {saved ? "SAVED" : "SAVE"}
        </button>
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="u-label ml-auto hidden text-mute transition-colors duration-400 hover:text-cobalt sm:inline"
        >
          {inCart ? "IN BAG ✓" : "ADD TO BAG"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
