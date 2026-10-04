import { RouteNotice } from "@/components/common/RouteNotice";
import { useCart } from "@/hooks/useCart";
import { formatMoney } from "@/utils/format";

export function CheckoutPage() {
  const { items, subtotal, currency } = useCart();

  if (!items.length) {
    return (
      <RouteNotice eyebrow="AAKAR / Checkout" title="Your bag is empty.">
        Add a form to your bag before continuing to checkout.
      </RouteNotice>
    );
  }

  return (
    <RouteNotice eyebrow="AAKAR / Checkout" title="Checkout is not connected yet.">
      <p>Payment and order processing are intentionally unavailable in this frontend foundation. Your bag has not been submitted.</p>
      <p className="mt-4">Current subtotal: {formatMoney(subtotal, currency)} · {items.length} {items.length === 1 ? "form" : "forms"}.</p>
    </RouteNotice>
  );
}

export default CheckoutPage;
