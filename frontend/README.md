# AAKAR — frontend

The AAKAR application: a premium digital 3D atelier built with **React + Vite +
JavaScript**. No TypeScript, no UI framework, no state-management library — the
visual system and the architecture are the product.

---

## Commands

```bash
npm install
npm run dev        # dev server on 0.0.0.0:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `VITE_DATA_SOURCE` | `mock` (default) or `api` |
| `VITE_API_URL` | Backend base URL — unused while on mock data |
| `VITE_MOCK_LATENCY` | Simulated latency in ms, for exercising loading states |
| `VITE_HMR_CLIENT_PORT` | Set when a hosted preview proxies the dev server over https |

---

## Architecture

### Data flows one way

```
UI (components, pages)
   ↓  hooks/                 useProducts, useProduct, useCategories, useArtist
   ↓  services/index.js      the single switch between data sources
   ↓  services/mock/*        or services/api/*
   ↓  mock/data/*            or the backend
```

**Rules that hold the architecture together**

1. No component imports from `mock/`. Ever. Data arrives through a hook.
2. Hooks never know where data comes from — they call a service.
3. `services/index.js` is the only place that decides mock vs API.
4. Every service is promise-shaped already, so switching to HTTP changes
   nothing above it.

Going live is therefore: add `services/api/<domain>.service.js` with the same
signatures, set `VITE_DATA_SOURCE=api`, and delete nothing else.

### Design system

`styles/tokens.css` is the single source of truth: colour, type scale, spacing,
radius, motion, layout, elevation. Components consume semantic variables
(`--surface`, `--on-surface`, `--hairline`, `--accent`) which are re-bound per
section by `data-theme="light" | "dark"`.

```
WHITE  = INFORMATION    60%   surfaces, commerce, forms, specs
BLACK  = IMMERSION      30%   hero, exhibit, storytelling, footer
COBALT = INTERACTION    10%   CTA, active state, focus, hairlines, 3D accent
```

The only literal colour values outside `tokens.css` are the WebGL constants in
`components/3d/constants.js`, which mirror the tokens one-for-one because three.js
cannot read CSS variables.

### Surfaces and the navbar

A section declares its surface and what the navigation should do while it is
underneath:

```jsx
<section data-theme="dark" data-nav-theme="dark">…</section>
```

`useNavTheme` watches which section occupies the top of the viewport and the
navbar switches between the two presentations. It never needs to know the route.

### 3D

```
components/3d/
├── Scene.jsx            canvas, grid, loading and context-loss fallbacks
├── Lighting.jsx         the studio rig (key, fill, rim, cobalt accent)
├── CameraRig.jsx        "The Orbit" — damped pointer/scroll response
├── ModelViewer.jsx      GLB/GLTF loading through model.previewUrl
├── ModelBoundary.jsx    a broken asset degrades, it never breaks the scene
├── ModelFallback.jsx    designed 2D plate (no WebGL, mobile, reduced motion)
├── PlaceholderForm.jsx  procedural exhibit used until real models exist
└── constants.js         camera framings, DPR budget, colour mirrors
```

Performance contract:

- `Scene.jsx` is imported **dynamically** (`hero/HeroStage.jsx`), so three.js,
  fiber and drei ship in their own chunk and are only downloaded by visitors who
  actually get a 3D experience — the responsive/mobile path never fetches them.
- The device probe (`hooks/useDeviceCapability.js`) runs before the first render,
  so an unsupported device never starts the download at all.
- `prefers-reduced-motion`, `prefers-reduced-data`, small screens, missing WebGL
  and lost WebGL contexts all resolve to the 2D plate.

Extension points kept ready, not built: material switching and hotspots operate
on the cloned scene in `ModelViewer.jsx`.

### Motion

GSAP drives scroll-linked movement and Lenis drives smooth scrolling, with Lenis'
rAF loop bound to `gsap.ticker` so they cannot drift. Section reveals are CSS
(`[data-reveal]` + `useReveal`). Everything — CSS and scripted — is switched off
under `prefers-reduced-motion`.

---

## Folder map

```
src/
├── components/   common/ · navigation/ · hero/ · 3d/ · products/ · collection/ · studio/ · ui/
├── pages/        Home · Collection · Product · Studio · About · Contact · Cart · Checkout · Account · NotFound
├── mock/         data/ (records) · assets/ (images, models — awaiting real files)
├── services/     api/ (client + fake transport) · mock/ (per-domain services) · index.js (switch)
├── hooks/        useProducts · useProduct · useCategories · useArtist · useAsync · useApp · useCart · useWishlist · useReveal · useLenis · useNavTheme · useMediaQuery · useDeviceCapability
├── state/        app/ · cart/ · wishlist/
├── routes/       AppRoutes.jsx · navigation.js (single source for nav + routes)
├── styles/       tokens.css · globals.css · animations.css
├── utils/        env · format · specifications · storage · cn
├── App.jsx
└── main.jsx
```

## Conventions

- **Files:** `.jsx` for anything with JSX, `.js` for logic, `.css` beside the
  component that owns it. No `.ts` / `.tsx`.
- **Data in UI:** never hardcoded. Prices, badges, counts and copy come from the
  service layer — `utils/specifications.js` derives badges from stored
  specifications only, so nothing is claimed that the record does not support.
- **Media:** every image goes through `components/ui/Plate.jsx`. An empty media
  field renders a designed plate using the record's own palette — never a broken
  image. Drop real files into `mock/assets/` and point the record at them.
- **Comments:** explain intent and constraints, not syntax.

## Adding a route

1. Add the page under `pages/<Name>/`.
2. Register it in `routes/AppRoutes.jsx` (lazy).
3. If it belongs in navigation, add it to `routes/navigation.js` — the navbar,
   drawer and footer pick it up automatically.
4. Give its top-level section `data-theme` and `data-nav-theme`.

## Accessibility baseline

Keyboard-navigable with a visible cobalt focus ring, skip link, semantic
landmarks, labelled controls, `aria-modal` overlays that close on Escape, and alt
text on every plate. 3D is decorative to assistive technology: the meaning
always exists in text alongside the canvas.
