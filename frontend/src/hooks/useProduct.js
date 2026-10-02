import { useCallback } from 'react'
import { productsService } from '../services/index.js'
import { useAsync } from './useAsync.js'

/**
 * AAKAR — useProduct
 *
 * A single product by slug, plus its related products and reviews. Used by the
 * product detail page; the hook owns the composition so the page stays layout.
 *
 * @param {string} slug
 * @returns {{ product: Object|null, related: Array, reviews: Object|null, isLoading, isError, isNotFound, error, refetch }}
 */
export function useProduct(slug) {
  const loader = useCallback(async () => {
    const product = await productsService.getProductBySlug(slug)
    const [related, reviews] = await Promise.all([
      productsService.getRelatedProducts(product, 3),
      productsService.getReviewsForProduct(slug),
    ])
    return { product, related, reviews }
  }, [slug])

  const { data, error, ...rest } = useAsync(loader, [slug], { enabled: Boolean(slug) })

  return {
    product: data?.product ?? null,
    related: data?.related ?? [],
    reviews: data?.reviews ?? null,
    isNotFound: error?.name === 'NotFoundError',
    error: error ?? null,
    ...rest,
  }
}

export default useProduct
