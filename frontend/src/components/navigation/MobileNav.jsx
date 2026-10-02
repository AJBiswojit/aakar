import { useEffect } from 'react'
import { Heart, ShoppingBag, User } from 'lucide-react'
import { useApp } from '../../hooks/useApp.js'
import { useCart } from '../../hooks/useCart.js'
import { useWishlist } from '../../hooks/useWishlist.js'
import { NavLinks } from './NavLinks.jsx'
import { Button } from '../ui/Button.jsx'
import { UTILITY_NAV } from '../../routes/navigation.js'

const UTILITY_ICONS = {
  heart: Heart,
  bag: ShoppingBag,
  user: User,
}

/**
 * AAKAR — MobileNav
 *
 * The obsidian drawer for small screens: full-height, large display type, the
 * utility actions and a direct commission line. Scroll is locked by
 * AppProvider, and Escape always closes it.
 */
export function MobileNav() {
  const { isMenuOpen, closeMenu } = useApp()
  const { itemCount: cartCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  useEffect(() => {
    if (!isMenuOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen, closeMenu])

  if (!isMenuOpen) return null

  const counts = { wishlist: wishlistCount, bag: cartCount }

  return (
    <div
      className="aakar-mobilenav"
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      <nav className="aakar-mobilenav__nav aakar-container">
        <NavLinks variant="drawer" onNavigate={closeMenu} />

        <div className="aakar-mobilenav__utilities">
          {UTILITY_NAV.filter((item) => item.icon in UTILITY_ICONS).map((item) => {
            const Icon = UTILITY_ICONS[item.icon]
            const count = counts[item.icon]
            return (
              <Button key={item.id} to={item.path} variant="line" onClick={closeMenu}>
                {item.label}
                {count ? <span className="aakar-mobilenav__count"> ({count})</span> : null}
                <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
              </Button>
            )
          })}
        </div>

        <div className="aakar-mobilenav__cta">
          <p className="aakar-label aakar-mobilenav__cta-label">Commission the studio</p>
          <Button to="/contact" variant="primary" size="lg" onClick={closeMenu} full>
            Start a project
          </Button>
        </div>
      </nav>
    </div>
  )
}

export default MobileNav
