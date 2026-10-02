/**
 * AAKAR — Collections
 *
 * Curated groupings of products, released as seasonal chapters of the atelier.
 * Products reference a collection by slug (`product.collection`); the service
 * layer resolves the relationship so neither record has to know the other.
 */

const collections = [
  {
    id: 'col_obsidian_armoury',
    name: 'The Obsidian Armoury',
    slug: 'obsidian-armoury',
    subtitle: 'Chapter I',
    year: 2026,
    description:
      'Armoured bodies and the blades they carry. A study in lacquer, soot and cobalt light.',
    productSlugs: ['samurai-beast', 'ember-drake', 'voidcleaver-greatsword'],
    cover: '',
    status: 'published',
  },
  {
    id: 'col_form_fabric',
    name: 'Form & Fabric',
    slug: 'form-and-fabric',
    subtitle: 'Chapter II',
    year: 2026,
    description:
      'Cloth, drape and the everyday objects of the studio — detail carried to the thread.',
    productSlugs: ['indigo-kimono-set', 'atelier-desk-set'],
    cover: '',
    status: 'published',
  },
  {
    id: 'col_terrain_light',
    name: 'Terrain & Light',
    slug: 'terrain-and-light',
    subtitle: 'Chapter III',
    year: 2026,
    description:
      'Atmosphere, weather and mass. Environments and archive sculpture at exhibition density.',
    productSlugs: ['monsoon-courtyard', 'terra-cotta-figure-01'],
    cover: '',
    status: 'published',
  },
]

export default collections
