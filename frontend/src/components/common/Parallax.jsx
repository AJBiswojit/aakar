import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useApp } from '../../hooks/useApp.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * AAKAR — Parallax
 *
 * Slow scroll-linked displacement. Used sparingly — one or two layers per
 * section — so imagery gains depth without ever feeling animated for its own
 * sake. Switched off entirely under prefers-reduced-motion.
 *
 * @param {Object} props
 * @param {number} [props.speed] fraction of viewport height travelled, e.g. 0.08
 * @param {string} [props.className]
 */
export function Parallax({ speed = 0.08, className, children }) {
  const elementRef = useRef(null)
  const { prefersReducedMotion } = useApp()

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const element = elementRef.current
    if (!element) return undefined

    const trigger = element.parentElement || element
    const shift = Math.max(speed, 0) * 100

    const tween = gsap.fromTo(
      element,
      { yPercent: shift },
      {
        yPercent: -shift,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    )

    const refresh = window.requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.cancelAnimationFrame(refresh)
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed, prefersReducedMotion])

  return (
    <div className={className} ref={elementRef}>
      {children}
    </div>
  )
}

export default Parallax
