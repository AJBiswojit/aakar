import { useEffect } from 'react'

/**
 * AAKAR — useReveal
 *
 * Reveals every `[data-reveal]` element once it enters the viewport by adding
 * `.is-revealed`. The animation itself is CSS (styles/animations.css) so it
 * stays cheap and automatically honours prefers-reduced-motion.
 *
 * Opt in from markup:
 *   <span data-reveal="mask"><span>AAKAR</span></span>
 *   <div data-reveal="up" data-reveal-delay="120">…</div>
 *
 * Re-scans when `deps` change, so a route's content is picked up on mount.
 *
 * @param {any[]} [deps]
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]')).filter(
      (node) => !node.classList.contains('is-revealed'),
    )

    if (nodes.length === 0) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-revealed'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )

    nodes.forEach((node) => {
      const delay = node.dataset.revealDelay
      if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`)
      observer.observe(node)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useReveal
