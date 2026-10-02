import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn.js'
import './Button.css'

/**
 * AAKAR — Button
 *
 * One control, used everywhere: CTAs, form submits, utility actions. Renders a
 * router <Link> when given `to`, an <a> when given `href`, otherwise a <button>.
 *
 * Cobalt marks interaction — so cobalt is reserved for the primary action only.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'ghost'|'line'} [props.variant]
 * @param {'sm'|'md'|'lg'} [props.size]
 * @param {string} [props.to]     router destination
 * @param {string} [props.href]   external destination
 * @param {boolean} [props.full]  stretch to container width
 */
export function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  full = false,
  className,
  children,
  ...rest
}) {
  const classes = cn(
    'aakar-button',
    `aakar-button--${variant}`,
    `aakar-button--${size}`,
    full && 'aakar-button--full',
    className,
  )

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        <span className="aakar-button__label">{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        {...rest}
      >
        <span className="aakar-button__label">{children}</span>
      </a>
    )
  }

  return (
    <button className={classes} type={rest.type || 'button'} {...rest}>
      <span className="aakar-button__label">{children}</span>
    </button>
  )
}

export default Button
