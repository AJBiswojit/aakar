import { Link } from 'react-router-dom'
import { Box } from 'lucide-react'
import { Plate } from '../ui/Plate.jsx'
import { formatPrice } from '../../utils/format.js'
import { getSpecBadges } from '../../utils/specifications.js'
import './ProductCard.css'

/**
 * AAKAR — ProductCard
 *
 * The reusable catalogue unit: media, name, category, price and the technical
 * metadata that actually exists on the record. Badges are derived from
 * `specifications` — nothing is claimed that the data does not support.
 *
 * The card receives a product object. It never fetches and never imports mock
 * data: products arrive from useProducts() → products.service.js.
 *
 * @param {{ product: Object, index?: number, ratio?: string }} props
 */
export function ProductCard({ product, index, ratio = '4 / 5' }) {
  if (!product) return null

  const badges = getSpecBadges(product.specifications).slice(0, 4)
  const has3D = Boolean(product.model?.previewUrl)

  return (
    <article className="aakar-productcard" data-reveal="up">
      <Link
        className="aakar-productcard__media"
        to={`/product/${product.slug}`}
        aria-label={`${product.name} — ${product.category?.name || 'Asset'}, ${formatPrice(product.pricing)}`}
      >
        <Plate
          src={product.media?.thumbnail}
          alt={`${product.name} — ${product.category?.name} 3D asset by AAKAR`}
          label="Preview pending"
          index={index != null ? String(index).padStart(2, '0') : undefined}
          palette={product.media?.palette}
          ratio={ratio}
        />

        {has3D ? (
          <span className="aakar-productcard__badge3d aakar-label">
            <Box size={12} strokeWidth={1.5} aria-hidden="true" />
            View in 3D
          </span>
        ) : null}
      </Link>

      <div className="aakar-productcard__body">
        <p className="aakar-productcard__category aakar-label">
          {[product.category?.name, product.model?.version ? `v${product.model.version}` : null]
            .filter(Boolean)
            .join(' / ')}
        </p>

        <h3 className="aakar-productcard__name">
          <Link className="aakar-underline" to={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="aakar-productcard__price">{formatPrice(product.pricing)}</p>

        {badges.length > 0 ? (
          <ul className="aakar-productcard__badges" aria-label="Technical specifications">
            {badges.map((badge) => (
              <li className="aakar-productcard__badge aakar-label" key={badge.id}>
                {badge.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

export default ProductCard
