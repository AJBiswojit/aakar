import { Link, useParams } from 'react-router-dom'
import { useProduct } from '../../hooks/useProduct.js'
import { useReveal } from '../../hooks/useReveal.js'
import { Kicker } from '../../components/ui/Kicker.jsx'
import { MetaList } from '../../components/ui/MetaList.jsx'
import { Loader } from '../../components/ui/Loader.jsx'
import { Notice } from '../../components/ui/Notice.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { formatPrice, formatDate } from '../../utils/format.js'
import { getSpecificationRows } from '../../utils/specifications.js'
import './Product.css'

/**
 * AAKAR — Product (/product/:slug)
 *
 * Deliberately minimal in this phase: it proves the data path
 * (useProduct → products.service → data source) and presents the facts of an
 * asset. The interactive examination, licensing selector and purchase actions
 * belong to the store phase.
 */
export function Product() {
  const { slug } = useParams()
  const { product, reviews, isLoading, isError, isNotFound } = useProduct(slug)

  useReveal([slug, product?.id])

  // No slug in the URL at all — treat as a missing record rather than idle.
  if (!slug) return <MissingRecord slug="—" />

  if (isLoading) {
    return (
      <section className="aakar-product aakar-container" data-theme="light" data-nav-theme="light">
        <Loader label="Retrieving asset record" />
      </section>
    )
  }

  if (isNotFound || (isError && !product)) return <MissingRecord slug={slug} />

  if (!product) return null

  const specs = getSpecificationRows(product)

  return (
    <article className="aakar-product" data-theme="light" data-nav-theme="light">
      <header className="aakar-product__header aakar-container">
        <div className="aakar-product__heading">
          <Kicker index="—" data-reveal="fade">
            <Link to={`/collection?category=${product.category?.slug}`}>
              {product.category?.name}
            </Link>
          </Kicker>

          <h1 className="aakar-product__title" data-reveal="up">
            {product.name}
          </h1>

          <p className="aakar-product__description" data-reveal="up" data-reveal-delay="120">
            {product.description}
          </p>
        </div>

        <div className="aakar-product__summary" data-reveal="up" data-reveal-delay="200">
          <p className="aakar-product__price">{formatPrice(product.pricing)}</p>
          <p className="aakar-product__license aakar-label">
            {product.license?.type} licence · released {formatDate(product.createdAt)}
          </p>

          {reviews?.count ? (
            <p className="aakar-product__reviews aakar-label">
              {reviews.average} / 5 · {reviews.count}{' '}
              {reviews.count === 1 ? 'review' : 'reviews'}
            </p>
          ) : null}

          <Button to="/collection" variant="secondary" full>
            Return to catalogue
          </Button>
        </div>
      </header>

      <section className="aakar-product__specs aakar-container" aria-labelledby="specs-title">
        <h2 className="aakar-product__specs-title" id="specs-title" data-reveal="up">
          Technical specification
        </h2>
        <MetaList items={specs} />
      </section>

      <section className="aakar-product__examination aakar-container" data-theme="dark">
        <div className="aakar-product__examination-inner">
          <Kicker index="—">The Examination</Kicker>
          <h2 className="aakar-product__examination-title">
            The interactive 3D viewer arrives with the store phase.
          </h2>
          <p className="aakar-product__examination-body">
            The viewer foundation is already in place —{' '}
            <code>components/3d/Scene.jsx</code> with orbit controls, lighting, loading
            and fallback states. It mounts the moment this record carries a model at{' '}
            <code>model.previewUrl</code>, and until then it presents the designed
            two-dimensional plate rather than a broken canvas.
          </p>
          <Button to="/studio" variant="line">
            See the exhibit in the hero
          </Button>
        </div>
      </section>
    </article>
  )
}

/** Shared 404 presentation for a missing or unpublished record. */
function MissingRecord({ slug }) {
  return (
    <section className="aakar-product aakar-container" data-theme="light" data-nav-theme="light">
      <Notice
        kicker="404"
        title="This asset is not in the catalogue."
        action={
          <Button to="/collection" variant="primary">
            Back to the catalogue
          </Button>
        }
      >
        The record for “{slug}” does not exist or is no longer published.
      </Notice>
    </section>
  )
}

export default Product
