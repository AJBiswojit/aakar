"use client";

import { Environment, Lightformer } from "@react-three/drei";

/**
 * AAKAR lighting — one dark studio, one key softbox, cobalt rim.
 * Environment is built from lightformers (no external HDR files).
 */
export function Lighting({ intensity = 1, rim = 1.6, withEnvironment = true }) {
  return (
    <>
      <ambientLight intensity={0.16 * intensity} color="#c9d4ff" />
      <directionalLight position={[3.4, 5.2, 3.2]} intensity={1.55 * intensity} color="#ffffff" />
      <directionalLight position={[-5, 1.4, -3.4]} intensity={rim} color="#1746D8" />
      <spotLight
        position={[0.5, 6.5, -6]}
        angle={0.75}
        penumbra={1}
        intensity={0.9 * intensity}
        color="#4D6FFF"
      />
      <pointLight position={[2.4, -1.8, 2.2]} intensity={0.22} color="#ffffff" distance={9} />

      {withEnvironment ? (
        <Environment resolution={128} frames={1} background={false}>
          <Lightformer form="rect" intensity={2.2} position={[0, 4, -5]} scale={[9, 5, 1]} color="#dfe6f5" />
          <Lightformer form="rect" intensity={1.1} position={[-5, 1.5, 1]} rotation-y={Math.PI / 2} scale={[7, 3, 1]} color="#8fa5ff" />
          <Lightformer form="rect" intensity={0.75} position={[5, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[6, 2.4, 1]} color="#ffffff" />
          <Lightformer form="ring" intensity={1.4} position={[0, -3, 2]} scale={[5, 5, 1]} color="#0F2FA8" />
        </Environment>
      ) : null}
    </>
  );
}

export default Lighting;
