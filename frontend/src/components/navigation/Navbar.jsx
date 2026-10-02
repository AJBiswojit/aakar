import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useApp } from '../../hooks/useApp.js'
import { useCart } from '../../hooks/useCart.js'
import { useWishlist } from '../../hooks/useWishlist.js'
import { useNavTheme } from '../../hooks/useNavTheme.js'
import { NavLinks } from './NavLinks.jsx'
import { MobileNav } from './MobileNav.jsx'
import { SearchPanel } from './SearchPanel.jsx'
import { cn } from '../../utils/cn.js'
import './Navbar.css'

/**
 * AAKAR — Navbar
 *
 * Two states, one bar: transparent white type over the obsidian hero, and a
 * light surface with dark type over the information sections. The state is
 * derived from whatever section sits beneath the bar (useNavTheme), so the
 * navbar never needs to know the current route.
 *
 * Utility actions are deliberately quiet — labels on wide screens, icon and
 * count on narrow ones. This must not read as a store toolbar.
 */
export function Navbar() {
  const { isMenuOpen, toggleMenu, isSearchOpen, toggleSearch, closeMenu } = useApp()
  const { itemCount: cartCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const overHero = useNavTheme() === 'dark'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const theme = overHero ? 'dark' : 'light'

  return (
    <>
      <a className="aakar-skip-link" href="#main">
        Skip to content
      </a>

      <header
        className={cn(
          'aakar-nav',
          `aakar-nav--${theme}`,
          isScrolled && 'is-scrolled',
          isMenuOpen && 'is-open',
        )}
        data-nav-bar
      >
        <div className="aakar-nav__inner aakar-container">
          <Link className="aakar-nav__brand" to="/" onClick={closeMenu} aria-label="AAKAR — home">
            <span className="aakar-nav__mark" aria-hidden="true" />
            <span className="aakar-nav__wordmark">Aakar</span>
            <span className="aakar-nav__descriptor aakar-label">Digital Atelier</span>
          </Link>

          <nav className="aakar-nav__primary" aria-label="Primary">
            <NavLinks />
          </nav>

          <div className="aakar-nav__utilities">
            <button
              type="button"
              className="aakar-nav__action"
              onClick={toggleSearch}
              aria-expanded={isSearchOpen}
              aria-label="Open search"
            >
              <Search size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="aakar-nav__action-label">Search</span>
            </button>

            <Link className="aakar-nav__action" to="/account" aria-label={`Wishlist, ${wishlistCount} saved`}>
              <Heart size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="aakar-nav__action-label">Wishlist</span>
              {wishlistCount > 0 ? (
                <span className="aakar-nav__count" aria-hidden="true">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>

            <Link className="aakar-nav__action" to="/cart" aria-label={`Cart, ${cartCount} items`}>
              <ShoppingBag size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="aakar-nav__action-label">Cart</span>
              {cartCount > 0 ? (
                <span className="aakar-nav__count" aria-hidden="true">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              className="aakar-nav__action aakar-nav__toggle"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav />
      <SearchPanel />
    </>
  )
}

export default Navbar
