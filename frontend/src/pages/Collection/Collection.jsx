import { useSearchParams } from 'react-router-dom'
import { PlaceholderPage } from '../../components/common/PlaceholderPage.jsx'

/**
 * AAKAR — Collection (/collection)
 *
 * Route foundation. The query string is already wired (?q= from the search
 * panel, ?category= from the catalogue index) so the store phase only has to
 * convert those parameters into service filters.
 */
export function Collection() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')
  const category = searchParams.get('category')

  const context = [
    query ? `search “${query}”` : null,
    category ? `category “${category}”` : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <PlaceholderPage
      index="06"
      kicker="The Store"
      title="The catalogue"
      lead={
        context
          ? `Filtering against ${context} begins when the store phase ships. The route, the query contract and the data service already exist.`
          : 'Every published asset, filterable by category, format, price and technical specification. The taxonomy and product services behind it are already in place.'
      }
      contents={[
        { id: 'filter', label: 'Category, price and technical filters' },
        { id: 'search', label: 'Catalogue search across names and tags' },
        { id: 'grid', label: 'Product grid with sort and pagination' },
        { id: 'states', label: 'Loading, empty and error states' },
      ]}
    />
  )
}

export default Collection
