/**
 * AAKAR — Categories
 *
 * Top-level catalogue taxonomy. `productCount` is derived by the service layer
 * (see services/mock/categories.service.js) so it can never drift from the
 * product records — it is intentionally NOT stored here.
 *
 * Consumers: useCategories() → categories.service.js
 */

const categories = [
  {
    id: 'cat_characters',
    name: 'Characters',
    slug: 'characters',
    description:
      'Rigged, game-ready humanoids and stylised figures built for production pipelines.',
    order: 1,
  },
  {
    id: 'cat_creatures',
    name: 'Creatures',
    slug: 'creatures',
    description:
      'Anatomical beasts and oddities — sculpted, retopologised and texture-complete.',
    order: 2,
  },
  {
    id: 'cat_weapons',
    name: 'Weapons',
    slug: 'weapons',
    description:
      'Hard-surface blades, arms and ordnance with clean topology and PBR materials.',
    order: 3,
  },
  {
    id: 'cat_clothing',
    name: 'Clothing',
    slug: 'clothing',
    description:
      'Simulation-ready garments, layered sets and draped cloth assemblies.',
    order: 4,
  },
  {
    id: 'cat_props',
    name: 'Props',
    slug: 'props',
    description:
      'Set dressing and hero props ranging from furniture to instrument-grade detail.',
    order: 5,
  },
  {
    id: 'cat_sculptures',
    name: 'Sculptures',
    slug: 'sculptures',
    description:
      'High-density digital sculpture — printable, renderable and exhibition grade.',
    order: 6,
  },
  {
    id: 'cat_environments',
    name: 'Environments',
    slug: 'environments',
    description:
      'Complete modular worlds with lighting, atmosphere and material libraries.',
    order: 7,
  },
]

export default categories
