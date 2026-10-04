"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query) {
  /* subscription-based so the value is correct on the very first client render */
  const subscribe = useCallback(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => (typeof window === "undefined" ? false : window.matchMedia(query).matches),
    () => false,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsCompact = () => useMediaQuery("(max-width: 1023px)");
export const useIsFinePointer = () => useMediaQuery("(pointer: fine)");

/** WebGL capability probe — the hero falls back to a still render if absent. */
export function useWebGLAvailable() {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    /* probed after paint: null on the server + first client paint keeps markup identical */
    const id = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        setAvailable(Boolean(gl));
        canvas.getContext("webgl")?.getExtension("WEBGL_lose_context")?.loseContext?.();
      } catch {
        setAvailable(false);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return available;
}


