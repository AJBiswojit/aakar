/**
 * AAKAR — Route & navigation metadata
 *
 * One definition of the site's information architecture, consumed by the
 * navbar, the mobile drawer, the footer and the route table. Add a route here
 * and every navigation surface follows.
 */

export const PRIMARY_NAV = [
  { id: 'nav_home', label: 'Home', path: '/', end: true },
  { id: 'nav_work', label: 'Work', path: '/studio' },
  { id: 'nav_store', label: 'Store', path: '/collection' },
  { id: 'nav_studio', label: 'Studio', path: '/about' },
  { id: 'nav_contact', label: 'Contact', path: '/contact' },
]

export const UTILITY_NAV = [
  { id: 'util_search', label: 'Search', path: '/collection', icon: 'search' },
  { id: 'util_wishlist', label: 'Wishlist', path: '/account', icon: 'heart' },
  { id: 'util_account', label: 'Account', path: '/account', icon: 'user' },
  { id: 'util_cart', label: 'Cart', path: '/cart', icon: 'bag' },
]

export const STORE_LINKS = [
  { id: 'store_all', label: 'All Assets', path: '/collection' },
  { id: 'store_join', label: 'How Licensing Works', path: '/collection' },
  { id: 'store_account', label: 'Your Account', path: '/account' },
  { id: 'store_cart', label: 'Cart', path: '/cart' },
]

export const STUDIO_LINKS = [
  { id: 'studio_portfolio', label: 'Selected Work', path: '/studio' },
  { id: 'studio_about', label: 'The Artist', path: '/about' },
  { id: 'studio_contact', label: 'Start a Project', path: '/contact' },
]

export const POLICY_LINKS = [
  { id: 'policy_license', label: 'Digital License', path: '/about' },
  { id: 'policy_refund', label: 'Refund Policy', path: '/about' },
  { id: 'policy_privacy', label: 'Privacy', path: '/about' },
  { id: 'policy_terms', label: 'Terms', path: '/about' },
]

export default PRIMARY_NAV
