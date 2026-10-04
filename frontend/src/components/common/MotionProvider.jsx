import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger, gsap } from "@/utils/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMotion";

const MotionContext = createContext({
  scrollTo: () => {},
  reduced: false,
  stopScroll: () => {},
  startScroll: () => {},
});

export const useMotion = () => useContext(MotionContext);

/**
 * One place that owns scroll technology:
 *  - Lenis smooth scroll (skipped for reduced-motion users)
 *  - ScrollTrigger refresh wiring
 *  - the global reveal observer used by [data-reveal] / [data-reveal-line]
 *    / [data-mask] / [data-cobalt-rule] attributes
 */
export function MotionProvider({ children }) {
  const lenisRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false,
    });
    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => ScrollTrigger.refresh(), 450);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reduced]);

  const scrollTo = useMemo(
    () => (target, opts = {}) => {
      if (typeof target === "number") {
        if (lenisRef.current && !reduced) lenisRef.current.scrollTo(target, { duration: 1.35, ...opts });
        else window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
        return;
      }

      const element = typeof target === "string" ? document.querySelector(target) : target;
      if (!element) return;
      if (lenisRef.current && !reduced) {
        lenisRef.current.scrollTo(element, { offset: -72, duration: 1.35, ...opts });
      } else {
        element.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }
    },
    [reduced],
  );

  /* ---- global reveal observer (also picks up lazily mounted sections) ---- */
  useEffect(() => {
    const SELECTOR = "[data-reveal],[data-reveal-line],[data-mask],[data-cobalt-rule]";

    if (reduced || typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.hasAttribute("data-reveal-line")) el.setAttribute("data-reveal-line", "in");
        else if (el.hasAttribute("data-mask")) el.setAttribute("data-mask", "in");
        else if (el.hasAttribute("data-cobalt-rule")) el.setAttribute("data-cobalt-rule", "in");
        else el.setAttribute("data-reveal", "in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          if (el.hasAttribute("data-reveal-line")) el.setAttribute("data-reveal-line", "in");
          else if (el.hasAttribute("data-mask")) el.setAttribute("data-mask", "in");
          else if (el.hasAttribute("data-cobalt-rule")) el.setAttribute("data-cobalt-rule", "in");
          else el.setAttribute("data-reveal", "in");
          observer.unobserve(el);
        }
      },
      { rootMargin: "160px 0px", threshold: 0.01 },
    );

    const isRevealed = (el) =>
      el.getAttribute("data-reveal") === "in" ||
      el.getAttribute("data-reveal-line") === "in" ||
      el.getAttribute("data-mask") === "in" ||
      el.getAttribute("data-cobalt-rule") === "in";

    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.dataset.aakarObserved === "1" || isRevealed(el)) return;
        el.dataset.aakarObserved = "1";
        observer.observe(el);
      });
    };

    scan();
    let queued = 0;
    const mutation = new MutationObserver(() => {
      if (queued) return;
      queued = requestAnimationFrame(() => {
        queued = 0;
        scan();
      });
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutation.disconnect();
      observer.disconnect();
    };
  }, [reduced]);

  /* refs are read inside callbacks only — never during render */
  const value = useMemo(
    () => ({
      scrollTo,
      reduced,
      stopScroll: () => lenisRef.current?.stop(),
      startScroll: () => lenisRef.current?.start(),
    }),
    [scrollTo, reduced],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
