"use client";

import { useFrame } from "@react-three/fiber";
import { sceneState } from "@/lib/gsap";

/**
 * Camera: breathes with the pointer, drifts back as the hero leaves the frame.
 * Deliberately small numbers — the object should feel alive, never animated.
 */
export function CameraRig({ parallax = 0.5, retreat = 0.9, baseZ = 6.4, lookAt = [0, 0, 0] }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const progress = sceneState.heroProgress;

    const tx = pointer.x * parallax;
    const ty = 0.35 - pointer.y * parallax * 0.6 + progress * 0.5;
    const tz = baseZ + progress * retreat;

    const damp = Math.min(1, delta * 2.1);
    camera.position.x += (tx - camera.position.x) * damp;
    camera.position.y += (ty - camera.position.y) * damp;
    camera.position.z += (tz - camera.position.z) * damp;
    camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
  });

  return null;
}

export default CameraRig;
