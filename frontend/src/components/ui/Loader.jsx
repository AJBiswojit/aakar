import { cn } from '../../utils/cn.js'
import './Loader.css'

/**
 * AAKAR — Loader
 *
 * A single cobalt rule travelling across the frame plus a technical label.
 * No spinners, no skeletons that imitate content, no artificial delay.
 *
 * @param {{ label?: string, variant?: 'line'|'inline', className?: string }} props
 */
export function Loader({ label = 'Loading', variant = 'line', className }) {
  return (
    <div
      className={cn('aakar-loader', `aakar-loader--${variant}`, className)}
      role="status"
      aria-live="polite"
    >
      <span className="aakar-loader__track" aria-hidden="true">
        <span className="aakar-loader__bar" />
      </span>
      {label ? <span className="aakar-loader__label aakar-label">{label}</span> : null}
    </div>
  )
}

export default Loader
