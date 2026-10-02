/**
 * AAKAR — Service registry
 *
 * The single switch between data sources. Hooks import from here and never
 * know whether records arrive from mock data or an HTTP backend:
 *
 *   UI  →  hooks  →  services/index.js  →  services/mock/*  →  mock/data/*
 *                                     ↘  services/api/*   →  backend
 *
 * To go live: set VITE_API_URL and VITE_DATA_SOURCE=api in .env.local, then
 * add the sibling `services/api/<domain>.service.js` implementations with the
 * same function signatures. No hook or component needs to change.
 */

import { env } from '../utils/env.js'

import * as mockProducts from './mock/products.service.js'
import * as mockCategories from './mock/categories.service.js'
import * as mockCollections from './mock/collections.service.js'
import * as mockArtist from './mock/artist.service.js'

const sources = {
  mock: {
    products: mockProducts,
    categories: mockCategories,
    collections: mockCollections,
    artist: mockArtist,
  },
  // Populated in the backend phase:
  // api: { products: apiProducts, categories: apiCategories, ... },
}

function resolveSource() {
  const requested = env.dataSource
  const source = sources[requested]

  if (!source) {
    if (env.isDev) {
      console.warn(
        `[AAKAR] Data source "${requested}" is not implemented. Falling back to "mock".`,
      )
    }
    return { name: 'mock', source: sources.mock }
  }

  return { name: requested, source }
}

const { name: activeSourceName, source: activeSourceImpl } = resolveSource()

export const productsService = activeSourceImpl.products
export const categoriesService = activeSourceImpl.categories
export const collectionsService = activeSourceImpl.collections
export const artistService = activeSourceImpl.artist

/** Which data source is live — surfaced in the dev footer. */
export const activeSource = activeSourceName

export default {
  products: productsService,
  categories: categoriesService,
  collections: collectionsService,
  artist: artistService,
  activeSource,
}
