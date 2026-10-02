import { useContext } from 'react'
import { WishlistContext } from '../state/wishlist/WishlistContext.js'

/** AAKAR — useWishlist. Saved products, keyed by slug. */
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider.')
  }
  return context
}

export default useWishlist
