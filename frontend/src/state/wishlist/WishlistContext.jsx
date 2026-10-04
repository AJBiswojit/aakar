import { createContext, useCallback, useContext, useMemo, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const toggleWishlist = useCallback((productId) => {
    setWishlist((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  }, []);
  const removeFromWishlist = useCallback((productId) => {
    setWishlist((current) => current.filter((id) => id !== productId));
  }, []);
  const value = useMemo(
    () => ({ wishlist, toggleWishlist, removeFromWishlist }),
    [wishlist, toggleWishlist, removeFromWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlistState() {
  const state = useContext(WishlistContext);
  if (!state) throw new Error("Wishlist hooks must be used inside WishlistProvider.");
  return state;
}
