import { Kicker } from '../ui/Kicker.jsx'
import { cn } from '../../utils/cn.js'
import './SectionHead.css'

/**
 * AAKAR — SectionHead
 *
 * The repeating editorial head: kicker, large display statement, optional lead
 * paragraph and an optional action. Every homepage section uses it, which is
 * what makes the page rhythm feel intentional.
 *
 * @param {Object} props
 * @param {string} [props.index]
 * @param {React.ReactNode} [props.kicker]
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.lead]
 * @param {React.ReactNode} [props.action]
 * @param {'left'|'split'} [props.layout]  'split' places the action opposite the title
 */
export function SectionHead({
  index,
  kicker,
  title,
  lead,
  action,
  layout = 'left',
  className,
}) {
  return (
    <header className={cn('aakar-section-head', `aakar-section-head--${layout}`, className)}>
      <div className="aakar-section-head__lead">
        {kicker ? (
          <Kicker index={index} data-reveal="fade">
            {kicker}
          </Kicker>
        ) : null}
        <h2 className="aakar-section-head__title" data-reveal="up">
          {title}
        </h2>
        {lead ? (
          <p className="aakar-section-head__body" data-reveal="up" data-reveal-delay="120">
            {lead}
          </p>
        ) : null}
      </div>

      {action ? <div className="aakar-section-head__action">{action}</div> : null}
    </header>
  )
}

export default SectionHead
