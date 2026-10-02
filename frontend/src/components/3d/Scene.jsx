import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Grid, OrbitControls, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { Lighting } from './Lighting.jsx'
import { CameraRig } from './CameraRig.jsx'
import { ModelViewer } from './ModelViewer.jsx'
import { PlaceholderForm } from './PlaceholderForm.jsx'
import { ModelFallback } from './ModelFallback.jsx'
import { CAMERA, COLORS, DPR_RANGE } from './constants.js'
import { cn } from '../../utils/cn.js'
import './Scene.css'

/**
 * AAKAR — Scene
 *
 * The canvas itself: lighting, camera behaviour, the exhibit and the technical
 * grid floor. The container owns its loading and fallback presentation, so a
 * host only has to supply data.
 *
 * This module is imported dynamically (see hero/HeroStage.jsx) so three.js and
 * drei are downloaded only by visitors who actually get a 3D experience.
 *
 * @param {Object} props
 * @param {'hero'|'product'} [props.framing]
 * @param {string} [props.modelUrl]  from product.model.previewUrl
 * @param {'rig'|'orbit'|'none'} [props.controls]
 * @param {boolean} [props.grid]
 * @param {boolean} [props.spin]
 * @param {string} [props.label]        accessible description of the exhibit
 * @param {[string,string]} [props.palette] used by the fallback plate
 */
export function Scene({
  framing = 'hero',
  modelUrl = '',
  controls = 'rig',
  grid = true,
  spin = false,
  label = 'Interactive 3D preview',
  palette,
  className,
}) {
  const camera = CAMERA[framing] || CAMERA.hero
  const orbit = controls === 'orbit'
  const canvasElementRef = useRef(null)
  const [contextLost, setContextLost] = useState(false)

  // Losing the WebGL context (driver reset, backgrounded tab on low memory)
  // must degrade to the 2D plate rather than leave a frozen canvas.
  useEffect(() => {
    const element = canvasElementRef.current
    if (!element) return undefined

    const handleContextLost = (event) => {
      event.preventDefault()
      setContextLost(true)
    }

    element.addEventListener('webglcontextlost', handleContextLost)
    return () => element.removeEventListener('webglcontextlost', handleContextLost)
  }, [])

  if (contextLost) {
    return (
      <div className={cn('aakar-scene', 'aakar-scene--fallback', className)}>
        <ModelFallback
          palette={palette}
          label={label}
          note="3D view paused on this device"
          ratio="4 / 5"
        />
      </div>
    )
  }

  return (
    <div className={cn('aakar-scene', className)} data-controls={controls}>
      <Canvas
        className="aakar-scene__canvas"
        dpr={DPR_RANGE}
        shadows
        camera={{ position: camera.position, fov: camera.fov, near: 0.1, far: 80 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.02,
        }}
        aria-hidden="true"
        onCreated={({ gl }) => {
          gl.setClearAlpha(0)
          canvasElementRef.current = gl.domElement
        }}
      >
        <Lighting />

        {orbit ? (
          <OrbitControls
            makeDefault
            target={camera.target}
            enablePan={false}
            enableDamping
            dampingFactor={0.075}
            rotateSpeed={0.6}
            zoomSpeed={0.55}
            minDistance={2.4}
            maxDistance={9}
            minPolarAngle={Math.PI / 3.4}
            maxPolarAngle={Math.PI / 1.85}
          />
        ) : (
          <CameraRig base={camera.position} target={camera.target} enabled={controls === 'rig'} />
        )}

        <Suspense fallback={null}>
          {/* A failed GLB falls back to the procedural form, inside the scene:
              the 2D plate is only ever used outside the canvas. */}
          <ModelViewer url={modelUrl} spin={spin} fallback={<PlaceholderForm />} />
          <Preload all />
        </Suspense>

        {grid ? <StudioGrid /> : null}

        <AdaptiveDpr pixelated={false} />
        <AdaptiveEvents />
      </Canvas>

      {orbit ? (
        <span className="aakar-scene__badge aakar-label">Drag to orbit · Scroll to zoom</span>
      ) : null}

      {/* The canvas is decorative to assistive tech; this carries the meaning. */}
      <p className="aakar-visually-hidden">{label}</p>
    </div>
  )
}

/** The technical floor: hairlines that read as a measuring surface. */
function StudioGrid() {
  return (
    <Grid
      position={[0, -1.35, 0]}
      args={[24, 24]}
      cellSize={0.55}
      cellThickness={0.5}
      cellColor={COLORS.neutral}
      sectionSize={2.75}
      sectionThickness={1}
      sectionColor={COLORS.cobalt}
      fadeDistance={22}
      fadeStrength={1.6}
      followCamera={false}
      infiniteGrid
    />
  )
}

export default Scene
