"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/**
 * Scroll state shared with the WebGL scenes without re-rendering React.
 * GSAP writes here; three.js reads it inside its own rAF loop.
 */
export const sceneState = {
  heroProgress: 0,
  pointer: { x: 0, y: 0 },
  heroVisible: true,
};

export function bindHeroScroll(trigger, { onProgress } = {}) {
  if (typeof window === "undefined") return () => {};
  const tween = gsap.to(sceneState, {
    heroProgress: 1,
    ease: "none",
    onUpdate: () => onProgress?.(sceneState.heroProgress),
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
  return () => tween.scrollTrigger?.kill() || tween.kill();
}
