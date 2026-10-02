import { createContext } from 'react'

/**
 * AAKAR — Cart context
 *
 * Digital licences are single-unit: one line per product, no quantity field
 * (a licence is not a physical unit). Kept intentionally thin in this phase —
 * pricing, tax and checkout belong to the commerce phase and the backend.
 */
export const CartContext = createContext(null)

export const initialCartState = { items: [] }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return { ...state, items: Array.isArray(action.items) ? action.items : [] }

    case 'add': {
      const exists = state.items.some((item) => item.slug === action.item.slug)
      if (exists) return state
      return { ...state, items: [...state.items, action.item] }
    }

    case 'remove':
      return { ...state, items: state.items.filter((item) => item.slug !== action.slug) }

    case 'clear':
      return { ...state, items: [] }

    default:
      return state
  }
}

/** Derived totals. Never stored, always computed. */
export function summariseCart(items = []) {
  const subtotal = items.reduce((sum, item) => sum + (item.pricing?.amount || 0), 0)
  return {
    itemCount: items.length,
    subtotal,
    currency: items[0]?.pricing?.currency || 'INR',
  }
}

export default CartContext
