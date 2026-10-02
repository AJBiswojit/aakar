import { useEffect, useState } from 'react'

/**
 * AAKAR — useMediaQuery
 *
 * SSR-safe media query subscription. Used for responsive behaviour and for the
 * accessibility/motion preferences that gate animation and 3D.
 *
 * @param {string} query
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const list = window.matchMedia(query)
    const handleChange = (event) => setMatches(event.matches)

    setMatches(list.matches)
    list.addEventListener('change', handleChange)
    return () => list.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

export default useMediaQuery
