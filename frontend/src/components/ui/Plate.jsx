import { cn } from '../../utils/cn.js'
import './Plate.css'

/**
 * AAKAR — Plate
 *
 * The media surface of the atelier — every image on the site goes through it,
 * so photography can be swapped in without touching layout code.
 *
 * When a record has no asset yet (`media.thumbnail === ''`), the plate renders
 * an art-directed placeholder instead of a broken image: the product's own
 * palette from the data layer, hairline axes and a technical caption. Nothing
 * is faked, nothing looks unfinished.
 *
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.alt]
 * @param {string} [props.ratio]     CSS aspect-ratio, e.g. "4 / 5"
 * @param {string} [props.label]     placeholder caption
 * @param {string} [props.index]     catalogue index, e.g. "01"
 * @param {[string,string]} [props.palette] two tones from the record
 * @param {string} [props.sizes]
 * @param {'lazy'|'eager'} [props.loading]
 */
export function Plate({
  src,
  alt = '',
  ratio = '4 / 5',
  label,
  index,
  palette,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  loading = 'lazy',
  className,
  children,
}) {
  if (src) {
    return (
      <figure
        className={cn('aakar-plate', className)}
        style={{ '--plate-ratio': ratio }}
      >
        <img
          className="aakar-plate__image"
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          sizes={sizes}
        />
        {children}
      </figure>
    )
  }

  return (
    <figure
      className={cn('aakar-plate', 'aakar-plate--empty', className)}
      style={{
        '--plate-ratio': ratio,
        '--plate-tone-a': palette?.[0] || 'var(--color-black)',
        '--plate-tone-b': palette?.[1] || 'var(--color-obsidian)',
      }}
      role="img"
      aria-label={alt || label || 'No preview asset supplied yet'}
    >
      <span className="aakar-plate__field" aria-hidden="true">
        <span className="aakar-plate__axis aakar-plate__axis--vertical" />
        <span className="aakar-plate__axis aakar-plate__axis--horizontal" />
      </span>

      {index ? (
        <span className="aakar-plate__index" aria-hidden="true">
          {index}
        </span>
      ) : null}

      {label ? (
        <figcaption className="aakar-plate__label aakar-label">{label}</figcaption>
      ) : null}

      {children}
    </figure>
  )
}

export default Plate
