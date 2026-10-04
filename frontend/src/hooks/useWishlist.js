import { useProducts } from "./useProducts";
import { useWishlistState } from "@/state/wishlist/WishlistContext";

export function useWishlist() {
  const state = useWishlistState();
  const { products } = useProducts();
  const items = state.wishlist.map((id) => products.find((product) => product.id === id)).filter(Boolean);

  return { ...state, items, count: items.length };
}
