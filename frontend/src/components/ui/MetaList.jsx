import { cn } from '../../utils/cn.js'
import './MetaList.css'

/**
 * AAKAR — MetaList
 *
 * Technical metadata as a definition list: hairline-separated label/value rows.
 * Used for specifications, work credits and order summaries — one visual
 * language for "facts about this object".
 *
 * @param {{ items: Array<{ id: string, label: string, value: React.ReactNode }>, className?: string, dense?: boolean }} props
 */
export function MetaList({ items = [], dense = false, className }) {
  if (items.length === 0) return null

  return (
    <dl className={cn('aakar-meta', dense && 'aakar-meta--dense', className)}>
      {items.map((item) => (
        <div className="aakar-meta__row" key={item.id}>
          <dt className="aakar-meta__label aakar-label">{item.label}</dt>
          <dd className="aakar-meta__value">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default MetaList
