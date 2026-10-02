import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AAKAR — CameraRig
 *
 * "The Orbit" — the exhibit responds to the visitor, not the reverse. The
 * camera drifts a few centimetres toward the cursor and eases back, and may
 * travel slightly as the page scrolls past.
 *
 * Everything is damped, frame-rate independent and small by design: this should
 * read as a premium examination of an object, never as a game.
 *
 * @param {Object} props
 * @param {[number,number,number]} [props.base]      resting camera position
 * @param {[number,number,number]} [props.target]    look-at point
 * @param {number} [props.pointerInfluence]          metres of travel at full deflection
 * @param {number} [props.scrollInfluence]           metres of travel across one viewport of scroll
 * @param {number} [props.damping]                   higher = tighter follow
 * @param {boolean} [props.enabled]
 */
export function CameraRig({
  base = [0, 0.15, 5.1],
  target = [0, 0, 0],
  pointerInfluence = 0.34,
  scrollInfluence = 0.6,
  damping = 2.2,
  enabled = true,
}) {
  const { camera, size } = useThree()

  const baseRef = useMemo(() => new THREE.Vector3(...base), [base])
  const targetRef = useMemo(() => new THREE.Vector3(...target), [target])
  const desiredRef = useRef(new THREE.Vector3(...base))
  const pointerRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef(0)

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    const handleScroll = () => {
      const viewport = Math.max(window.innerHeight, 1)
      scrollRef.current = Math.min(Math.max(window.scrollY / viewport, 0), 1)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Keep the resting framing correct when the viewport is very wide or narrow.
  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1)
    desiredRef.current.z = baseRef.z + (aspect < 1 ? 1.15 : aspect < 1.4 ? 0.4 : 0)
  }, [size.width, size.height, baseRef])

  useFrame((_, delta) => {
    if (!enabled) return

    const desired = desiredRef.current
    desired.x = baseRef.x + pointerRef.current.x * pointerInfluence
    desired.y = baseRef.y - pointerRef.current.y * pointerInfluence * 0.55
    desired.z = baseRef.z + scrollRef.current * scrollInfluence

    const smoothing = 1 - Math.exp(-damping * Math.min(delta, 0.05))
    camera.position.lerp(desired, smoothing)
    camera.lookAt(targetRef)
  })

  return null
}

export default CameraRig
