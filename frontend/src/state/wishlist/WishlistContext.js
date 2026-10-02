import { createContext } from 'react'

/**
 * AAKAR — Wishlist context
 *
 * Saved products. Backend-ready: when accounts land, the same operations are
 * proxied through a wishlist service and this provider hydrates from it.
 */
export const WishlistContext = createContext(null)

export const initialWishlistState = { items: [] }

export function wishlistReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, items: Array.isArray(action.items) ? action.items : [] }

    case 'toggle': {
      const exists = state.items.some((item) => item.slug === action.item.slug)
      return {
        ...state,
        items: exists
          ? state.items.filter((item) => item.slug !== action.item.slug)
          : [...state.items, action.item],
      }
    }

    case 'remove':
      return { ...state, items: state.items.filter((item) => item.slug !== action.slug) }

    case 'clear':
      return { ...state, items: [] }

    default:
      return state
  }
}

export default WishlistContext
