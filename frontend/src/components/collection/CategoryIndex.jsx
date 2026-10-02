import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useCategories } from '../../hooks/useCategories.js'
import { SectionHead } from '../common/SectionHead.jsx'
import { Notice } from '../ui/Notice.jsx'
import { Loader } from '../ui/Loader.jsx'
import { Button } from '../ui/Button.jsx'
import './CategoryIndex.css'

/**
 * AAKAR — CategoryIndex
 *
 * The catalogue taxonomy as an index page: hairline rows, counts, and one line
 * of description each. Not one card, not one icon — the discipline list of an
 * atelier.
 *
 * Data: useCategories() (counts are derived in the service, never stored).
 */
export function CategoryIndex() {
  const { categories, isLoading, isError, refetch } = useCategories()

  return (
    <section
      className="aakar-section aakar-section--compact aakar-categories"
      data-theme="light"
      data-nav-theme="light"
      aria-labelledby="categories-title"
    >
      <div className="aakar-container">
        <SectionHead
          index="02"
          kicker="The Catalogue"
          layout="split"
          title={<span id="categories-title">Seven disciplines, one hand.</span>}
          lead="Every category is produced in-house by the same artist, to the same standard. Counts reflect what is published and available today."
          action={
            <Link className="aakar-categories__all aakar-label" to="/collection">
              All assets
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          }
        />

        {isLoading ? <Loader label="Loading the catalogue index" /> : null}

        {isError ? (
          <Notice
            kicker="Unavailable"
            title="The catalogue index could not be retrieved."
            action={
              <Button onClick={() => refetch()} variant="secondary">
                Try again
              </Button>
            }
          />
        ) : null}

        <ul className="aakar-categories__list">
          {categories.map((category, position) => (
            <li className="aakar-categories__item" key={category.id} data-reveal="up">
              <Link
                className="aakar-categories__link"
                to={`/collection?category=${category.slug}`}
              >
                <span className="aakar-categories__count">
                  {String(position + 1).padStart(2, '0')}
                </span>
                <span className="aakar-categories__name">{category.name}</span>
                <span className="aakar-categories__description">{category.description}</span>
                <span className="aakar-categories__tally aakar-label">
                  {category.productCount} {category.productCount === 1 ? 'asset' : 'assets'}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CategoryIndex
