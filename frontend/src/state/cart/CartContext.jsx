import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = useCallback((productId) => {
    setCart((current) => (current.includes(productId) ? current : [...current, productId]));
  }, []);
  const removeFromCart = useCallback((productId) => {
    setCart((current) => current.filter((id) => id !== productId));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const value = useMemo(
    () => ({ cart, addToCart, removeFromCart, clearCart }),
    [cart, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartState() {
  const state = useContext(CartContext);
  if (!state) throw new Error("Cart hooks must be used inside CartProvider.");
  return state;
}
