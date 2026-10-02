import { cn } from '../../utils/cn.js'
import './Kicker.css'

/**
 * AAKAR — Kicker
 *
 * The editorial section label: an index, a cobalt rule and an uppercase title,
 * e.g.  "02 —— SELECTED WORK".
 *
 * @param {Object} props
 * @param {string} [props.index]  two-digit section number
 * @param {React.ReactNode} props.children
 * @param {'left'|'center'} [props.align]
 */
export function Kicker({ index, align = 'left', className, children, ...rest }) {
  return (
    <p className={cn('aakar-kicker', `aakar-kicker--${align}`, className)} {...rest}>
      {index ? <span className="aakar-kicker__index">{index}</span> : null}
      <span className="aakar-kicker__rule" aria-hidden="true" />
      <span className="aakar-kicker__label">{children}</span>
    </p>
  )
}

export default Kicker
