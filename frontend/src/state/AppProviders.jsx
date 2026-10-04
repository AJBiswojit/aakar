import { MotionProvider } from "@/components/common/MotionProvider";
import { AppStateProvider } from "./app/AppContext";
import { CartProvider } from "./cart/CartContext";
import { WishlistProvider } from "./wishlist/WishlistContext";

export function AppProviders({ children }) {
  return (
    <AppStateProvider>
      <CartProvider>
        <WishlistProvider>
          <MotionProvider>{children}</MotionProvider>
        </WishlistProvider>
      </CartProvider>
    </AppStateProvider>
  );
}
