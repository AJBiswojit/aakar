import { useContext } from 'react'
import { CartContext } from '../state/cart/CartContext.js'

/**
 * AAKAR — useCart
 *
 * Cart foundation: items, derived totals and the three operations this phase
 * needs. Checkout logic is intentionally absent.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider.')
  }
  return context
}

export default useCart
