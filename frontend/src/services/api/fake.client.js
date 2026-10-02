/**
 * AAKAR — Mock transport
 *
 * Emulates an asynchronous data source so services written against it are
 * already promise-shaped. When VITE_DATA_SOURCE=api, services swap to
 * services/api/client.js and nothing above the service layer changes.
 *
 * It clones every payload: records can never be mutated by a component
 * through a shared reference, which mirrors real network behaviour.
 */

import { env } from '../../utils/env.js'

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

function toPlainValue(value) {
  if (value === undefined) return undefined
  if (typeof structuredClone === 'function') return structuredClone(value)
  return JSON.parse(JSON.stringify(value))
}

/**
 * Execute a resolver against a record set as if it came back over the wire.
 *
 * @param {*} source           record set (array | object)
 * @param {Object} [options]
 * @param {*} [options.params] passed through to the resolver
 * @param {(source: *, params: *) => *} [options.select] projection/query step
 * @param {string} [options.notFoundMessage] message used when the resolver
 *        signals a miss by returning undefined
 * @returns {Promise<*>}
 */
export async function mockRequest(source, options = {}) {
  const { params, select, notFoundMessage } = options

  const payload = toPlainValue(source)
  const result = typeof select === 'function' ? select(payload, params) : payload

  if (env.mockLatency > 0) await wait(env.mockLatency)

  if (result === undefined && notFoundMessage) {
    const error = new Error(notFoundMessage)
    error.name = 'NotFoundError'
    error.status = 404
    throw error
  }

  return result
}

export const fakeClient = {
  name: 'mock',
  get: mockRequest,
}

export default fakeClient
