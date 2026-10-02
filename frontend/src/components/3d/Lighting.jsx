import { COLORS } from './constants.js'

/**
 * AAKAR — Lighting
 *
 * The studio rig, in brand terms: a neutral key and fill for form, plus one
 * cobalt light used as a rim/accent — the same 10% interaction colour that runs
 * through the interface, applied to the exhibit itself.
 *
 * No environment map is loaded from a CDN: AAKAR ships its own lighting so the
 * atelier never depends on a third-party asset.
 *
 * @param {Object} props
 * @param {number} [props.intensity]  master multiplier for the rig
 * @param {boolean} [props.accent]    whether the cobalt rim light is present
 */
export function Lighting({ intensity = 1, accent = true }) {
  return (
    <>
      {/* ambient — keeps shadow values readable against obsidian */}
      <ambientLight intensity={0.22 * intensity} color={COLORS.neutral} />

      {/* key — front-right, defines the primary form */}
      <directionalLight
        position={[3.6, 4.4, 3.2]}
        intensity={1.55 * intensity}
        color={COLORS.neutral}
      />

      {/* fill — soft, opposite the key, prevents dead black */}
      <directionalLight
        position={[-4.2, 1.2, 2.4]}
        intensity={0.45 * intensity}
        color={COLORS.fill}
      />

      {/* rim — separates the form from the obsidian background */}
      <directionalLight
        position={[-2.4, 2.6, -4.2]}
        intensity={0.85 * intensity}
        color={COLORS.rim}
      />

      {/* cobalt accent — the interaction colour, lighting the form */}
      {accent ? (
        <pointLight
          position={[2.1, -1.6, 2.6]}
          intensity={38 * intensity}
          distance={14}
          decay={2}
          color={COLORS.cobalt}
        />
      ) : null}
    </>
  )
}

export default Lighting
