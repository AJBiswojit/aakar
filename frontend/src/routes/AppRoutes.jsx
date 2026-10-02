import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home/Home.jsx'
import { Loader } from '../components/ui/Loader.jsx'

/**
 * AAKAR — AppRoutes
 *
 * The route table. Home is loaded eagerly because it is the entry experience;
 * every other route is code-split, so the first paint carries the homepage and
 * nothing else.
 *
 * For this phase only `/` carries full UI. The remaining routes resolve,
 * inherit the theme system and responsive layout, and state clearly what is
 * planned for them — nothing is stubbed out silently.
 */

const Collection = lazy(() => import('../pages/Collection/Collection.jsx'))
const Product = lazy(() => import('../pages/Product/Product.jsx'))
const Studio = lazy(() => import('../pages/Studio/Studio.jsx'))
const About = lazy(() => import('../pages/About/About.jsx'))
const Contact = lazy(() => import('../pages/Contact/Contact.jsx'))
const Cart = lazy(() => import('../pages/Cart/Cart.jsx'))
const Checkout = lazy(() => import('../pages/Checkout/Checkout.jsx'))
const Account = lazy(() => import('../pages/Account/Account.jsx'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound.jsx'))

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

/** Shown while a route chunk is fetching — a rule, not a spinner. */
function RouteFallback() {
  return (
    <section className="aakar-route-fallback" data-theme="light" data-nav-theme="light">
      <Loader label="Loading" />
    </section>
  )
}

export default AppRoutes
