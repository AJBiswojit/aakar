import { useEffect, useState } from 'react'

/**
 * AAKAR — useNavTheme
 *
 * Reports which surface the navigation is currently floating over, by reading
 * `data-nav-theme` from the section occupying the top of the viewport.
 *
 *   <section data-theme="dark" data-nav-theme="dark">   → nav renders light on dark
 *   <section data-theme="light" data-nav-theme="light"> → nav renders dark on light
 *
 * This keeps the navbar decoupled: it never has to know which route or section
 * is on screen, only what it is sitting on top of.
 *
 * @param {number} [probeOffset] vertical sample point, defaults to under the nav
 * @returns {'light'|'dark'}
 */
export function useNavTheme(probeOffset = 36) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const sections = document.querySelectorAll('[data-nav-theme]')
      if (sections.length === 0) {
        setTheme('light')
        return
      }

      let resolved = 'light'
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= probeOffset && rect.bottom > probeOffset) {
          resolved = section.dataset.navTheme === 'dark' ? 'dark' : 'light'
        }
      })
      setTheme(resolved)
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [probeOffset])

  return theme
}

export default useNavTheme
