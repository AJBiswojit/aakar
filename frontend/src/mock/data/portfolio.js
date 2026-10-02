/**
 * AAKAR — Portfolio (Selected Work)
 *
 * Portfolio work is deliberately separate from products (PRD §16). A work is
 * exhibited, not sold — it may have no price, no formats and no licence.
 *
 * Consumed through the artist service: getPortfolio() / getFeaturedWork().
 */

const work = [
  {
    id: 'work_001',
    title: 'Samurai Beast',
    slug: 'samurai-beast',
    category: 'Character',
    discipline: 'Sculpt · Retopology · Texturing',
    year: 2026,
    status: 'Released',
    client: 'Studio commission → catalogue',
    excerpt:
      'A lacquered beast warrior built from a 2.1cm maquette scan. Every plate was sculpted, re-panelled and re-lit before retopology.',
    hero: '',
    palette: ['#252A36', '#12141A'],
  },
  {
    id: 'work_002',
    title: 'Ember Drake',
    slug: 'ember-drake',
    category: 'Creature',
    discipline: 'Anatomy · Rig · Animation',
    year: 2025,
    status: 'Released',
    client: 'Original IP',
    excerpt:
      'Anatomy study turned production creature: 142k triangles, an eight-clip flight set and a saddle rig that survives extreme deformation.',
    hero: '',
    palette: ['#3A2418', '#100B08'],
  },
  {
    id: 'work_003',
    title: 'Monsoon Courtyard',
    slug: 'monsoon-courtyard',
    category: 'Environment',
    discipline: 'Look Dev · Modular Kit · Lighting',
    year: 2025,
    status: 'Released',
    client: 'Architectural visualisation',
    excerpt:
      'Sixty metres of courtyard rebuilt modularly, then soaked in monsoon: wet-surface shaders, rain volumetrics and five lighting presets.',
    hero: '',
    palette: ['#0D1A22', '#1C2C36'],
  },
  {
    id: 'work_004',
    title: 'Terra Cotta Archive',
    slug: 'terra-cotta-archive',
    category: 'Sculpture',
    discipline: 'Digital Sculpture · Print Preparation',
    year: 2024,
    status: 'Archive',
    client: 'Private collection',
    excerpt:
      'Buried forms excavated digitally. Printed at 1:8, then re-scanned to preserve the surface loss that makes the original readable.',
    hero: '',
    palette: ['#4A2E1E', '#1E1208'],
  },
  {
    id: 'work_005',
    title: 'Indigo Drape Studies',
    slug: 'indigo-drape-studies',
    category: 'Cloth',
    discipline: 'Simulation · Material Study',
    year: 2024,
    status: 'Archive',
    client: 'Textile house',
    excerpt:
      'Forty drape solves across three fabric weights, charted as a reference library for a shibori-dyed capsule collection.',
    hero: '',
    palette: ['#1B2A6B', '#0A0F26'],
  },
]

export default work
