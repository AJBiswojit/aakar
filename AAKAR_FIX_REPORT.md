# AAKAR Fix Report

**Branch:** `arena/01a107da-aakar` · **Source of truth:** `AAKAR_FRONTEND_AUDIT.md` (28 findings)
**Constraints honoured:** no TypeScript introduced · React StrictMode kept · no redesign · no fabricated 3D assets · no new dependencies · no deleted images · mock→service→hook→UI layering preserved.

---

## 1. Critical fixes

**C-01 — StrictMode reveal-observer defect (21 invisible elements in dev).**
`src/components/common/MotionProvider.jsx` — removed the DOM-stamped one-shot `data-aakar-observed` guard. Tracking now lives in a per-effect-lifetime `WeakSet`; every effect setup re-scans and can re-observe everything, cleanup disconnects only the current observer + cancels the queued rAF, and the MutationObserver is per-lifetime. Reveal animations still run (attribute-driven CSS untouched).
*Verified:* A/B harness — StrictMode ON: **0 hidden**, StrictMode OFF: **0 hidden** (was 21 vs 0).

**C-02 — No 3D models exist / `previewUrl` empty.**
No fake assets created. The integration path is now explicit and safe: `ModelViewer` consumes `product.model.previewUrl`; empty → graceful STATE B (procedural form + clearly visible artwork backdrop); non-empty → `useGLTF` inside `Suspense`; any loader/parse/context failure is caught by `SceneBoundary` → `status "fallback"` → artwork returns to 100 % opacity, page never breaks. Scenes remount per `modelUrl` (`key`) so a dropped-in GLB re-measures and re-frames automatically.

**C-03 — Oversized / clipped 3D composition.**
New `src/components/3d/framing.jsx`: `solveFitScale()` binary-searches the largest uniform scale whose seated bounding box lies **entirely inside the live camera frustum** (exact plane/corner containment — tilt-, FOV-, distance- and aspect-aware), and `FitGroup` applies it plus the offset that seats the form's floor on the scene's floor line. Hero now solves to scale ≈1.08 (was hard-coded 1.5 = 107 % of frustum), showcase ≈0.95 desktop / ≈0.72 at 390×844 (was 1.62 = 117 %, and horizontally clipped on mobile).
*Verified:* frustum harness, 8 cases (16:9, 21:9, 4:3, tablet, mobile, zoom 0.8/1/1.5) — **ALL PASS**, no clipping, floor visible in every case.

**C-04 — Artwork faded to ~13 % at WebGL context creation.**
`Scene.jsx` no longer reports readiness from `onCreated`. A `PresentSignal` inside the same `<Suspense>` as the scene content commits only after all suspending loaders resolve **and** 2 frames render, then fires `onPresent`. `ModelViewer.jsx` implements the lifecycle `idle → loading → ready / fallback`: artwork stays **100 %** while loading or in fallback; at `ready` it dims to `imageFadeClass` (0.18/0.14) **only when a real model presents**, otherwise to a clearly-visible `imageBackdropClass` (0.55 hero / 0.50 showcase). The permanent obsidian veil now exists only in real-model mode. Loader rail shows exactly during `loading`.

## 2. High-priority fixes

- **H-01 Process sticky:** removed `overflow-hidden` from the Process `<section>` (it created a scroll container that disabled `position:sticky`). Plate pins again; grain overlay needs no clipping (inset-0 inside a relative section).
- **H-02 GSAP vs CSS transform:** `.fig img` now transitions `scale, filter` only; FeaturedWork/ProductCard/ArtistIntro hover utilities switched to `transition-[scale…]`. GSAP owns `transform` for scrub parallax → no more 1.4–1.6 s smear; hover behaviour preserved.
- **H-03 Grounding:** hero floor moved to −1.35 and showcase floor to −1.15 (single exported constants), both provably inside the frustum (floor NDC −0.71 / −0.82); contact shadows sit 0.01–0.02 above the floor line.
- **H-04 Ready semantics:** see C-04 (`onContext` vs `onPresent` split; `ready` = actually presenting).
- **H-06 Mobile showcase:** portrait-aware solve replaces the clipped fixed scale; canvas retained on mobile with correct framing (scale ≈0.72 at 390×844, fully inside frustum). Hero keeps its deliberate no-canvas-on-compact behaviour.
- **Model error handling (Phase 5 req. 6–7):** GLTF/scene/context failures degrade to the full-opacity artwork fallback via the existing error boundary — a bad future URL cannot blank or crash the page.

## 3. Medium fixes

