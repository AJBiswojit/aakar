/**
 * AAKAR — Products service (mock implementation)
 *
 * Contract (Phase 6 the same functions exist in an ./api implementation with
 * identical signatures and return shapes):
 *
 *   getProducts(filters?)        → Product[]
 *   getProductBySlug(slug)       → Product            (throws NotFoundError)
 *   getFeaturedProducts(limit?)  → Product[]
 *   getProductsBySlugs(slugs)    → Product[]
 *   getRelatedProducts(product, limit?) → Product[]
 */

import productsSource from '../../mock/data/products.js'
import reviewsSource from '../../mock/data/reviews.js'
import { mockRequest } from '../api/fake.client.js'

/** Only published records are ever exposed to the public site. */
function published(records) {
  return records.filter((product) => product.status === 'published')
}

function sortByRecency(a, b) {
  return new Date(b.createdAt) - new Date(a.createdAt)
}

/** @returns {Promise<Array>} */
export async function getProducts(filters = {}) {
  return mockRequest(productsSource, {
    params: filters,
    select: (records, { category, collection, search, limit } = {}) => {
      let result = published(records)

      if (category) result = result.filter((product) => product.category?.slug === category)
      if (collection) result = result.filter((product) => product.collection === collection)
      if (search) {
        const term = String(search).toLowerCase()
        result = result.filter((product) =>
          [product.name, product.description, ...(product.tags || [])]
            .join(' ')
            .toLowerCase()
            .includes(term),
        )
      }

      result = [...result].sort(sortByRecency)
      return typeof limit === 'number' ? result.slice(0, limit) : result
    },
  })
}

/** @returns {Promise<Object>} */
export async function getProductBySlug(slug) {
  return mockRequest(productsSource, {
    params: slug,
    notFoundMessage: `No product found for slug "${slug}".`,
    select: (records, value) =>
      published(records).find((product) => product.slug === value),
  })
}

/** @returns {Promise<Array>} */
export async function getFeaturedProducts(limit = 3) {
  return mockRequest(productsSource, {
    params: limit,
    select: (records, value) =>
      published(records).filter((product) => product.featured).sort(sortByRecency).slice(0, value),
  })
}

/** @returns {Promise<Array>} — preserves the order of the requested slugs */
export async function getProductsBySlugs(slugs = []) {
  return mockRequest(productsSource, {
    params: slugs,
    select: (records, list) =>
      list
        .map((slug) => published(records).find((product) => product.slug === slug))
        .filter(Boolean),
  })
}

/**
 * Related products: same category first, then same collection, excluding self.
 * @returns {Promise<Array>} including an empty array — the UI handles it.
 */
export async function getRelatedProducts(product, limit = 3) {
  return mockRequest(productsSource, {
    params: { product, limit },
    select: (records, { product: current, limit: max } = {}) => {
      if (!current) return []
      const pool = published(records).filter((candidate) => candidate.id !== current.id)
      const score = (candidate) => {
        let value = 0
        if (candidate.category?.slug === current.category?.slug) value += 2
        if (candidate.collection && candidate.collection === current.collection) value += 1
        return value
      }
      return pool
        .filter((candidate) => score(candidate) > 0)
        .sort((a, b) => score(b) - score(a))
        .slice(0, max)
    },
  })
}

/** @returns {Promise<{ average: number, count: number, items: Array }>} */
export async function getReviewsForProduct(slug) {
  return mockRequest(reviewsSource, {
    params: slug,
    select: (records, value) => {
      const items = records
        .filter((review) => review.productSlug === value)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      const count = items.length
      const average = count
        ? Math.round((items.reduce((sum, review) => sum + review.rating, 0) / count) * 10) / 10
        : 0
      return { average, count, items }
    },
  })
}

export default {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsBySlugs,
  getRelatedProducts,
  getReviewsForProduct,
}
