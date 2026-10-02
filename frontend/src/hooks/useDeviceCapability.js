import { useState } from 'react'
import { useMediaQuery } from './useMediaQuery.js'

/**
 * AAKAR — useDeviceCapability
 *
 * Decides how rich the experience may be on the current device. Performance is
 * treated as a feature: a phone, a reduced-motion preference or a weak GPU all
 * receive the fallback presentation instead of an expensive 3D scene — never a
 * broken one.
 *
 * @returns {{
 *   isMobile: boolean, isTablet: boolean, isDesktop: boolean,
 *   prefersReducedMotion: boolean, prefersReducedData: boolean,
 *   hasFinePointer: boolean, canRender3D: boolean
 * }}
 */
export function useDeviceCapability() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersReducedData = useMediaQuery('(prefers-reduced-data: reduce)')
  const hasFinePointer = useMediaQuery('(hover: hover) and (pointer: fine)')

  // Detected synchronously on the first render (result cached for the session):
  // waiting for an effect would start downloading the 3D bundle on devices that
  // can never render it.
  const [webglSupported] = useState(detectWebGL)

  const canRender3D =
    webglSupported && !prefersReducedMotion && !prefersReducedData && !isMobile

  return {
    isMobile,
    isTablet,
    isDesktop,
    prefersReducedMotion,
    prefersReducedData,
    hasFinePointer,
    webglSupported,
    canRender3D,
  }
}

let webglSupport = null

/** Cheap capability probe, cached for the lifetime of the session. */
function detectWebGL() {
  if (webglSupport !== null) return webglSupport
  if (typeof window === 'undefined' || !window.WebGLRenderingContext) {
    webglSupport = false
    return webglSupport
  }
  try {
    const canvas = document.createElement('canvas')
    webglSupport = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    webglSupport = false
  }
  return webglSupport
}

export default useDeviceCapability
