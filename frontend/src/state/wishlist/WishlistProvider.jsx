import { useCallback, useEffect, useMemo, useReducer } from 'react'
import {
  WishlistContext,
  initialWishlistState,
  wishlistReducer,
} from './WishlistContext.js'
import { readStorage, writeStorage } from '../../utils/storage.js'

const STORAGE_KEY = 'wishlist'

/** AAKAR — WishlistProvider. Foundation only: save, unsave, clear. */
export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialWishlistState)

  useEffect(() => {
    const stored = readStorage(STORAGE_KEY)
    if (Array.isArray(stored) && stored.length > 0) {
      dispatch({ type: 'hydrate', items: stored })
    }
  }, [])

  useEffect(() => {
    writeStorage(STORAGE_KEY, state.items)
  }, [state.items])

  const toggleItem = useCallback((product) => {
    if (!product?.slug) return
    dispatch({
      type: 'toggle',
      item: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        pricing: product.pricing,
        category: product.category?.name || null,
        savedAt: new Date().toISOString(),
      },
    })
  }, [])

  const removeItem = useCallback((slug) => dispatch({ type: 'remove', slug }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const hasItem = useCallback(
    (slug) => state.items.some((item) => item.slug === slug),
    [state.items],
  )

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount: state.items.length,
      toggleItem,
      removeItem,
      clear,
      hasItem,
    }),
    [state.items, toggleItem, removeItem, clear, hasItem],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export default WishlistProvider
