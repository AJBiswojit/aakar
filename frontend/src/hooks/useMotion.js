import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsCompact = () => useMediaQuery("(max-width: 1023px)");
export const useIsFinePointer = () => useMediaQuery("(pointer: fine)");

export function useWebGLAvailable() {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
        setAvailable(Boolean(context));
        context?.getExtension("WEBGL_lose_context")?.loseContext?.();
      } catch {
        setAvailable(false);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return available;
}
