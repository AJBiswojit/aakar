/**
 * AAKAR — Formatting helpers
 *
 * Presentation-only transforms. All currency/number formatting lives here so a
 * future backend change (e.g. minor currency units) is absorbed in one place.
 */

const currencyCache = new Map()

function getCurrencyFormatter(currency) {
  if (!currencyCache.has(currency)) {
    currencyCache.set(
      currency,
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }),
    )
  }
  return currencyCache.get(currency)
}

/**
 * Format a pricing object ({ amount, currency }) for display.
 * @returns {string} e.g. "₹4,999"
 */
export function formatPrice(pricing) {
  if (!pricing || typeof pricing.amount !== 'number') return 'Price on request'
  return getCurrencyFormatter(pricing.currency || 'INR').format(pricing.amount)
}

/** Thousands-separated integer, e.g. 85000 → "85,000" */
export function formatNumber(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  return new Intl.NumberFormat('en-IN').format(value)
}

/** Polygon counts are shown both raw and abbreviated, e.g. "85,000 / 85K" */
export function formatPolygonCount(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—'
  if (value < 1000) return formatNumber(value)
  const abbreviated =
    value >= 1000000
      ? `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}M`
      : `${Math.round(value / 1000)}K`
  return abbreviated
}

/** File sizes, e.g. 412 → "412 MB" */
export function formatFileSize(megabytes) {
  if (typeof megabytes !== 'number' || Number.isNaN(megabytes)) return '—'
  if (megabytes >= 1024) return `${(megabytes / 1024).toFixed(1).replace(/\.0$/, '')} GB`
  return `${megabytes} MB`
}

/** ISO date → "12 Feb 2026" */
export function formatDate(iso) {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

/** ISO date → "2026" */
export function formatYear(iso) {
  if (!iso) return '—'
  const year = new Date(iso).getFullYear()
  return Number.isNaN(year) ? '—' : String(year)
}

/** "obsidian-armoury" → "Obsidian Armoury" */
export function titleFromSlug(slug = '') {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
