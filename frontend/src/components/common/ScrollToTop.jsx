import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo } from '../../hooks/useLenis.js'

/**
 * AAKAR — ScrollToTop
 *
 * A route change must present the new page from the top, without the smooth
 * scroll that an in-page anchor would use.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    scrollTo(0, { immediate: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export default ScrollToTop
