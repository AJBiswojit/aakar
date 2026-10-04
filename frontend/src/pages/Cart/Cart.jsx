import { Link } from "react-router-dom";
import { IconClose } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useCart } from "@/hooks/useCart";
import { formatMoney } from "@/utils/format";

export function CartPage() {
  const { items, count, subtotal, currency, removeFromCart } = useCart();

  return (
    <main id="main" className="tone-light section min-h-[70svh] pt-32">
      <div className="shell max-w-5xl">
        <SectionLabel>Atelier / Cart</SectionLabel>
        <h1 className="u-display mt-7 text-[clamp(2.5rem,7vw,5.5rem)]">Your bag.</h1>

        {count === 0 ? (
          <div className="mt-10 border-t border-hair pt-8">
            <p className="u-body text-mute">Your bag is empty. Explore the collection to find a form.</p>
            <Link to="/collection" className="u-label mt-6 inline-block text-cobalt link-underline">
              EXPLORE THE COLLECTION →
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 border-t border-hair pt-8 md:grid-cols-12">
            <ul className="md:col-span-8">
              {items.map((product) => (
                <li key={product.id} className="flex gap-5 border-b border-hair py-5 first:pt-0">
                  <Link to={`/product/${product.slug}`} className="fig h-28 w-24 shrink-0" aria-label={`View ${product.name}`}>
                    <img src={product.media.thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link to={`/product/${product.slug}`} className="u-h3 text-base link-underline">
                      {product.name}
                    </Link>
                    <p className="u-label-sm mt-2 text-mute">{product.category.name} · DIGITAL ASSET</p>
                    <p className="u-label mt-4">{formatMoney(product.pricing.amount, product.pricing.currency)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="h-9 w-9 shrink-0 text-mute transition-colors hover:text-cobalt"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <IconClose />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="md:col-span-4">
              <div className="flex items-end justify-between border-b border-hair pb-4">
                <span className="u-label text-mute">Subtotal · {count} {count === 1 ? "FORM" : "FORMS"}</span>
                <span className="u-h3 tabular-nums">{formatMoney(subtotal, currency)}</span>
              </div>
              <Link to="/checkout" className="u-label mt-5 flex items-center justify-between bg-cobalt px-5 py-4 text-white transition-colors hover:bg-cobalt-dark">
                CONTINUE TO CHECKOUT <span aria-hidden="true">→</span>
              </Link>
              <p className="u-label-sm mt-3 text-mute">Digital products · no shipping required</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
