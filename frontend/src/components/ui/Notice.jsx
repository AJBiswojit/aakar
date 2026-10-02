import { cn } from '../../utils/cn.js'
import './Notice.css'

/**
 * AAKAR — Notice
 *
 * Shared presentation for empty, error and 3D-unavailable states, so all three
 * read as part of the design rather than as failures.
 *
 * @param {Object} props
 * @param {string} [props.kicker]
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.children]  body copy
 * @param {React.ReactNode} [props.action]     usually a <Button />
 * @param {'default'|'error'} [props.tone]
 */
export function Notice({ kicker, title, children, action, tone = 'default', className }) {
  return (
    <div className={cn('aakar-notice', `aakar-notice--${tone}`, className)} role="status">
      {kicker ? <p className="aakar-notice__kicker aakar-label">{kicker}</p> : null}
      <p className="aakar-notice__title">{title}</p>
      {children ? <p className="aakar-notice__body">{children}</p> : null}
      {action ? <div className="aakar-notice__action">{action}</div> : null}
    </div>
  )
}

export default Notice
