"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsFinePointer, usePrefersReducedMotion } from "@/hooks/useMotion";

/**
 * AAKAR cursor. Two parts: an exact 4px dot and a slow-following ring that
 * carries a label when hovering anything marked with [data-cursor="LABEL"].
 * Disabled for touch pointers and reduced motion.
 */
export function Cursor() {
  const fine = useIsFinePointer();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!fine || reduced) return;
    document.body.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    let hovering = false;

    const onMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      const el = e.target?.closest?.("[data-cursor]");
      const label = el?.getAttribute("data-cursor") ?? "";
      if (label !== (labelRef.current?.textContent ?? "")) {
        if (labelRef.current) labelRef.current.textContent = label;
        hovering = Boolean(label);
        gsap.to(ring, {
          scale: hovering ? 1 : 0.42,
          opacity: hovering ? 1 : 0.55,
          duration: 0.45,
          ease: "power3.out",
        });
        gsap.to(labelRef.current, { opacity: hovering ? 1 : 0, duration: 0.25 });
      }
    };

    const onDown = () => gsap.to(ring, { scale: hovering ? 0.86 : 0.3, duration: 0.25 });
    const onUp = () => gsap.to(ring, { scale: hovering ? 1 : 0.42, duration: 0.35 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <div ref={ringRef} className="cursor-bubble flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-cobalt-light/45" />
        <span
          ref={labelRef}
          className="u-label-sm text-center uppercase leading-[1.15] text-white opacity-0"
          style={{ mixBlendMode: "difference" }}
        />
      </div>
      <span ref={dotRef} className="cursor-dot h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-cobalt-light opacity-80" />
    </div>
  );
}

export default Cursor;
