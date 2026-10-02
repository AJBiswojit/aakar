/**
 * AAKAR — Artist / studio service (mock implementation)
 *
 * Single owner by design: these functions return one profile and its portfolio,
 * never a list of sellers, vendors or studios.
 *
 *   getArtist()            → Artist profile
 *   getPortfolio()         → Work[] (selected work, newest first)
 *   getFeaturedWork(limit?)→ Work[]
 */

import artistSource from '../../mock/data/artist.js'
import portfolioSource from '../../mock/data/portfolio.js'
import { mockRequest } from '../api/fake.client.js'

/** @returns {Promise<Object>} */
export async function getArtist() {
  return mockRequest(artistSource)
}

/** @returns {Promise<Array>} */
export async function getPortfolio() {
  return mockRequest(portfolioSource, {
    select: (records) => [...records].sort((a, b) => b.year - a.year),
  })
}

/** @returns {Promise<Array>} */
export async function getFeaturedWork(limit = 3) {
  return mockRequest(portfolioSource, {
    params: limit,
    select: (records, value) => [...records].sort((a, b) => b.year - a.year).slice(0, value),
  })
}

export default { getArtist, getPortfolio, getFeaturedWork }
