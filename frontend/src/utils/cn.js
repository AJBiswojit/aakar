/**
 * AAKAR — class name helper
 *
 * Joins truthy class names. Deliberately tiny: no CSS-in-JS, no utility
 * framework, just predictable composition of static class names.
 */
export function cn(...values) {
  return values.flat().filter(Boolean).join(' ')
}

export default cn
