/**
 * AAKAR — Reviews
 *
 * Customer reviews, keyed to a product by slug. Aggregates (rating average,
 * count) are computed in the service layer so they can never contradict the
 * records below.
 */

const reviews = [
  {
    id: 'rev_001',
    productSlug: 'samurai-beast',
    author: 'Wei Lin',
    role: 'Lead Character Artist, Northgate Interactive',
    rating: 5,
    title: 'Arrived production-ready',
    body: 'Retopology is exactly as advertised — edge flow holds up through every deformation test we ran. Materials dropped into Unreal with no fixes.',
    createdAt: '2026-02-03',
    verified: true,
  },
  {
    id: 'rev_002',
    productSlug: 'samurai-beast',
    author: 'Marta Ferreira',
    role: 'Freelance 3D Artist',
    rating: 5,
    title: 'The UVs alone are worth it',
    body: 'Straight, even texel density across the armour panels. I have bought assets at three times this price with a quarter of the care.',
    createdAt: '2026-02-18',
    verified: true,
  },
  {
    id: 'rev_003',
    productSlug: 'ember-drake',
    author: 'Daniel Okoye',
    role: 'Animation Director, Tidewell Studio',
    rating: 5,
    title: 'The flight set is genuinely usable',
    body: 'Wing deformation survives extreme poses without collapsing. We used four of the eight clips untouched in a broadcast spot.',
    createdAt: '2026-02-24',
    verified: true,
  },
  {
    id: 'rev_004',
    productSlug: 'monsoon-courtyard',
    author: 'Priya Raghavan',
    role: 'Environment Lead, Meridian VFX',
    rating: 4,
    title: 'Beautiful lighting library',
    body: 'The five presets landed the mood in an afternoon. One shader needed rebuilding for our pipeline, and support answered within a day.',
    createdAt: '2026-03-01',
    verified: true,
  },
  {
    id: 'rev_005',
    productSlug: 'voidcleaver-greatsword',
    author: 'Sven Halvorsen',
    role: 'Indie Developer',
    rating: 5,
    title: 'Perfect for a hero weapon slot',
    body: '24k triangles, trim sheet included, recoloured in ten minutes. Exactly the budget I needed for a first-person hero prop.',
    createdAt: '2026-02-11',
    verified: false,
  },
]

export default reviews
