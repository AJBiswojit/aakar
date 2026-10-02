import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProducts } from '../../hooks/useProducts.js'
import { SectionHead } from '../common/SectionHead.jsx'
import { ProductCard } from './ProductCard.jsx'
import { Plate } from '../ui/Plate.jsx'
import { Button } from '../ui/Button.jsx'
import { Notice } from '../ui/Notice.jsx'
import { Loader } from '../ui/Loader.jsx'
import { MetaList } from '../ui/MetaList.jsx'
import { formatPrice } from '../../utils/format.js'
import { getSpecificationRows } from '../../utils/specifications.js'
import './ProductShowcase.css'

/**
 * AAKAR — ProductShowcase
 *
 * WHITE / STORE. The first product is presented as an editorial feature — large
 * plate, full specification table, price — which is how a single asset earns
 * attention. The remainder use the reusable ProductCard in a restrained grid.
 *
 * Data: useProducts({ featured: true }) → products.service.js.
 */
export function ProductShowcase({ limit = 3 }) {
  const { products, isLoading, isError, isEmpty, refetch } = useProducts({
    featured: true,
    limit,
  })

  const [featured, ...rest] = products
  const specs = featured ? getSpecificationRows(featured).slice(0, 5) : []

  return (
    <section
      className="aakar-section aakar-showcase"
      data-theme="light"
      data-nav-theme="light"
      aria-labelledby="showcase-title"
    >
      <div className="aakar-container">
        <SectionHead
          index="03"
          kicker="The Store"
          layout="split"
          title={<span id="showcase-title">Assets built to be examined.</span>}
          lead="Digital assets delivered with clean topology, honest UVs and PBR materials — licensed for commercial production work."
          action={
            <Button to="/collection" variant="line">
              Enter the store
              <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Button>
          }
        />

        {isLoading ? <Loader label="Loading the latest assets" /> : null}

        {isError ? (
          <Notice
            kicker="Unavailable"
            title="The store could not be reached."
            action={
              <Button variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          >
            Product data did not load. The catalogue itself is unaffected.
          </Notice>
        ) : null}

        {isEmpty ? (
          <Notice kicker="No assets yet" title="The catalogue is being prepared.">
            Published products appear here as soon as the first release ships.
          </Notice>
        ) : null}

        {featured ? (
          <article className="aakar-showcase__feature" data-reveal="up">
            <Link
              className="aakar-showcase__feature-media"
              to={`/product/${featured.slug}`}
              aria-label={`${featured.name} — open the product examination`}
            >
              <Plate
                src={featured.media?.hero || featured.media?.thumbnail}
                alt={`${featured.name} — ${featured.category?.name} 3D asset by AAKAR`}
                label={`${featured.name} — hero image pending`}
                palette={featured.media?.palette}
                ratio="4 / 3"
                sizes="(max-width: 900px) 100vw, 60vw"
              />
            </Link>

            <div className="aakar-showcase__feature-body">
              <p className="aakar-label aakar-showcase__feature-index">
                Featured asset / {featured.category?.name}
              </p>

              <h3 className="aakar-showcase__feature-title">{featured.name}</h3>

              <p className="aakar-showcase__feature-description">{featured.description}</p>

              <p className="aakar-showcase__feature-price">{formatPrice(featured.pricing)}</p>

              <MetaList items={specs} dense />

              <div className="aakar-showcase__feature-actions">
                <Button to={`/product/${featured.slug}`} variant="primary">
                  Examine in 3D
                </Button>
                <Button to="/collection" variant="line">
                  Full catalogue
                </Button>
              </div>
            </div>
          </article>
        ) : null}

        {rest.length > 0 ? (
          <div className="aakar-showcase__grid">
            {rest.map((product, position) => (
              <ProductCard key={product.id} product={product} index={position + 2} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ProductShowcase
