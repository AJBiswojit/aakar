import { useCallback } from 'react'
import { artistService } from '../services/index.js'
import { useAsync } from './useAsync.js'

/**
 * AAKAR — useArtist
 *
 * The single studio profile plus its selected work. There is one artist in this
 * system, so this hook returns an object — never a collection of sellers.
 *
 * @returns {{ artist: Object|null, portfolio: Array, isLoading, isError, error, refetch }}
 */
export function useArtist() {
  const loader = useCallback(async () => {
    const [artist, portfolio] = await Promise.all([
      artistService.getArtist(),
      artistService.getPortfolio(),
    ])
    return { artist, portfolio }
  }, [])

  const { data, ...rest } = useAsync(loader, [])

  return {
    artist: data?.artist ?? null,
    portfolio: data?.portfolio ?? [],
    ...rest,
  }
}

export default useArtist
