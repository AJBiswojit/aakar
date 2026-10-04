"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { cx } from "@/lib/format";
import { useIsCompact, usePrefersReducedMotion, useWebGLAvailable } from "@/hooks/useMotion";

/* three.js stays entirely out of the server render and arrives on demand */
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), { ssr: false });
const HeroScene = dynamic(() => import("./HeroScene").then((m) => m.HeroScene), { ssr: false });
const ShowcaseScene = dynamic(() => import("./ShowcaseScene").then((m) => m.ShowcaseScene), { ssr: false });

function useInViewOnce(rootMargin = "400px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, seen]);

  return [ref, seen];
}

/**
 * The single entry point sections use for anything dimensional.
 * It always paints the still render first, so the page is never empty and
 * never broken — the WebGL layer only arrives when it is supported, in view
 * and ready.
 */
export function ModelViewer({
  mode = "showcase",
  image,
  alt = "",
  modelUrl = "",
  className,
  imgClassName,
  priority = false,
  children,
  sizes = "100vw",
  sceneProps = {},
  imageFadeClass = "opacity-[0.55]",
  onStatus,
}) {
  const webgl = useWebGLAvailable();
  const compact = useIsCompact();
  const reduced = usePrefersReducedMotion();
  const [hostRef, seen] = useInViewOnce(mode === "hero" ? "0px" : "500px");
  const [status, setStatus] = useState("idle");

  /* hero: skip WebGL entirely for compact screens and reduced-motion visitors
     showcase: keep it interactive, but freeze ambient motion */
  const allowCanvas = webgl === true && (mode === "showcase" ? true : !compact && !reduced);
  const mountCanvas = allowCanvas && (seen || mode === "hero");

  useEffect(() => {
    if (!allowCanvas) onStatus?.("fallback");
    else onStatus?.(status);
  }, [status, allowCanvas, onStatus]);

  const SceneContent = mode === "hero" ? HeroScene : ShowcaseScene;

  return (
    <div
      ref={hostRef}
      className={cx("relative overflow-hidden", className)}
      data-status={status}
      data-mode={mode}
    >
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cx(
            "object-cover transition-opacity duration-1000 ease-out",
            status === "ready" ? imageFadeClass : "opacity-100",
            imgClassName,
          )}
        />
      ) : null}

      {image ? <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-obsidian/25" /> : null}

      {mountCanvas ? (
        <Scene
          onReady={() => setStatus("ready")}
          onError={() => setStatus("fallback")}
          dpr={mode === "hero" ? [1, compact ? 1.4 : 1.8] : [1, compact ? 1.25 : 1.7]}
          className={cx("transition-opacity duration-[1100ms]", status === "ready" ? "opacity-100" : "opacity-0")}
          fallback={null}
        >
          <SceneContent modelUrl={modelUrl || undefined} compact={compact} reduced={reduced} {...sceneProps} />
        </Scene>
      ) : null}

      {/* thin cobalt loading rail */}
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
