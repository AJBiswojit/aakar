/**
 * AAKAR — Categories service (mock implementation)
 *
 *   getCategories()          → Category[] with a derived `productCount`
 *   getCategoryBySlug(slug)  → Category (throws NotFoundError)
 *   getCategoryTree()        → flat ordered taxonomy for nav/menus
 */

import categoriesSource from '../../mock/data/categories.js'
import productsSource from '../../mock/data/products.js'
import { mockRequest } from '../api/fake.client.js'

function withCounts(categories, products) {
  const published = products.filter((product) => product.status === 'published')
  return categories
    .map((category) => ({
      ...category,
      productCount: published.filter((product) => product.category?.id === category.id).length,
    }))
    .sort((a, b) => a.order - b.order)
}

/** @returns {Promise<Array>} */
export async function getCategories() {
  return mockRequest(categoriesSource, {
    params: productsSource,
    select: (records, products) => withCounts(records, products),
  })
}

/** @returns {Promise<Object>} */
export async function getCategoryBySlug(slug) {
  return mockRequest(categoriesSource, {
    params: { slug, products: productsSource },
    notFoundMessage: `No category found for slug "${slug}".`,
    select: (records, { slug: value, products }) =>
      withCounts(records, products).find((category) => category.slug === value),
  })
}

export default { getCategories, getCategoryBySlug }
