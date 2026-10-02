import { Suspense, lazy } from 'react'
import { useApp } from '../../hooks/useApp.js'
import { ModelFallback } from '../3d/ModelFallback.jsx'

/**
 * AAKAR — HeroStage
 *
 * The single mount point for the hero's 3D exhibit, and the reason three.js is
 * not in the initial bundle: the Scene module is imported dynamically and only
 * when the device can actually carry it.
 *
 * Decision order:
 *   1. device cannot render 3D  → 2D plate (no three.js downloaded at all)
 *   2. 3D available            → dynamic import, plate shown while it loads
 *
 * @param {Object} props
 * @param {string} [props.modelUrl]  from data: artist.heroModel / product.model.previewUrl
 * @param {[string,string]} [props.palette]
 * @param {string} [props.label]
 */
export function HeroStage({ modelUrl = '', palette, label = 'An orbiting digital form on a measuring grid' }) {
  const { canRender3D } = useApp()

  if (!canRender3D) {
    return (
      <ModelFallback
        palette={palette}
        label="The exhibit"
        note="3D exhibition available on desktop"
        ratio="4 / 5"
      />
    )
  }

  return (
    <Suspense
      fallback={
        <ModelFallback
          palette={palette}
          label="The exhibit"
          note="Opening the exhibition"
          ratio="4 / 5"
        />
      }
    >
      <LazyScene
        framing="hero"
        modelUrl={modelUrl}
        controls="rig"
        spin
        label={label}
        palette={palette}
      />
    </Suspense>
  )
}

/** three.js, drei and the scene graph arrive in their own chunk. */
const LazyScene = lazy(() => import('../3d/Scene.jsx'))

export default HeroStage
