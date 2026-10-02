import { useCallback, useEffect, useMemo, useReducer } from 'react'
import {
  CartContext,
  cartReducer,
  initialCartState,
  summariseCart,
} from './CartContext.js'
import { readStorage, writeStorage } from '../../utils/storage.js'

const STORAGE_KEY = 'cart'

/**
 * AAKAR — CartProvider
 *
 * Foundation only: add, remove, clear and derived totals. No pricing rules, no
 * tax, no checkout state. When accounts exist, the persisted snapshot is
 * replaced by a server-backed cart through the service layer.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // Restore once on mount.
  useEffect(() => {
    const stored = readStorage(STORAGE_KEY)
    if (Array.isArray(stored) && stored.length > 0) {
      dispatch({ type: 'hydrate', items: stored })
    }
  }, [])

  // Persist on every change.
  useEffect(() => {
    writeStorage(STORAGE_KEY, state.items)
  }, [state.items])

  /** Accepts a product record (or the minimum fields needed for a line). */
  const addItem = useCallback((product) => {
    if (!product?.slug) return
    dispatch({
      type: 'add',
      item: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        pricing: product.pricing,
        license: product.license?.type || null,
        category: product.category?.name || null,
        addedAt: new Date().toISOString(),
      },
    })
  }, [])

  const removeItem = useCallback((slug) => dispatch({ type: 'remove', slug }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const hasItem = useCallback(
    (slug) => state.items.some((item) => item.slug === slug),
    [state.items],
  )

  const summary = useMemo(() => summariseCart(state.items), [state.items])

  const value = useMemo(
    () => ({ items: state.items, ...summary, addItem, removeItem, clear, hasItem }),
    [state.items, summary, addItem, removeItem, clear, hasItem],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
