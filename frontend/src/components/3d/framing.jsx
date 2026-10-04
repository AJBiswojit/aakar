import { useCallback, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

/**
 * AAKAR 3D framing — deliberate, exact, aspect- and tilt-aware fit-to-view.
 *
 * `solveFitScale` binary-searches the largest uniform scale at which the
 * content's bounding box — seated with its floor exactly on `floorY` — lies
 * completely inside the *live* camera frustum (so camera tilt, FOV, distance
 * and viewport aspect are all honoured; portrait viewports shrink the form
 * instead of clipping its sides). `utilization` lets a deliberate control
 * (the showcase zoom) use less of the safe envelope; it can never exceed it.
 */
/** Exact containment: every box corner must sit inside all six frustum planes.
 *  (three's Frustum ships intersectsBox/containsPoint only — a box can
 *  intersect the frustum while still being clipped, so corners are tested.) */
export function frustumContainsBox(frustum, box) {
  const corners = [
    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z),
  ];
  for (const plane of frustum.planes) {
    for (const corner of corners) {
      if (plane.distanceToPoint(corner) < -1e-6) return false;
    }
  }
  return true;
}

export function solveFitScale({
  localBox,
  parentMatrix,
  camera,
  floorY,
  utilization = 1,
  minScale = 0.2,
  maxScale = 2.4,
  margin = 0.985,
  iterations = 22,
}) {
  camera.updateMatrixWorld();
  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse),
  );

  /* world y-shift produced by one unit of local y (parent may be rotated) */
  const yFactor = parentMatrix.elements[5] || 1;
  const identityQuat = new THREE.Quaternion();
  const origin = new THREE.Vector3(0, 0, 0);

  const boxAt = (scale) => {
    const matrix = new THREE.Matrix4().compose(origin, identityQuat, new THREE.Vector3(scale, scale, scale));
    matrix.premultiply(parentMatrix);
    const world = localBox.clone().applyMatrix4(matrix);
    const shift = floorY - world.min.y;
    world.translate(new THREE.Vector3(0, shift, 0));
    return world;
  };

  let lo = minScale;
  let hi = maxScale;
  if (!frustumContainsBox(frustum, boxAt(lo))) {
    lo = minScale;
  } else {
    for (let i = 0; i < iterations; i += 1) {
      const mid = (lo + hi) / 2;
      if (frustumContainsBox(frustum, boxAt(mid))) lo = mid;
      else hi = mid;
    }
  }

  const scale = lo * margin * utilization;
  const seated = boxAt(scale);
  /* local y offset that seats the world floor on floorY for the final scale */
  const matrix = new THREE.Matrix4().compose(origin, identityQuat, new THREE.Vector3(scale, scale, scale));
  matrix.premultiply(parentMatrix);
  const unseated = localBox.clone().applyMatrix4(matrix);
  const offsetY = (seated.min.y - unseated.min.y) / yFactor;

  return { scale, offsetY, worldBox: seated };
}

/**
 * Wraps scene content, measures it once per (mount | viewport | revision) and
 * applies the solved scale plus the vertical offset that seats its
 * bounding-box floor exactly on `floorY` (world space).
 */
export function FitGroup({
  children,
  floorY,
  cameraY: _cameraY = 0.35,
  utilization = 1,
  minScale = 0.2,
  maxScale = 2.4,
  revision = 0,
}) {
  const ref = useRef(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const apply = useCallback(() => {
    const group = ref.current;
    if (!group) return;

    /* measure at scale 1 / offset 0, then express it in parent space */
    group.scale.setScalar(1);
    group.position.y = 0;
    group.updateMatrixWorld(true);
    const parentMatrix = (group.parent ? group.parent.matrixWorld : new THREE.Matrix4()).clone();
    const localBox = new THREE.Box3().setFromObject(group).applyMatrix4(parentMatrix.clone().invert());
    if (!isFinite(localBox.min.y) || localBox.isEmpty()) return;

    const { scale, offsetY } = solveFitScale({
      localBox,
      parentMatrix,
      camera,
      floorY,
      utilization,
      minScale,
      maxScale,
    });

    group.scale.setScalar(scale);
    group.position.y = offsetY;
    group.updateMatrixWorld(true);
  }, [camera, floorY, utilization, minScale, maxScale]);

  /* re-fit on mount, on viewport resize and when the caller bumps revision */
  useLayoutEffect(() => {
    apply();
  }, [apply, size.width, size.height, revision]);

  return <group ref={ref}>{children}</group>;
}

export default FitGroup;
