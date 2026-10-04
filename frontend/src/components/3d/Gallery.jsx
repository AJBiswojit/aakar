"use client";

/**
 * The gallery itself: a barely-there reflective floor and a horizon hairline.
 * This is what makes an object feel "exhibited" instead of floating in a void.
 */
export function GalleryFloor({ y = -1.98, size = 42, tone = "dark", showHorizon = true }) {
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position-y={y}>
        <planeGeometry args={[size, size, 1, 1]} />
        <meshStandardMaterial
          color={tone === "light" ? "#dfe3e8" : "#080a0e"}
          roughness={0.34}
          metalness={0.62}
          envMapIntensity={tone === "light" ? 0.35 : 0.55}
        />
      </mesh>
      {showHorizon ? (
        <mesh position={[0, y + 0.004, -size * 0.28]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[size * 1.6, 0.0075, 1, 1]} />
          <meshBasicMaterial color="#1746D8" toneMapped={false} transparent opacity={0.5} />
        </mesh>
      ) : null}
    </>
  );
}

export default GalleryFloor;
