/**
 * AAKAR — Products
 *
 * The canonical mock catalogue. Shapes mirror the future backend response
 * (see PRD §34 Core Mock Product Schema) so the UI never changes when the
 * data source is swapped.
 *
 * NOTE ON PRICING
 * `pricing.amount` is a whole-unit value in the given currency
 * (4999 INR = ₹4,999). Formatting is centralised in utils/format.js, so a
 * future backend returning minor units (paise) is absorbed there.
 *
 * NOTE ON MEDIA
 * `media.*` and `model.previewUrl` are empty until the owner supplies assets —
 * see mock/README.md. Empty values are rendered as designed plates, never as
 * broken images, and the 3D viewer falls back gracefully.
 */

const categoriesById = {
  characters: { id: 'cat_characters', name: 'Characters', slug: 'characters' },
  creatures: { id: 'cat_creatures', name: 'Creatures', slug: 'creatures' },
  weapons: { id: 'cat_weapons', name: 'Weapons', slug: 'weapons' },
  clothing: { id: 'cat_clothing', name: 'Clothing', slug: 'clothing' },
  props: { id: 'cat_props', name: 'Props', slug: 'props' },
  sculptures: { id: 'cat_sculptures', name: 'Sculptures', slug: 'sculptures' },
  environments: {
    id: 'cat_environments',
    name: 'Environments',
    slug: 'environments',
  },
}

