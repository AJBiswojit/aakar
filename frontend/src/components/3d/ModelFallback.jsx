import { Plate } from '../ui/Plate.jsx'
import { cn } from '../../utils/cn.js'
import './Scene.css'

/**
 * AAKAR — ModelFallback
 *
 * The two-dimensional stand-in for the 3D stage. Shown when:
 *   · the device cannot render 3D (mobile, low power, reduced motion, no WebGL)
 *   · no model asset has been supplied yet
 *   · a model fails to load or the canvas context is lost
 *
 * Accessibility rule: 3D is never the only way to understand a product, so this
 * surface always carries a caption and alt text.
 *
 * @param {{ label?: string, note?: string, index?: string, palette?: [string,string], ratio?: string, className?: string }} props
 */
export function ModelFallback({
  label = '3D preview',
  note = 'Interactive viewer available on desktop',
  index,
  palette,
  ratio = '4 / 5',
  className,
}) {
  return (
    <div className={cn('aakar-modelfallback', className)}>
      <Plate label={label} index={index} palette={palette} ratio={ratio} alt={`${label}. ${note}`} />
      <p className="aakar-modelfallback__note aakar-label">{note}</p>
    </div>
  )
}

export default ModelFallback
