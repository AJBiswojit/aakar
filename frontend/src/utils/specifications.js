/**
 * AAKAR — Specification descriptors
 *
 * Turns a product's `specifications` object into the technical metadata shown
 * across the catalogue. Only data that actually exists is rendered — a badge is
 * never invented (PRD: "Only show verified data").
 */

import { formatPolygonCount, formatFileSize } from './format.js'

/**
 * Short technical badges, derived strictly from stored specifications.
 * @returns {Array<{ id: string, label: string }>}
 */
export function getSpecBadges(specifications = {}) {
  const badges = []

  if (specifications.pbr) badges.push({ id: 'pbr', label: 'PBR' })
  if (specifications.uvMapped) badges.push({ id: 'uv', label: 'UV' })
  if (specifications.textureResolution) {
    badges.push({ id: 'texture', label: specifications.textureResolution })
  }
  if (specifications.rigged) badges.push({ id: 'rigged', label: 'Rigged' })
  if (specifications.animated) badges.push({ id: 'animated', label: 'Animated' })

  return badges
}

/**
 * Full specification table rows for the product page.
 * @returns {Array<{ id: string, label: string, value: string }>}
 */
export function getSpecificationRows(product) {
  const specifications = product?.specifications
  if (!specifications) return []

  const rows = [
    {
      id: 'polygons',
      label: 'Polygon Count',
      value:
        specifications.polygonCount != null
          ? `${formatPolygonCount(specifications.polygonCount)} tris`
          : null,
    },
    { id: 'textures', label: 'Texture Resolution', value: specifications.textureResolution },
    { id: 'uv', label: 'UV Mapped', value: yesNo(specifications.uvMapped) },
    { id: 'pbr', label: 'PBR Materials', value: yesNo(specifications.pbr) },
    { id: 'rigged', label: 'Rigged', value: yesNo(specifications.rigged) },
    { id: 'animated', label: 'Animated', value: yesNo(specifications.animated) },
    {
      id: 'formats',
      label: 'Formats',
      value: product?.model?.formats?.length ? product.model.formats.join(' · ') : null,
    },
    {
      id: 'size',
      label: 'File Size',
      value: product?.model?.fileSizeMb ? formatFileSize(product.model.fileSizeMb) : null,
    },
    {
      id: 'version',
      label: 'Version',
      value: product?.model?.version ? `v${product.model.version}` : null,
    },
  ]

  return rows.filter((row) => row.value != null && row.value !== '')
}

function yesNo(value) {
  if (value === true) return 'Yes'
  if (value === false) return 'No'
  return null
}
