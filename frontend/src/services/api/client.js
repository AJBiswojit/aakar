/**
 * AAKAR — HTTP client foundation
 *
 * This is the seam the whole frontend depends on. Today it is unused
 * (VITE_DATA_SOURCE=mock); the moment the backend exists, the mock services are
 * swapped for calls through this client and no hook or component changes.
 *
 * It is intentionally thin — one request function, one error type, no
 * interceptors, no caching, no retry logic until a real backend needs them.
 */

import { env } from '../../utils/env.js'

export class ApiError extends Error {
  constructor(message, { status = 0, path = '', payload = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.path = path
    this.payload = payload
  }
}

/**
 * Perform a JSON request against the configured API base URL.
 *
 * @param {string} path
 * @param {Object} [options]
 * @param {'GET'|'POST'|'PUT'|'PATCH'|'DELETE'} [options.method]
 * @param {*} [options.body]
 * @param {Object} [options.headers]
 * @param {AbortSignal} [options.signal]
 * @param {Object} [options.query] appended as a search string
 * @returns {Promise<*>} the parsed JSON body
 */
export async function request(path, options = {}) {
  const { method = 'GET', body, headers = {}, signal, query } = options

  if (!env.apiUrl) {
    throw new ApiError(
      'API base URL is not configured. Set VITE_API_URL or keep VITE_DATA_SOURCE=mock.',
      { path },
    )
  }

  const url = new URL(`${env.apiUrl}${path}`)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value))
      }
    })
  }

  let response
  try {
    response = await fetch(url.toString(), {
      method,
      signal,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  } catch (cause) {
    if (cause?.name === 'AbortError') throw cause
    throw new ApiError('Network request failed.', { path, payload: cause })
  }

  const payload = await parseBody(response)

  if (!response.ok) {
    throw new ApiError(payload?.message || `Request failed with ${response.status}.`, {
      status: response.status,
      path,
      payload,
    })
  }

  return payload
}

async function parseBody(response) {
  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return null
  try {
    return await response.json()
  } catch {
    return null
  }
}

export const apiClient = {
  name: 'api',
  get: (path, options) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
}

export default apiClient
