import { AppProvider } from './app/AppProvider.jsx'
import { CartProvider } from './cart/CartProvider.jsx'
import { WishlistProvider } from './wishlist/WishlistProvider.jsx'

/**
 * AAKAR — Provider composition
 *
 * One entry point for global state so App.jsx stays a layout. Order matters:
 * AppProvider uses router hooks, so it must sit inside the Router.
 */
export function AppProviders({ children }) {
  return (
    <AppProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </AppProvider>
  )
}

export { AppProvider } from './app/AppProvider.jsx'
export { CartProvider } from './cart/CartProvider.jsx'
export { WishlistProvider } from './wishlist/WishlistProvider.jsx'

export default AppProviders