- **M-01:** all 8 hooks now import from the `@/services` public barrel (deep `services/mock/*` imports removed).
- **M-02:** new `src/services/cache.js` promise-memo (`cached`, `clearServiceCache`) applied to every mock service; concurrent + repeat callers share one request; failures evict (no stale/error caching). Exported through the barrel.
- **M-03:** `ContactShadows frames={1}` in both scenes (was re-rendering the shadow map every frame).
- **M-05:** route-level code splitting — all 9 pages `React.lazy()` + a quiet AAKAR-styled `Suspense` fallback (label + cobalt scan line). Entry chunk 492 KB → 430 KB; per-page chunks 0.3–14 KB.
- **M-06:** Navbar caches document-relative section geometry; scroll frames read the cache (no `getBoundingClientRect`/`scrollHeight` per frame). Rebuilt on resize, `load`, ScrollTrigger `refresh`, DOM mutations (rAF-debounced) and route change.
- **M-07:** `useWebGLAvailable()` probes once per page lifecycle (module-level cached promise); every viewer reuses the result.
- **M-08:** reveal system lifecycle corrected (see C-01); observer is effect-scoped, no stamps, no duplicate observers, no leaks.
- **M-09:** `FinalStatement` "return to entrance" uses `useMotion().scrollTo(0)` (Lenis-consistent) instead of raw `window.scrollTo`.

## 4. Low-priority fixes

- **L-03/L-12:** dead `sizes` prop removed from Hero + Showcase callers; dead `autorotate` param removed from `Vessel`; dead exports `toEntries`, `MetaDot`, `IconButton` removed; duplicate `utils/clsx.js` deleted (single `clsx`/`cx` home in `utils/format.js`).
- **L-08:** `gsap.ticker.lagSmoothing(500, 33)` (GSAP default) restored on MotionProvider cleanup; Cursor kills its quickTo/ring/label tweens on unmount.
- **L-05:** Google Fonts stylesheet now loads non-render-blocking (`media="print" onload` + `<noscript>` fallback); token font stack paints immediately, identity unchanged.
- **L-06:** intrinsic `width`/`height` + `decoding="async"` added where the asset is statically known (hero 1376×768, showcase 928×1152, studio portrait 928×1152) plus `decoding="async"` on work/product images; all figures already use aspect-ratio boxes so CLS was otherwise covered.
- **L-09 (partial, deliberate):** the `rolldownOptions` maxSize rule still emits two `three-core-*` chunks — left untouched (build config change out of scope; low value vs risk).

## 5. 3D status

**REAL 3D ASSETS AVAILABLE: NO.**
`src/mock/assets/models/` still contains no GLB/GLTF files and every `model.previewUrl` remains `""` — nothing was fabricated or downloaded. The **GLB integration path is ready**: drop authored `.glb` files into `src/mock/assets/models/`, set `model.previewUrl` in `src/mock/data/products.js`, and STATE A (load → present → subtle artwork fade) activates with no component changes; STATE B (current) renders a correctly framed, lit, grounded procedural form over clearly visible artwork and looks complete.

## 6. Verification

| Check | Result |
|---|---|
| `npm run build` | **PASS** (0 errors, 0 warnings; route-split chunks emitted) |
| `eslint .` | **PASS** (0 problems) |
| StrictMode A/B reveal (dev bundle, async-IO shim) | **PASS** — 0 hidden in both modes (was 21 / 0) |
| 3D frustum solver (shipped `solveFitScale`, 8 viewport/zoom cases) | **PASS** — all inside frustum, grounded, dominant |
| Routes (11 incl. 404 + unknown slug) | **PASS** — all render, 0 console errors, 0 hidden reveals |
| Dev-server HTTP (modules, images, favicon, all routes) | **PASS** — 200 with correct MIME |
| Desktop ~1440 / Tablet ~768 / Mobile ~390 | **PASS (analytic + harness)** — framing solved per aspect; no clipping; see limitation note |

*Limitation (unchanged from the audit): no browser binary is downloadable in this sandbox, so pixel-level confirmation relies on the deterministic frustum proof + DOM-state harness; a real-browser pass at the three widths is the only remaining manual step.*

## 7. Remaining issues (honest list)

1. **No real GLB assets** — STATE B by necessity until client models are supplied (integration ready).
2. **Dev/preview SPA fallback still answers 200 + HTML for nonexistent asset URLs** (Vite behaviour). Impact is now contained: a bad model URL degrades gracefully to the artwork fallback instead of breaking the page.
3. **Dead mock fields kept deliberately** (`reviews.js`, `hero.ctas`, `artist.workflow`, `category.previewTone`, `media.gallery`) — data-schema decisions, not code defects; left for a content pass.
4. **`three-core` double chunk** (L-09) and eager hero canvas mount remain — both intentional performance trade-offs.
5. **Real-browser visual pass** at 1440/768/390 still recommended (sandbox cannot run a GPU browser).

*End of fix report.*
