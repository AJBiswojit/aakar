import { useCartState } from "@/state/cart/CartContext";
import { useProducts } from "./useProducts";

export function useCart() {
  const state = useCartState();
  const { products } = useProducts();
  const items = state.cart.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const subtotal = items.reduce((total, product) => total + product.pricing.amount, 0);
  const currency = items[0]?.pricing.currency ?? "INR";

  return { ...state, items, count: items.length, subtotal, currency };
}
