/**
 * AAKAR — Environment access
 *
 * The single place in the app that touches `import.meta.env`. Everything else
 * (services, hooks, components) reads this typed object, which keeps Vite
 * specifics out of the application layer.
 */

const raw = import.meta.env || {}

export const env = Object.freeze({
  /** Which implementation the service layer resolves: 'mock' | 'api' */
  dataSource: String(raw.VITE_DATA_SOURCE || 'mock').toLowerCase(),

  /** Base URL of the future backend. Empty while running on mock data. */
  apiUrl: String(raw.VITE_API_URL || '').replace(/\/+$/, ''),

  /** Simulated latency (ms) for mock services — useful for loading states. */
  mockLatency: Number(raw.VITE_MOCK_LATENCY || 0) || 0,

  isDev: Boolean(raw.DEV),
  mode: raw.MODE || 'development',
})

export default env
