import { ContactShadows, OrbitControls } from "@react-three/drei";
import { GalleryFloor } from "./Gallery";
import { FormMesh } from "./FormMesh";
import { Lighting } from "./Lighting";
import { FitGroup } from "./framing";
import { clamp } from "@/utils/format";
import { cssColor } from "@/utils/cssColor";

/** Museum room floor line. Chosen so the whole form — including its near-side
 *  base corners — stays inside the axis-aligned Scene camera frustum
 *  ([0, 0.35, 6.4], fov 32) while remaining clearly visible in frame. */
export const SHOWCASE_FLOOR_Y = -1.15;

/**
 * Museum object: orbit + zoom only. No auto-rotation, no pan — the visitor
 * examines it, the scene never performs on its own.
 */
export function ShowcaseScene({ modelUrl, compact: _compact = false, meshMode = "surface", zoom = 1, reduced = false }) {
  return (
    <>
      <Lighting intensity={1.08} rim={1.9} />
      <group position={[0, 0, 0]}>
        {/* aspect-aware fit: portrait viewports scale the form down instead of
            clipping its sides. The visitor zoom modulates how much of the safe
            envelope the form fills (never past 1.0, so it can never clip). */}
        <FitGroup floorY={SHOWCASE_FLOOR_Y} utilization={clamp(0.84 * zoom, 0.3, 1)} revision={zoom}>
          <FormMesh
            modelUrl={modelUrl}
            tone="dark"
            idle={reduced ? 0 : 0.03}
            follow={reduced ? 0 : 0.12}
            still={reduced}
            meshMode={meshMode}
          />
        </FitGroup>
        <GalleryFloor y={SHOWCASE_FLOOR_Y} size={40} />
        <ContactShadows
          position={[0, SHOWCASE_FLOOR_Y + 0.02, 0]}
          frames={1}
          opacity={0.7}
          scale={12}
          blur={2.6}
          far={5}
          resolution={512}
          color={cssColor("--color-ink")}
        />
      </group>
      {/*
        Wheel zoom is intentionally off: the page must stay scrollable while the
        cursor is over the object. Zoom is offered as explicit, keyboard-reachable
        steps in the section UI instead.
      */}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.72}
        rotateSpeed={0.55}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

export default ShowcaseScene;
