/**
 * AAKAR — 3D constants
 *
 * Values that must match the design system exactly. Kept as literals because
 * WebGL and three.js cannot read CSS custom properties directly — this is the
 * one place a hex value is allowed to exist outside tokens.css, and it mirrors
 * tokens.css one-for-one.
 */
export const COLORS = Object.freeze({
  obsidian: '#050608',
  black: '#0a0a0b',
  neutral: '#ffffff',
  fill: '#f4f6f8',
  rim: '#4d6fff',
  cobalt: '#1746d8',
  solid: '#14161c',
})

/** Camera framings per context, kept consistent between hero and product page. */
export const CAMERA = Object.freeze({
  hero: { position: [0, 0.15, 5.1], fov: 30, target: [0, 0, 0] },
  product: { position: [0, 0.2, 4.2], fov: 32, target: [0, 0, 0] },
})

/** Renderer budgets. The device capability layer decides what is mounted. */
export const DPR_RANGE = [1, 1.75]
