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

/* WebGL capability is probed AT MOST ONCE per page lifecycle and shared by
   every viewer — creating/losing a context per mount wastes GPU resources and
   can trip browser context limits. */
let webglSupport = null;
let webglProbe = null;

function probeWebGL() {
  if (webglSupport !== null) return Promise.resolve(webglSupport);
  if (webglProbe) return webglProbe;

  webglProbe = new Promise((resolve) => {
    const run = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
        webglSupport = Boolean(context);
        context?.getExtension("WEBGL_lose_context")?.loseContext?.();
      } catch {
        webglSupport = false;
      }
      resolve(webglSupport);
    };

    if (typeof requestAnimationFrame === "undefined") run();
    else requestAnimationFrame(run);
  });

  return webglProbe;
}

export function useWebGLAvailable() {
  const [available, setAvailable] = useState(webglSupport);

  useEffect(() => {
    if (webglSupport !== null) {
      setAvailable(webglSupport);
      return undefined;
    }
    let active = true;
    probeWebGL().then((supported) => {
      if (active) setAvailable(supported);
    });
    return () => {
      active = false;
    };
  }, []);

  return available;
}
