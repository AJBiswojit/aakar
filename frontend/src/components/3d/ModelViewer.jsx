import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { cx } from "@/utils/format";
import { useIsCompact, usePrefersReducedMotion, useWebGLAvailable } from "@/hooks/useMotion";

const Scene = lazy(() => import("./Scene").then((module) => ({ default: module.Scene })));
const HeroScene = lazy(() => import("./HeroScene").then((module) => ({ default: module.HeroScene })));
const ShowcaseScene = lazy(() => import("./ShowcaseScene").then((module) => ({ default: module.ShowcaseScene })));

function useInViewOnce(rootMargin = "400px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || seen || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, seen]);

  return [ref, seen];
}

/** Paints the static artwork first; WebGL mounts only when supported and needed. */
export function ModelViewer({
  mode = "showcase",
  image,
  alt = "",
  modelUrl = "",
  className,
  imgClassName,
  priority = false,
  children,
  sceneProps = {},
  imageFadeClass = "opacity-[0.55]",
  onStatus,
}) {
  const webgl = useWebGLAvailable();
  const compact = useIsCompact();
  const reduced = usePrefersReducedMotion();
  const [hostRef, seen] = useInViewOnce(mode === "hero" ? "0px" : "500px");
  const [status, setStatus] = useState("idle");

  const allowCanvas = webgl === true && (mode === "showcase" || (!compact && !reduced));
  const mountCanvas = allowCanvas && (seen || mode === "hero");
  const SceneContent = mode === "hero" ? HeroScene : ShowcaseScene;

  useEffect(() => {
    onStatus?.(allowCanvas ? status : "fallback");
  }, [status, allowCanvas, onStatus]);

  return (
    <div ref={hostRef} className={cx("relative overflow-hidden", className)} data-status={status} data-mode={mode}>
      {image ? (
        <img
          src={image}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={cx(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out",
            status === "ready" ? imageFadeClass : "opacity-100",
            imgClassName,
          )}
        />
      ) : null}

      {image ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-obsidian/25" /> : null}

      {mountCanvas ? (
        <Suspense fallback={null}>
          <Scene
            onReady={() => setStatus("ready")}
            onError={() => setStatus("fallback")}
            dpr={mode === "hero" ? [1, compact ? 1.4 : 1.8] : [1, compact ? 1.25 : 1.7]}
            className={cx("transition-opacity duration-[1100ms]", status === "ready" ? "opacity-100" : "opacity-0")}
            fallback={null}
          >
            <SceneContent modelUrl={modelUrl || undefined} compact={compact} reduced={reduced} {...sceneProps} />
          </Scene>
        </Suspense>
      ) : null}

      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-cobalt transition-opacity duration-500",
          status === "loading" || (allowCanvas && status === "idle") ? "scale-x-100 opacity-90" : "scale-x-0 opacity-0",
        )}
        style={status !== "ready" && allowCanvas ? { animation: "aakar-load 2.4s var(--ease-out-soft) infinite" } : undefined}
      />
      {children}
    </div>
  );
}

export default ModelViewer;
