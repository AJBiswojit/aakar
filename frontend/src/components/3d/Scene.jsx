import { Component, Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { cx } from "@/utils/format";

/**
 * Scene = the only place a WebGL context is created in the homepage.
 *  - reports readiness so the hero loader can dismiss
 *  - pauses its frameloop when scrolled out of view
 *  - any context failure renders `fallback` instead of a broken canvas
 */
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export function Scene({
  fallback,
  className,
  children,
  camera = { position: [0, 0.35, 6.4], fov: 32, near: 0.1, far: 40 },
  dpr = [1, 1.8],
  onReady,
  onError,
  ...rest
}) {
  const hostRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (failed) return <div className={cx("absolute inset-0", className)}>{fallback}</div>;

  const handleError = () => {
    setFailed(true);
    onError?.();
  };

  return (
    <div ref={hostRef} className={cx("absolute inset-0", className)} aria-hidden="true">
      <SceneBoundary fallback={fallback} onError={handleError}>
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
          camera={camera}
          onCreated={() => onReady?.()}
          {...rest}
        >
          <SceneBoundary fallback={null} onError={handleError}>
            <Suspense fallback={null}>{children}</Suspense>
          </SceneBoundary>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

export default Scene;
