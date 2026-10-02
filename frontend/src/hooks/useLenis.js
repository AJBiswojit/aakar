import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMediaQuery } from './useMediaQuery.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * AAKAR — useLenis
 *
 * Smooth, cinematic scrolling driven by Lenis and synchronised with GSAP's
 * ticker, so scroll-triggered animation and smooth scroll can never drift out
 * of step. Disabled entirely for users who prefer reduced motion.
 *
 * Mounted once, in App.
 */

let activeLenis = null

/**
 * Lock or release page scrolling for overlays (mobile drawer, search panel).
 * Uses Lenis' own stop/start when smooth scrolling is active, so the lock and
 * the smooth scroller cannot disagree about who owns the scroll position.
 */
export function setScrollLocked(locked) {
  if (activeLenis) {
    if (locked) activeLenis.stop()
    else activeLenis.start()
  }
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
  }
}

/** Programmatic scrolling (anchor links, section jumps, nav). */
export function scrollTo(target, options = {}) {
  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: 0, duration: 1.1, ...options })
    return
  }
  if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function useLenis() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (prefersReducedMotion) {
      activeLenis = null
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.09,
      wheelMultiplier: 0.9,
      smoothWheel: true,
      syncTouch: false,
    })

    activeLenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      activeLenis = null
    }
  }, [prefersReducedMotion])

  return activeLenis
}

export default useLenis
