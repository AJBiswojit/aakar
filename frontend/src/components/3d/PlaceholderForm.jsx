import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from './constants.js'

/**
 * AAKAR — PlaceholderForm
 *
 * The exhibit that stands in until the owner supplies real models. It is
 * generated procedurally — no external asset is fetched — and it is honest
 * about what it is: an empty plinth for the catalogue.
 *
 * It answers the pointer with a few degrees of rotation, and can drift at a
 * near-imperceptible rate when `spin` is set. Nothing floats, nothing bounces.
 *
 * @param {{ spin?: boolean, scale?: number }} props
 */
export function PlaceholderForm({ spin = false, scale = 1 }) {
  const groupRef = useRef(null)
  const coreRef = useRef(null)
  const stabilised = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const group = groupRef.current
    if (!group) return

    const target = state.pointer || { x: 0, y: 0 }
    const smoothing = 1 - Math.exp(-2.4 * Math.min(delta, 0.05))

    stabilised.x += (target.x * 0.38 - stabilised.x) * smoothing
    stabilised.y += (-target.y * 0.22 - stabilised.y) * smoothing

    group.rotation.y += (stabilised.x - group.rotation.y) * smoothing
    group.rotation.x += (stabilised.y - group.rotation.x) * smoothing

    if (spin) {
      group.rotation.y += delta * 0.045
    }
    if (coreRef.current) {
      coreRef.current.rotation.z += delta * 0.02
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      {/* the formed solid */}
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.02, 0]} />
        <meshStandardMaterial
          color={COLORS.solid}
          roughness={0.34}
          metalness={0.42}
          flatShading
        />
      </mesh>

      {/* cobalt wireframe — the technical reading of the same form */}
      <mesh scale={1.16}>
        <icosahedronGeometry args={[1.02, 0]} />
        <meshBasicMaterial
          color={COLORS.cobalt}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* slow inner ring: a measuring instrument around the object */}
      <mesh ref={coreRef} rotation={[Math.PI / 2.4, 0, 0]} scale={1.42}>
        <torusGeometry args={[1.02, 0.0035, 3, 220]} />
        <meshBasicMaterial color={COLORS.rim} transparent opacity={0.55} />
      </mesh>
    </group>
  )
}

export default PlaceholderForm
