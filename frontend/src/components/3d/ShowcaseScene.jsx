import { ContactShadows, OrbitControls } from "@react-three/drei";
import { GalleryFloor } from "./Gallery";
import { FormMesh } from "./FormMesh";
import { Lighting } from "./Lighting";
import { cssColor } from "@/utils/cssColor";

/**
 * Museum object: orbit + zoom only. No auto-rotation, no pan — the visitor
 * examines it, the scene never performs on its own.
 */
export function ShowcaseScene({ modelUrl, compact = false, meshMode = "surface", zoom = 1, reduced = false }) {
  return (
    <>
      <Lighting intensity={1.08} rim={1.9} />
      <group position={[0, 0, 0]}>
        <FormMesh
          modelUrl={modelUrl}
          tone="dark"
          scale={(compact ? 1.15 : 1.62) * zoom}
          idle={reduced ? 0 : 0.03}
          follow={reduced ? 0 : 0.12}
          still={reduced}
          meshMode={meshMode}
        />
        <GalleryFloor y={-2.32} size={40} />
        <ContactShadows position={[0, -2.3, 0]} opacity={0.7} scale={12} blur={2.6} far={5} resolution={512} color={cssColor("--color-ink")} />
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
