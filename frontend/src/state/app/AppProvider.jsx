import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import { useDeviceCapability } from '../../hooks/useDeviceCapability.js'
import { setScrollLocked } from '../../hooks/useLenis.js'

/**
 * AAKAR — AppProvider
 *
 * Owns shell-level state only:
 *   · mobile navigation drawer + search panel open/closed
 *   · device & motion capability (drives 3D richness and animation)
 *
 * Anything domain-specific belongs in a service, not here.
 */
export function AppProvider({ children }) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isSearchOpen, setSearchOpen] = useState(false)
  const capability = useDeviceCapability()
  const location = useLocation()

  // A route change always closes transient chrome.
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Lock the page while an overlay is open — through Lenis, so the smooth
  // scroller and the lock never fight over the scroll position.
  useEffect(() => {
    setScrollLocked(isMenuOpen || isSearchOpen)
    return () => setScrollLocked(false)
  }, [isMenuOpen, isSearchOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const toggleSearch = useCallback(() => setSearchOpen((open) => !open), [])

  const value = useMemo(
    () => ({
      isMenuOpen,
      setMenuOpen,
      toggleMenu,
      closeMenu,
      isSearchOpen,
      setSearchOpen,
      toggleSearch,
      closeSearch,
      ...capability,
    }),
    [isMenuOpen, isSearchOpen, toggleMenu, closeMenu, toggleSearch, closeSearch, capability],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
