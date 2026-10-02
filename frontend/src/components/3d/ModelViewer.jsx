import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { ModelBoundary } from './ModelBoundary.jsx'
import { PlaceholderForm } from './PlaceholderForm.jsx'

/**
 * AAKAR — ModelViewer
 *
 * Mounts exactly one exhibit. The model source is always data:
 * `product.model.previewUrl` — never a hardcoded URL. When the field is empty
 * the procedural placeholder form is shown instead of an empty origin.
 *
 * Extension points kept in mind (not built yet):
 *   · material switching  → swap the material on `model.traverse()`
 *   · hotspots            → drei <Html occlude> anchors resolved from a data map
 * Both operate on the cloned scene below and require no changes to Scene.jsx.
 *
 * @param {Object} props
 * @param {string} [props.url]        model.previewUrl
 * @param {number} [props.scale]
 * @param {boolean} [props.spin]
 * @param {React.ReactNode} [props.fallback] what to render if the load fails
 */
export function ModelViewer({ url, scale = 1, spin = false, fallback = null }) {
  if (!url) {
    return <PlaceholderForm spin={spin} scale={scale} />
  }

  return (
    <ModelBoundary fallback={fallback ?? <PlaceholderForm scale={scale} />}>
      <GltfModel url={url} scale={scale} />
    </ModelBoundary>
  )
}

/**
 * Loads and mounts a GLB/GLTF. Suspense is owned by Scene.jsx, so the loading
 * state is presented by the host element rather than here.
 *
 * The scene is cloned so the same URL can appear in more than one viewer; the
 * cached original stays owned by drei's loader and is deliberately not disposed
 * here.
 */
function GltfModel({ url, scale = 1 }) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => scene.clone(true), [scene])

  return <primitive object={model} scale={scale} />
}

export default ModelViewer
