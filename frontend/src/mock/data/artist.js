/**
 * AAKAR — Artist / Studio
 *
 * Single owner. There is one artist profile in this system — no vendor,
 * seller or multi-tenant concept exists anywhere in the data model.
 */

const artist = {
  id: 'artist_001',
  name: 'Arjun Biswojit',
  studioName: 'AAKAR',
  role: '3D Artist · Studio Owner',
  tagline: 'Form. Craft. Digital.',
  location: 'Kolkata, India',
  founded: 2016,
  timezone: 'IST (UTC+5:30)',
  email: 'studio@aakar.art',
  phone: '',
  availability: {
    status: 'open',
    label: 'Taking commissions for Q3 2026',
    nextSlot: '2026-07-01',
  },
  statement:
    'I build digital objects that survive close inspection. Every asset that leaves this atelier has been sculpted, retopologised, unwrapped and lit by hand, then examined at one hundred percent until nothing soft remains.',
  bio: [
    'AAKAR began as a sculpture practice and became a 3D studio. The name means form — the moment material takes shape — and it is still the only brief I work to.',
    'I work alone, deliberately. One artist means one standard: no hand-offs, no drift between the sample and the delivery, and a straight line between the reference wall and your pipeline.',
  ],
  philosophy: [
    {
      id: 'phil_form',
      title: 'Form before finish',
      body: 'Silhouette carries a model further than any texture map. Form is resolved in grey before a single material is authored.',
    },
    {
      id: 'phil_precision',
      title: 'Precision is the craft',
      body: 'Clean topology, honest UVs, predictable pivots. An asset should behave the way the next artist expects it to.',
    },
    {
      id: 'phil_restraint',
      title: 'Restraint reads as quality',
      body: 'Nothing is added to impress. Detail is spent where the eye actually travels.',
    },
  ],
  disciplines: [
    'Character Art',
    'Creature Design',
    'Hard-Surface',
    'Environment Art',
    'Digital Sculpture',
    'Look Development',
  ],
  tools: ['Blender', 'ZBrush', 'Substance Painter', 'Marvelous Designer', 'Houdini', 'Unreal Engine'],
  services: [
    {
      id: 'svc_commission',
      title: 'Character & Creature Art',
      body: 'Concept to render-ready assets for games, film and visualisation. Sculpt, retopology, UVs, textures and rig handover.',
    },
    {
      id: 'svc_environment',
      title: 'Environment & Look Dev',
      body: 'Modular environment kits with material libraries and lighting presets, staged for real-time or offline rendering.',
    },
    {
      id: 'svc_sculpture',
      title: 'Digital Sculpture',
      body: 'Exhibition and print-grade sculpture with watertight shells, print preparation and archival presentation stills.',
    },
    {
      id: 'svc_consult',
      title: 'Pipeline Consultation',
      body: 'Audits of existing art pipelines: topology standards, naming conventions, texture budgets and asset handover.',
    },
  ],
  timeline: [
    { year: 2016, label: 'Atelier founded', note: 'First commissioned creature sculpt.' },
    { year: 2019, label: 'Going solo', note: 'Left studio work to build AAKAR full-time.' },
    { year: 2022, label: 'Realtime focus', note: 'Shifted the catalogue to game-ready PBR assets.' },
    { year: 2026, label: 'The catalogue opens', note: 'Digital store and commission intake launch.' },
  ],
  stats: [
    { id: 'stat_years', value: '10', label: 'Years in practice' },
    { id: 'stat_assets', value: '240+', label: 'Assets delivered' },
    { id: 'stat_studios', value: '38', label: 'Studios served' },
  ],
  socials: [
    { id: 'social_instagram', label: 'Instagram', handle: '@aakar.atelier', url: '' },
    { id: 'social_artstation', label: 'ArtStation', handle: 'aakar', url: '' },
    { id: 'social_behance', label: 'Behance', handle: 'aakar', url: '' },
    { id: 'social_linkedin', label: 'LinkedIn', handle: 'aakar-studio', url: '' },
  ],
  studioImages: [],
}

export default artist
