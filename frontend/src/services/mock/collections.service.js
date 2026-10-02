/**
 * AAKAR — Collections service (mock implementation)
 *
 *   getCollections()          → Collection[] (with resolved products)
 *   getCollectionBySlug(slug) → Collection (throws NotFoundError)
 */

import collectionsSource from '../../mock/data/collections.js'
import productsSource from '../../mock/data/products.js'
import { mockRequest } from '../api/fake.client.js'

/** Resolve productSlugs into product records so the UI never joins data itself. */
function hydrate(collection, products) {
  const published = products.filter((product) => product.status === 'published')
  const items = (collection.productSlugs || [])
    .map((slug) => published.find((product) => product.slug === slug))
    .filter(Boolean)

  const { productSlugs, ...rest } = collection
  return { ...rest, products: items, productCount: items.length }
}

/** @returns {Promise<Array>} */
export async function getCollections() {
  return mockRequest(collectionsSource, {
    params: productsSource,
    select: (records, products) =>
      records
        .filter((collection) => collection.status === 'published')
        .map((collection) => hydrate(collection, products)),
  })
}

/** @returns {Promise<Object>} */
export async function getCollectionBySlug(slug) {
  return mockRequest(collectionsSource, {
    params: { slug, products: productsSource },
    notFoundMessage: `No collection found for slug "${slug}".`,
    select: (records, { slug: value, products }) => {
      const collection = records.find(
        (item) => item.slug === value && item.status === 'published',
      )
      return collection ? hydrate(collection, products) : undefined
    },
  })
}

export default { getCollections, getCollectionBySlug }
