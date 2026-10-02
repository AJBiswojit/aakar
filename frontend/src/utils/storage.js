/**
 * AAKAR — Storage helpers
 *
 * Thin, failure-tolerant wrapper around localStorage. Private-mode browsers,
 * disabled storage and quota errors must never break the UI, so every call is
 * guarded and callers always receive a usable value.
 *
 * Persistence stays client-side for now. When accounts exist, cart and wishlist
 * sync to the backend through the service layer instead.
 */

const PREFIX = 'aakar:'

export function readStorage(key, fallback = null) {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(`${PREFIX}${key}`)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStorage(key) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(`${PREFIX}${key}`)
  } catch {
    /* no-op */
  }
}
