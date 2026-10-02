import { useCallback } from 'react'
import { productsService } from '../services/index.js'
import { useAsync } from './useAsync.js'

/**
 * AAKAR — useProducts
 *
 * Catalogue access for any component that needs products. Products always
 * arrive through the service layer; a component never imports mock data.
 *
 * @param {{ category?: string, collection?: string, search?: string, limit?: number, featured?: boolean }} [filters]
 * @returns {{ products: Array, isLoading: boolean, isError: boolean, isEmpty: boolean, error: Error|null, refetch: Function }}
 */
export function useProducts(filters = {}) {
  const { category, collection, search, limit, featured } = filters

  const loader = useCallback(
    () =>
      featured
        ? productsService.getFeaturedProducts(limit)
        : productsService.getProducts({ category, collection, search, limit }),
    [category, collection, search, limit, featured],
  )

  const { data, ...rest } = useAsync(loader, [category, collection, search, limit, featured])

  return { products: data ?? [], ...rest }
}

export default useProducts
