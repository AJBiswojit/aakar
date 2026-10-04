import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { GalleryFloor } from "./Gallery";
import { FormMesh } from "./FormMesh";
import { Lighting } from "./Lighting";
import { CameraRig } from "./CameraRig";
import { sceneState } from "@/utils/gsap";
import { cssColor } from "@/utils/cssColor";

/** Hero group: scales down and sinks slightly as the section leaves the frame. */
function HeroExit({ children, intensity = 1 }) {
  const ref = useRef(null);
  const target = useRef(new THREE.Vector3(1, 1, 1));

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const p = sceneState.heroProgress;
    const s = 1 - p * 0.2 * intensity;
    target.current.set(s, s, s);
    g.scale.lerp(target.current, Math.min(1, delta * 4));
    g.position.y = -p * 0.85 * intensity;
    g.rotation.z = p * 0.06 * intensity;
  });

  return <group ref={ref}>{children}</group>;
}

export function HeroScene({ modelUrl, compact = false, reduced = false }) {
  return (
    <>
      <Lighting intensity={compact ? 0.9 : 1} rim={compact ? 1.3 : 1.75} />
      <CameraRig parallax={reduced ? 0 : compact ? 0.18 : 0.42} retreat={1.15} baseZ={compact ? 7.6 : 6.5} />
      <HeroExit intensity={compact ? 0.6 : reduced ? 0 : 1}>
        <group position={[0, compact ? 0.15 : 0.05, 0]} rotation={[0, -0.45, 0]}>
          <FormMesh
            modelUrl={modelUrl}
            tone="dark"
            scale={compact ? 1.05 : 1.5}
            idle={reduced ? 0 : 0.05}
            follow={reduced ? 0 : 0.2}
            still={reduced}
          />
          <GalleryFloor y={-1.94} />
          <ContactShadows position={[0, -1.93, 0]} opacity={0.62} scale={11} blur={2.8} far={4.2} resolution={512} color={cssColor("--color-ink")} />
        </group>
      </HeroExit>
    </>
  );
}

export default HeroScene;
