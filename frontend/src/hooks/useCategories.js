import { useCallback } from 'react'
import { categoriesService } from '../services/index.js'
import { useAsync } from './useAsync.js'

/**
 * AAKAR — useCategories
 *
 * The catalogue taxonomy with derived product counts.
 * @returns {{ categories: Array, isLoading: boolean, isError: boolean, error: Error|null }}
 */
export function useCategories() {
  const loader = useCallback(() => categoriesService.getCategories(), [])
  const { data, ...rest } = useAsync(loader, [])

  return { categories: data ?? [], ...rest }
}

export default useCategories
