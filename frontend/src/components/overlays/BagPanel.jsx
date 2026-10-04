"use client";

import Image from "next/image";
import { OverlayShell } from "@/components/overlays/OverlayShell";
import { cx, formatMoney, specBadges } from "@/lib/format";
import { IconClose } from "@/components/ui/Icons";
import { useAakar, useCart, useOverlay, useWishlist } from "@/hooks/useAakar";

/**
 * Cart + wishlist live in one panel. They are fed by real user actions only —
 * nothing is pre-filled with fake quantities.
 */
export function BagPanel() {
  const { kind, closeOverlay, openOverlay } = useOverlay();
  const { toggleWishlist, removeFromCart } = useAakar();
  const cart = useCart();
  const wishlist = useWishlist();
  const tab = kind === "wishlist" ? "wishlist" : "cart";

  const items = tab === "cart" ? cart.items : wishlist.items;

  return (
    <OverlayShell open={kind === "cart" || kind === "wishlist"} onClose={closeOverlay} label={tab === "cart" ? "Cart" : "Wishlist"}>
      <div className="tone-light flex h-full w-full flex-col overflow-y-auto pb-10 pt-16 pl-8 pr-14">
        <p className="u-label text-mute">Atelier / {tab}</p>

        <div className="mt-6 flex gap-6 border-b border-hair pb-3">
          {[
            { id: "cart", label: "Cart", count: cart.count },
            { id: "wishlist", label: "Wishlist", count: wishlist.count },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => openOverlay(t.id)}
              className={cx(
                "u-label relative pb-1 transition-colors duration-400",
                tab === t.id ? "text-cobalt" : "text-mute hover:text-ink",
              )}
            >
              {t.label.toUpperCase()} ({String(t.count).padStart(2, "0")})
              {tab === t.id ? <span className="absolute -bottom-[13px] left-0 h-px w-full bg-cobalt" /> : null}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="mt-12">
            <p className="u-h3 max-w-[16rem] normal-case leading-tight">
              {tab === "cart" ? "Your bag is empty." : "Nothing saved yet."}
            </p>
            <p className="u-body mt-3 text-mute">
              {tab === "cart"
                ? "Forms are added from the collection below the exhibition."
                : "Save a form to keep examining it later."}
            </p>
            <button
              type="button"
              onClick={() => {
                closeOverlay();
                document.querySelector("#store")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="u-label mt-8 inline-flex items-center gap-3 border border-ink/15 px-5 py-3 transition-colors duration-500 hover:border-cobalt hover:text-cobalt"
            >
              BROWSE THE COLLECTION →
            </button>
          </div>
        ) : (
          <ul className="mt-6 flex flex-col">
            {items.map((p) => (
              <li key={p.id} className="flex gap-4 border-b border-hair py-5">
                <button type="button" onClick={() => openOverlay("product", { slug: p.slug })} className="fig h-24 w-20 shrink-0">
                  <Image src={p.media.thumbnail} alt={p.name} width={160} height={192} className="h-full w-full object-cover" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="u-h3 text-[0.95rem] uppercase">{p.name}</p>
                  <p className="u-label-sm mt-1 text-mute">{specBadges(p.specifications).join(" · ")}</p>
                  <p className="u-label mt-3">{formatMoney(p.pricing.amount, p.pricing.currency)}</p>
                </div>
                <button
                  type="button"
                  aria-label={tab === "cart" ? `Remove ${p.name} from cart` : `Remove ${p.name} from wishlist`}
                  onClick={() => (tab === "cart" ? removeFromCart(p.id) : toggleWishlist(p.id))}
                  className="h-7 w-7 shrink-0 text-mute transition-colors hover:text-cobalt"
                >
                  <IconClose className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {tab === "cart" && cart.count > 0 ? (
          <div className="mt-auto pt-10">
            <div className="flex items-end justify-between">
              <span className="u-label text-mute">Subtotal</span>
              <span className="u-h3 tabular-nums">{formatMoney(cart.subtotal, cart.currency)}</span>
            </div>
            <button
              type="button"
              className="u-label mt-5 flex w-full items-center justify-between bg-cobalt px-5 py-4 text-white transition-colors duration-500 hover:bg-cobalt-dark"
            >
              CHECKOUT <span aria-hidden="true">→</span>
            </button>
            <p className="u-label-sm mt-3 text-mute">INSTANT DOWNLOAD · GLB FBX OBJ · COMMERCIAL LICENSE</p>
          </div>
        ) : null}
      </div>
    </OverlayShell>
  );
}

export default BagPanel;
