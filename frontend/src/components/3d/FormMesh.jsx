import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { cssColor } from "@/utils/cssColor";

/**
 * THE FORM. A procedural lathe-born vessel with a carved ridge pass, used
 * until an authored .glb exists. Point `model.previewUrl` at a real asset and
 * the same component renders it instead — no section changes required.
 */
function useVesselGeometry(rings = 148) {
  return useMemo(() => {
    const profile = [
      [0.0, -1.32],
      [0.54, -1.3],
      [0.66, -1.18],
      [0.52, -0.9],
      [0.4, -0.58],
      [0.46, -0.24],
      [0.7, 0.12],
      [0.86, 0.44],
      [0.8, 0.74],
      [0.56, 0.98],
      [0.42, 1.14],
      [0.5, 1.24],
      [0.46, 1.32],
      [0.0, 1.34],
    ].map(([x, y]) => new THREE.Vector2(x, y));

    const geometry = new THREE.LatheGeometry(profile, rings, 0, Math.PI * 2);
    geometry.computeVertexNormals();

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const r = Math.hypot(x, z) || 0.0001;
      const angle = Math.atan2(z, x);
      const ridge =
        Math.sin(y * 6.2 + angle * 3) * 0.014 +
        Math.sin(y * 15.5 + 1.2) * 0.005 +
        Math.cos(angle * 8 + y * 2.1) * 0.0035;
      const scale = (r + ridge) / r;
      pos.setX(i, x * scale);
      pos.setZ(i, z * scale);
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }, [rings]);
}

export function Vessel({ tone = "dark", wireframe = true, idle = 0.055, follow = 0.22, autorotate = 0, meshMode = "surface", still = false }) {
  const asMesh = meshMode === "mesh";
  const group = useRef(null);
  const geometry = useVesselGeometry();

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || still) return;
    const t = state.clock.getElapsedTime();
    const drift = Math.sin(t * 0.16) * idle;
    const spin = g.userData.spin ?? 0;
    const targetY = drift + state.pointer.x * follow + spin;
    const targetX = -state.pointer.y * follow * 0.5;

    if (autorotate) g.userData.spin = spin + delta * autorotate;
    else if (g.userData.spin == null) g.userData.spin = 0;

    const k = Math.min(1, delta * 2.6);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.position.y = Math.sin(t * 0.5) * 0.018;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color={tone === "light" ? cssColor("--color-model-surface-light") : cssColor("--color-model-surface-dark")}
          metalness={tone === "light" ? 0.26 : 0.72}
          roughness={tone === "light" ? 0.5 : 0.28}
          clearcoat={0.7}
          clearcoatRoughness={0.26}
          sheen={0.28}
          sheenColor={new THREE.Color(cssColor("--color-cobalt"))}
          envMapIntensity={tone === "light" ? 0.55 : 1.15}
          transparent={asMesh}
          opacity={asMesh ? 0.16 : 1}
        />
      </mesh>

      {wireframe ? (
        <mesh geometry={geometry} scale={[1.014, 1.005, 1.014]}>
          <meshBasicMaterial
            color={asMesh ? cssColor("--color-model-wire") : cssColor("--color-cobalt-light")}
            wireframe
            transparent
            opacity={asMesh ? 0.55 : tone === "light" ? 0.09 : 0.13}
          />
        </mesh>
      ) : null}

      {/* cobalt measurement ring — the one deliberately technical detail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.44, 0]}>
        <torusGeometry args={[0.95, 0.0035, 6, 128]} />
        <meshBasicMaterial color={cssColor("--color-cobalt")} toneMapped={false} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

/** Clone the full scene so multi-mesh assets retain their authored materials. */
function LoadedModel({ url, scale = 1 }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => scene?.clone(true), [scene]);
  if (!model) return null;
  return <primitive object={model} scale={scale} />;
}

export function FormMesh({ modelUrl, scale = 1, ...rest }) {
  if (modelUrl) {
    return (
      <Suspense fallback={null}>
        <LoadedModel url={modelUrl} scale={scale} />
      </Suspense>
    );
  }
  return (
    <group scale={scale}>
      <Vessel {...rest} />
    </group>
  );
}

export default FormMesh;
