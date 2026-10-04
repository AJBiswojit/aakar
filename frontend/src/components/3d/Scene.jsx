import { Component, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { cx } from "@/utils/format";

/**
 * Scene = the only place a WebGL context is created in the homepage.
 *  - reports context creation (`onContext`) separately from presentation
 *  - reports `onPresent` only once the suspended 3D content has actually
 *    mounted AND rendered a couple of frames — never on context creation
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

/**
 * Mounts inside the same <Suspense> as the scene content, so it commits only
 * after every suspending loader (useGLTF, Environment, …) has resolved. It then
 * waits a couple of rendered frames before declaring the scene "presenting".
 */
function PresentSignal({ onPresent, frames = 2 }) {
  const rendered = useRef(0);
  const done = useRef(false);

  useFrame(() => {
    if (done.current) return;
    rendered.current += 1;
    if (rendered.current >= frames) {
      done.current = true;
      onPresent?.();
    }
  });

  return null;
}

export function Scene({
  fallback,
  className,
  children,
  camera = { position: [0, 0.35, 6.4], fov: 32, near: 0.1, far: 40 },
  dpr = [1, 1.8],
  onContext,
  onPresent,
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
          onCreated={() => onContext?.()}
          {...rest}
        >
          <SceneBoundary fallback={null} onError={handleError}>
            <Suspense fallback={null}>
              {children}
              <PresentSignal onPresent={onPresent} />
            </Suspense>
          </SceneBoundary>
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

export default Scene;