const products = [
  {
    id: 'prod_001',
    name: 'Samurai Beast',
    slug: 'samurai-beast',
    description:
      'Premium production-ready 3D character asset. A lacquered-armour beast warrior delivered fully rigged, retopologised and textured for real-time hero use.',
    category: categoriesById.characters,
    pricing: { amount: 4999, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#2B2F3A', '#171A22'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['FBX', 'OBJ', 'GLB'],
      fileSizeMb: 412,
      version: '1.1',
      animated: false,
    },
    specifications: {
      polygonCount: 85000,
      textureResolution: '4K',
      rigged: true,
      animated: false,
      uvMapped: true,
      pbr: true,
      compatibility: ['Blender 4.2', 'Unreal Engine 5.4', 'Unity 6', 'Maya 2024'],
    },
    license: { type: 'commercial' },
    collection: 'obsidian-armoury',
    featured: true,
    status: 'published',
    tags: ['3d', 'character', 'pbr', 'game-ready', 'rigged'],
    createdAt: '2026-01-01',
    updatedAt: '2026-02-14',
  },
  {
    id: 'prod_002',
    name: 'Ember Drake',
    slug: 'ember-drake',
    description:
      'A full-body creature asset with saddle rig, wing deformation and an eight-clip animation set covering flight, landing and idle aggression.',
    category: categoriesById.creatures,
    pricing: { amount: 6499, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#3A2418', '#120C09'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['FBX', 'GLB', 'USDZ'],
      fileSizeMb: 638,
      version: '2.0',
      animated: true,
    },
    specifications: {
      polygonCount: 142000,
      textureResolution: '4K',
      rigged: true,
      animated: true,
      uvMapped: true,
      pbr: true,
      compatibility: ['Unreal Engine 5.4', 'Unity 6', 'Houdini 20'],
    },
    license: { type: 'commercial' },
    collection: 'obsidian-armoury',
    featured: true,
    status: 'published',
    tags: ['3d', 'creature', 'pbr', 'rigged', 'animated'],
    createdAt: '2026-01-08',
    updatedAt: '2026-02-20',
  },
  {
    id: 'prod_003',
    name: 'Voidcleaver Greatsword',
    slug: 'voidcleaver-greatsword',
    description:
      'Hard-surface hero weapon at 24.5k triangles. Separated blade, guard and hilt meshes with trim-sheet materials for fast recolouring.',
    category: categoriesById.weapons,
    pricing: { amount: 1899, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#1B1E26', '#4A5160'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['FBX', 'OBJ', 'GLB'],
      fileSizeMb: 96,
      version: '1.0',
      animated: false,
    },
    specifications: {
      polygonCount: 24500,
      textureResolution: '4K',
      rigged: false,
      animated: false,
      uvMapped: true,
      pbr: true,
      compatibility: ['Blender 4.2', 'Unreal Engine 5.4', 'Unity 6'],
    },
    license: { type: 'commercial' },
    collection: 'obsidian-armoury',
    featured: false,
    status: 'published',
    tags: ['3d', 'weapon', 'hard-surface', 'pbr', 'game-ready'],
    createdAt: '2026-01-15',
    updatedAt: '2026-01-15',
  },
  {
    id: 'prod_004',
    name: 'Indigo Kimono Set',
    slug: 'indigo-kimono-set',
    description:
      'Three-layer garment assembly with sub-mesh construction, cloth-sim ready topology and indigo shibori detailing across 2K texture sets.',
    category: categoriesById.clothing,
    pricing: { amount: 2499, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#1B2A6B', '#0C1330'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['FBX', 'OBJ', 'GLB'],
      fileSizeMb: 184,
      version: '1.2',
      animated: false,
    },
    specifications: {
      polygonCount: 38000,
      textureResolution: '2K',
      rigged: false,
      animated: false,
      uvMapped: true,
      pbr: true,
      compatibility: ['Clo 3D', 'Marvelous Designer', 'Blender 4.2', 'Unreal Engine 5.4'],
    },
    license: { type: 'commercial' },
    collection: 'form-and-fabric',
    featured: true,
    status: 'published',
    tags: ['3d', 'clothing', 'cloth-sim', 'pbr'],
    createdAt: '2026-01-22',
    updatedAt: '2026-02-02',
  },
  {
    id: 'prod_005',
    name: 'Atelier Desk Set',
    slug: 'atelier-desk-set',
    description:
      'Nine-piece studio props kit — drafting tools, calipers, reference sheets and a workbench lamp, all sharing one trim atlas.',
    category: categoriesById.props,
    pricing: { amount: 1499, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#2A2A2C', '#6B6B70'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['FBX', 'GLB'],
      fileSizeMb: 72,
      version: '1.0',
      animated: false,
    },
    specifications: {
      polygonCount: 18200,
      textureResolution: '2K',
      rigged: false,
      animated: false,
      uvMapped: true,
      pbr: true,
      compatibility: ['Blender 4.2', 'Unreal Engine 5.4', 'Cinema 4D 2025'],
    },
    license: { type: 'commercial' },
    collection: 'form-and-fabric',
    featured: false,
    status: 'published',
    tags: ['3d', 'props', 'kitbash', 'pbr', 'game-ready'],
    createdAt: '2026-02-01',
    updatedAt: '2026-02-01',
  },
  {
    id: 'prod_006',
    name: 'Monsoon Courtyard',
    slug: 'monsoon-courtyard',
    description:
      'A modular courtyard environment — 46 meshes, wet-surface shader set, volumetric rain and a five-preset lighting library for golden hour through night.',
    category: categoriesById.environments,
    pricing: { amount: 8999, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#0E1A22', '#20323C'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['GLB', 'USDZ', 'FBX'],
      fileSizeMb: 1240,
      version: '1.3',
      animated: true,
    },
    specifications: {
      polygonCount: 320000,
      textureResolution: '4K',
      rigged: false,
      animated: true,
      uvMapped: true,
      pbr: true,
      compatibility: ['Unreal Engine 5.4', 'Unity 6', 'Blender 4.2'],
    },
    license: { type: 'extended' },
    collection: 'terrain-and-light',
    featured: true,
    status: 'published',
    tags: ['3d', 'environment', 'modular', 'pbr', 'animated'],
    createdAt: '2026-02-06',
    updatedAt: '2026-02-28',
  },
  {
    id: 'prod_007',
    name: 'Terra Cotta Figure 01',
    slug: 'terra-cotta-figure-01',
    description:
      'High-density digital sculpture from the studio archive. Exhibition-ready at 210k polygons with a print-tested watertight shell.',
    category: categoriesById.sculptures,
    pricing: { amount: 3299, currency: 'INR' },
    media: {
      thumbnail: '',
      hero: '',
      gallery: [],
      palette: ['#4A2E1E', '#241609'],
    },
    model: {
      previewUrl: '',
      poster: '',
      formats: ['OBJ', 'STL', 'GLB'],
      fileSizeMb: 526,
      version: '1.0',
      animated: false,
    },
    specifications: {
      polygonCount: 210000,
      textureResolution: '8K',
      rigged: false,
      animated: false,
      uvMapped: false,
      pbr: true,
      compatibility: ['ZBrush 2025', 'Blender 4.2', 'Keyshot 2025'],
    },
    license: { type: 'personal' },
    collection: 'terrain-and-light',
    featured: false,
    status: 'published',
    tags: ['3d', 'sculpture', 'print-ready', 'archive'],
    createdAt: '2026-02-12',
    updatedAt: '2026-02-12',
  },
]

export default products
