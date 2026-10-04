# AAKAR Frontend Audit Report

**Date:** 2026-10-04 · **Branch:** `arena/01a107da-aakar` (from `7ca78f0`) · **Scope:** `/home/user/aakar/frontend`
**Method:** full source read-through, `npm install`, `npm run build`, `npm run lint`, dev-server HTTP probes, a jsdom-based **dev-mode runtime harness** (React StrictMode ON, browser-faithful async `IntersectionObserver` shim, A/B control run without StrictMode), and an **analytic frustum test** executed with the repo's own `three@0.171.0`.
**Rule observed:** nothing was fixed, moved, renamed, deleted, installed or uninstalled in the project. The only file added is this report.

> **Environment limitation (stated openly):** no browser binary can be downloaded in this sandbox (`storage.googleapis.com`, `cdn.playwright.dev`, `deb.debian.org` all unreachable; only the npm registry works). Real-browser console/network panels were therefore reproduced with (a) a jsdom runtime harness running the actual dev-mode bundle, (b) HTTP probes against the real Vite dev server, and (c) deterministic geometry math for the 3D framing. Every claim below is backed by one of these three, or by direct source evidence with file:line.

---

## 1. Executive Summary

**PROJECT HEALTH: CRITICAL — the homepage is not production-ready.**

The codebase is architecturally *disciplined* (clean service→hook→UI layering, token-driven design system, zero TypeScript, PRD-compliant folder tree, passing build and lint). The breakage is concentrated in **four interacting defects** that together produce exactly the symptoms reported:

1. **There are no 3D models in the project at all.** `src/mock/assets/models/` contains only `.gitkeep`, and all six products set `model.previewUrl: ""`. The `useGLTF` path (`FormMesh.jsx:116-130`) is therefore *never executed*; what the hero and the 3D showcase actually render is a **procedural placeholder lathe "vessel"** (`FormMesh.jsx:12-53`) — an abstract vase, not artwork.
2. **That placeholder is geometrically oversized for its camera.** At scale `1.5` (hero) / `1.62` (showcase) against a `fov 32` camera at `z ≈ 6.4–6.5`, the object occupies **107 % / 117 % of the frustum height** and is clipped top and bottom (NDC y `[-1.31, 1.36]` hero, `[-1.50, 1.49]` showcase); on a 390×844 viewport the showcase object is clipped **horizontally** (NDC x `±1.40`). The gallery floor and contact shadows sit *below* the visible frustum, so the cropped object floats with no ground. This is the "oversized / broken 3D composition".
3. **The real artwork is faded to near-invisibility the instant WebGL initialises.** `Scene` reports `ready` from `onCreated` (GL-context creation), and `ModelViewer` then applies `imageFadeClass` = `opacity-[0.18]` (hero) / `opacity-[0.14]` (showcase) on top of a permanent `bg-obsidian/25` veil. Effective artwork visibility ≈ 13 % / 10 % over a near-black gradient ⇒ the panels read as **blank/black**, while the cropped vase dominates.
4. **A React-StrictMode defect hides 21 homepage elements permanently in development.** `MotionProvider`'s reveal observer marks every element with `data-aakar-observed="1"` on first scan; StrictMode's mount→unmount→mount disconnects the first observer before its (async) callback fires, and the second scan *skips* already-marked elements. Result: **14 `[data-reveal]`, 5 `[data-reveal-line]`, 2 `[data-cobalt-rule]` elements stay at `opacity:0` / clipped forever** in `npm run dev` (A/B proven: identical bundle without `<StrictMode>` → 0 hidden). Affected: FeaturedWork headline+intro, BrandStatement headline+body, Collection headline+intro, store headline, CustomProject body, FinalStatement "Form./Craft./Digital.", cobalt rules.

Secondary but visible: the Process section's sticky plate is **disabled** by `overflow-hidden` on its own section; GSAP scrub parallax fights a 1.4–1.6 s CSS `transform` transition on the same images; and the dev server's SPA fallback answers **200 + HTML** for missing asset URLs, so a missing `.glb` can never 404 during development.

---

## 2. Issue Summary

| Priority | Count |
|---|---:|
| Critical | 4 |
| High | 6 |
| Medium | 9 |
| Low | 9 |
| **Total** | **28** |

---

## 3. Build Status

`npm run build` → **PASS**

- Vite 8.3.2 (rolldown), 2544 modules, `✓ built in 1.66s`, **0 errors, 0 warnings**.
- Output: `dist/` 2.2 MB — JS **1.5 MB** (`index` 492 KB, `three-core` ×2 = 685 KB, `events` 171 KB, `Lighting` 131 KB, `ShowcaseScene` 16 KB, `Scene` 6.6 KB, `HeroScene` 1.5 KB), CSS 50 KB, 6 JPEGs 628 KB.
- `npx eslint .` → **0 problems**.
- `npm install` → clean, no peer-dependency conflicts (`react 19.3.0`, `@react-three/fiber 9.8.1`, `drei 10.7.9`, `three 0.171.0`, `gsap 3.15.0`, `lenis 1.3.26`, `react-router-dom 7.18.4`, `tailwindcss 4.3.3`).
- Verified in built CSS that the dynamically-passed utilities exist (`opacity-\[0\.18\]`, `opacity-\[0\.14\]`, `object-\[62\%_45\%\]`, `aspect-4\/5`, `bg-process-plate`, `bg-obsidian\/72` …) — Tailwind v4 scanning is **not** a problem source.

---

## 4. Runtime Status (dev-mode bundle, harness + HTTP probes)

| Route | Render | JS errors | Hidden reveal elements (dev) | Verdict |
|---|---|---|---:|---|
| `/` | 10 sections, 28 imgs | none | **21** | **PARTIAL** |
| `/collection` | 2 sections, 11 imgs | none | 4 | **PARTIAL** |
| `/product/samurai-beast` | product detail, static preview | none | 0 | **PASS** |
| `/product/does-not-exist` | "Form not found." notice | none | 0 | **PASS** |
| `/studio` | 3 sections | none | 3 (+ broken sticky) | **PARTIAL** |
| `/about` | 2 sections | none | **10** | **PARTIAL** |
| `/contact` | 1 section | none | 2 | **PARTIAL** |
| `/cart` | empty-bag state | none | 0 | **PASS** |
| `/checkout` | intentional stub notice | none | 0 | **PASS (stub by design)** |
| `/account` | intentional stub notice | none | 0 | **PASS (stub by design)** |
| `*` (404) | RouteNotice | none | 0 | **PASS** |

HTTP probes (dev server, port 5173): `/`, `/src/main.jsx`, all six `/src/mock/assets/images/*.jpg`, `/favicon.svg` → **200** with correct MIME. `/src/mock/assets/models/*.glb` and `/models/*.glb` → **200 `text/html`** (SPA fallback, see H-05). No console errors or React warnings captured in any route; the only runtime noise is environmental (`Window.scrollTo not implemented` in jsdom).

**Homepage visual verdict: BROKEN as perceived by a user** (blank-looking hero/showcase panels + cropped placeholder vase + invisible headlines in dev), even though no JavaScript exception is thrown anywhere.

---

## 5. Hero Audit (`src/components/hero/Hero.jsx`)

**What works:** section shell, typography scale, scrim, sweep line, loader rail, nav theming attributes, service-backed copy (`useSite`), CTA buttons, scroll cue. Hero image file itself is a valid 1376×768 JPEG render (verified by decoding + viewing).

**What doesn't, and why (root causes, in order):**

| # | Finding | Evidence |
|---|---|---|
| 1 | `modelUrl` is always `undefined`: `Hero.jsx:67` passes `showcase?.model?.previewUrl`, and `products.js:124` (showcase product `prod_004`) sets `previewUrl: ""` → `ModelViewer.jsx:88` coerces `"" → undefined` → `FormMesh.jsx:124` takes the **procedural Vessel** branch. No GLB request is ever issued. | `products.js:28,60,92,124,157,189`; `ls src/mock/assets/models/` = `.gitkeep` only |
| 2 | The Vessel at `scale 1.5` (`HeroScene.jsx:41`) is **107 % of the frustum height** (object world-Y span `[-1.93, 2.06]` vs view height `3.73` at `fov 32, z 6.5`) → NDC y `[-1.31, 1.36]` ⇒ clipped above and below. During scroll-out it stays clipped (NDC y `[-1.25, 0.37]`). | `frustum.mjs` analytic test with repo three.js |
| 3 | `GalleryFloor y=-1.94` (`HeroScene.jsx:46`) and `ContactShadows y=-1.93` (`:47`) project to NDC y `-1.02` ⇒ **below the frame** ⇒ no ground, no shadow ⇒ object floats cropped. | same test |
| 4 | Artwork `<img>` starts at `opacity-100` but flips to `opacity-[0.18]` as soon as `Scene` fires `onCreated` (`Scene.jsx:68` → `ModelViewer.jsx:82,71`), plus permanent `bg-obsidian/25` veil (`ModelViewer.jsx:77`) ⇒ effective ≈13 % visibility over the dark radial gradient ⇒ hero reads **black/blank** with a vase in it. | `Hero.jsx:70`, `ModelViewer.jsx:44,71,77` |
| 5 | In dev, the hero *headline* (`RevealLines`) survives (it mounts after async data → observed correctly), but the sections below it lose their headlines (C-01), so the hero appears to be the only typed content. | harness A/B |
| 6 | On `<1024px` (`useIsCompact`) the hero canvas is deliberately not mounted (`ModelViewer.jsx:53`), so mobile hero = 18 %-faded… no: on mobile `allowCanvas=false` ⇒ status `fallback` ⇒ image stays `opacity-100` ⇒ **mobile hero looks correct while desktop looks broken** — an inconsistency that masks the bug on small screens. | `ModelViewer.jsx:53-54` |

**Exact error:** there is no thrown error — the failure mode is *asset absence + wrong framing + premature fade*, which is why the console is clean while the page looks broken.

---

## 6. 3D Asset Audit

| Asset | Location referenced | Exists on disk | Requested by browser | Loader | Component | Status / Root-cause class |
|---|---|---|---|---|---|---|
| `prod_001…006 model.previewUrl` | `src/mock/data/products.js:28,60,92,124,157,189` = `""` | **No file anywhere** (`src/mock/assets/models/` = `.gitkeep`) | **Never requested** | `useGLTF` (dead path) | `FormMesh.jsx:116-130` | **A — file does not exist** (data intentionally empty; placeholder rendered instead) |
| Hero model | `Hero.jsx:67` → `""` | No | Never | — | `HeroScene.jsx:38-45` | **A/L** — placeholder Vessel rendered |
| Showcase model | `Interactive3DShowcase.jsx:43` → `""` | No | Never | — | `ShowcaseScene.jsx:16-24` | **A/L** — placeholder Vessel rendered |
| Product page model | `Product.jsx:42` guards on truthy `previewUrl` | No | Never | — | `Product.jsx:42-63` | Falls back to **STATIC PREVIEW** badge + `<img>` (correct degradation) |
| Environment/HDR maps | none referenced | n/a | n/a | drei `Environment` + `Lightformer` (procedural, `Lighting.jsx:24-29`) | `Lighting.jsx` | OK by design (no external HDR) |
| Textures | none referenced | n/a | n/a | n/a | n/a | n/a |

**Network truth:** zero `.glb/.gltf/.obj/.fbx/.hdr` requests exist in the whole app; `grep -rnE "\.(glb|gltf|obj|fbx|hdr)" src/` matches only a comment (`FormMesh.jsx:9`). The "models not loading" symptom is therefore **not a loader failure and not a path bug — the assets were never authored/added, and the mock data points at empty strings.**
**Diagnostic trap:** in dev/preview, a missing model URL would return **200 + `text/html`** (SPA fallback), so GLTFLoader would fail with a *parse* error, never a 404 (H-05).

---

## 7. Image Asset Audit

| Image | Component(s) | Path | Exists | Loads (HTTP) | Root cause of any blankness |
|---|---|---|---|---|---|
| `hero-form.jpg` (1376×768, 91.5 KB) | Hero, ProductCard, CollectionSection, ProcessTimeline, collections cover | `src/mock/assets/images/hero-form.jpg` (ESM import) | ✅ | ✅ 200 `image/jpeg` | Hero: faded to 18 % + obsidian veil (C-04). Elsewhere: fine |
| `creature-form.jpg` (928×1152) | FeaturedWork, ProductCard, categories | same dir | ✅ | ✅ 200 | fine |
| `weapon-form.jpg` (928×1152) | FeaturedWork, ProductCard, categories, collections | same dir | ✅ | ✅ 200 | fine |
| `environment-form.jpg` (1376×768) | FeaturedWork, ProductCard, categories, process | same dir | ✅ | ✅ 200 | fine |
| `object-form.jpg` (928×1152) | 3 products, 2 categories, process, showcase | same dir | ✅ | ✅ 200 | over-reused (L-07) |
| `studio-process.jpg` (928×1152) | ArtistIntro portrait, categories, process | same dir | ✅ | ✅ 200 | fine |
| `favicon.svg` | `index.html` | `public/favicon.svg` | ✅ | ✅ 200 | fine |

**Conclusion: no image path, case, extension or import is broken.** All six JPEGs are real, valid, correctly-served renders. The perceived "blank/grey placeholders" come from: (a) C-04 fade on hero/showcase, (b) `.fig { background: var(--color-soft) }` grey showing through while lazy images decode or while a `[data-mask]` clip is still closed, (c) C-01 hidden blocks leaving large empty regions, (d) the cropped vase occupying panels where artwork was expected.

---

## 8. File Structure Issues

Actual tree **matches the required AAKAR structure exactly** (verified against `AAKAR_PRD.md §33`): `components/{common,navigation,hero,3d,products,collection,studio,ui}`, `pages/{Home,Collection,Product,Studio,About,Contact,Cart,Checkout,Account}`, `mock/{data,assets/{images,models}}`, `services/{api,mock}`, `hooks`, `state`, `routes`, `utils`, `styles/{tokens,globals,animations}.css`, `App.jsx`, `main.jsx`. No duplicate directories, no components inside `pages/`, no data inside components, no assets mis-placed.

Deviations / observations (non-blocking):

1. `src/mock/assets/models/` is **empty** (`.gitkeep`) — the directory required by the structure exists but has no content (feeds C-02).
2. `src/assets/` exists but is empty (`.gitkeep`) — all imagery lives under `mock/assets/images/` (acceptable per structure, but `src/assets/` is dead).
3. `MotionProvider` (global scroll/motion *state*) lives in `components/common/` rather than `state/`; hooks (`useArtist.js:3`) import it from the components layer — layering smell (L-04).
4. `services/index.js` barrel is **never imported by any hook** — hooks deep-import `@/services/mock/*` (M-01).
5. Repo root contains only `frontend/`; all tooling lives there (fine, but root has no README pointing at it — cosmetic).

---

## 9. TypeScript Issues

**None. The project is 100 % JavaScript/JSX, as the PRD mandates ("Do not use: TypeScript").**

Evidence: `find . -name "*.ts" -o -name "*.tsx" -o -name "tsconfig*"` → **no results**; no `typescript`, `@typescript-eslint`, or TS presets in `package.json` / `eslint.config.mjs`; no type annotations, interfaces, enums, generics or assertions anywhere in `src/`; Vite config is `vite.config.js`; PostCSS/ESLint configs are `.mjs` JS. **No TypeScript remediation is needed in the next phase.**

---

## 10. Data Architecture Issues

**Flow actually implemented:** `mock/data/*.js → services/mock/*.service.js → hooks/use*.js → components`. No component imports `mock/data` directly (verified by grep). Services are async-shaped (`async function get…`) so a real API can replace them.

Violations / gaps:

| # | Issue | Detail |
|---|---|---|
| M-01 | Hooks bypass the public barrel | 8 hook files import `@/services/mock/<x>.service` directly; `src/services/index.js` (which re-exports everything incl. `apiRequest`) has **zero consumers**. Swapping mock→API means editing every hook. |
| M-02 | No caching/dedupe in service layer | `useSite()` is instantiated by **7** components on the homepage (Hero, BrandStatement, FeaturedProducts, CustomProject, FinalStatement, Navbar, Footer); `useProducts()` by 5; `useShowcaseProduct()` by 2. Each triggers an independent `getSiteConfig()`/`getProducts()` call per mount. Harmless with sync mocks, multiplicative against a real API. |
| L-01 | Dead / drifting mock schema | Never consumed: `product.media.gallery`, `hero.ctas`, `artist.workflow`, `category.previewTone`, entire `mock/data/reviews.js`, service `getProductsByCategory`. Missing vs PRD §34 schema: `tags`, `createdAt`. Extra vs PRD: `year`, `featured`, `order`, `isShowcase` (useful, undocumented). |
| L-03 | Dead props | `sizes="100vw"` passed to `ModelViewer` (`Hero.jsx:69`, `Interactive3DShowcase.jsx:44`) but `ModelViewer` has no `sizes` prop (next/image leftover); `Vessel`'s `autorotate` param unused; `toEntries`, `MetaDot`, `IconButton` exported but unused; `utils/clsx.js` duplicates `utils/format.js#cx`. |
| L-07 | Content duplication | `object-form.jpg` serves 3 products + 2 categories + 1 process step; catalogue reads repetitive and "placeholder-ish". |
| — | Hardcoded UI data | `CustomProject.jsx:5-10` hardcodes the SCOPE list; `Hero.jsx:84-89` hardcodes CTA labels instead of consuming `hero.ctas`; `ProductQuickView.jsx:11-17` hardcodes spec row labels (acceptable presentation metadata). |
| — | Schema mismatches UI-vs-data | **None functional found**: `media.hero`, `media.thumbnail`, `model.previewUrl`, `model.formats`, `specifications.*`, `pricing.*` all match consumer expectations exactly. (`work.media` string vs `product.media` object is intentional per-collection schema.) |

---

## 11. Routing Issues

All nine required routes exist (`routes/AppRoutes.jsx:17-27`) plus a `*` 404; all render without errors (harness table §4); no duplicates; no broken imports; refresh works in dev/preview because of the SPA fallback (but see H-05 — the same fallback hides missing assets). `/checkout` and `/account` are **intentional stub notices** (per PRD stage), not defects. `/product/:slug` handles unknown slugs gracefully.

Issues:
1. **No route-level code splitting** — every page component is statically imported in `AppRoutes.jsx:4-14`, so all 9 pages ship in the 492 KB entry chunk (M-05).
2. Production deployment on a static host **requires** a rewrite rule to `index.html`; nothing in the repo documents or provides it (e.g. no `_redirects`/`vercel.json`) — refresh on `/collection` would 404 on naive static hosting (MEDIUM-ops, folded into M-05 notes).
3. Hash-anchor navigation (`Navbar.go`, `Footer`, `MobileMenu`) navigates to `/#work` from sub-pages — works, but relies on `SiteLayout`'s hash effect; acceptable.

---

## 12. CSS / Layout Issues

| # | Severity | Issue | Evidence |
|---|---|---|---|
| H-01 | HIGH | `ProcessTimeline.jsx:40` puts `overflow-hidden` on the `<section>` that contains the `sticky top-[16vh]` plate (`:58`). `overflow:hidden` creates a scroll container, so `position:sticky` has no viewport scrollport to pin against → **the plate never pins**; the desktop left column scrolls empty for most of the section. (`CollectionSection.jsx:36/102` has no such ancestor and pins correctly — proof by contrast.) | source |
| C-01 | CRIT | Hidden-state CSS (`animations.css:2-50`: `[data-reveal]{opacity:0}`, `[data-reveal-line]>span{translateY(108%)}`, `[data-mask]{clip-path:inset(0 100% 0 0)}`, `[data-cobalt-rule]{scaleX(0)}`) has **no safety net**: visibility depends entirely on one global observer with a one-shot `data-aakar-observed` guard (`MotionProvider.jsx:116-122`). | source + harness |
| H-02 | HIGH | `.fig img { transition: transform 1.4s … }` (`globals.css:172-180`) and `transition-transform duration-[1600ms]` (`FeaturedWork.jsx:105`) apply to the very images GSAP scrubs (`FeaturedWork.jsx:36-43`) → every scrub tick is eased over 1.4–1.6 s ⇒ parallax smears/lags ~1.5 s behind scroll. | compiled CSS + source |
| M-09 | MED | `FinalStatement.jsx:38` uses raw `window.scrollTo({behavior:"smooth"})`, bypassing Lenis ⇒ double/conflicting smooth-scroll animation. | source |
| L-06 | LOW | Images lack `width`/`height` (CLS) and `srcset`; several are `loading="eager" fetchPriority="high"` simultaneously (hero, first two works, active process plate). | source |
| — | OK | `100svh` used correctly (hero, showcase, route-message); `body{overflow-x:hidden}`; z-index ladder coherent (nav 70 < cursor 90 < overlay 120 < skip 200); grain overlay `z-2` under `z-10` content; navbar fixed with `pt-28` clearance; no `100vw` overflow traps; breakpoints consistent (`lg` = 1024). | source |

---

## 13. Animation Issues (GSAP / Lenis / CSS)

1. **C-01 (CRITICAL)** — reveal observer vs React StrictMode, proven by A/B harness: dev-mode bundle with `<StrictMode>` → 21 elements stuck hidden on `/` (4 on `/collection`, 10 on `/about`, 3 on `/studio`, 2 on `/contact`); same bundle without StrictMode → **0** stuck. Mechanism: first effect pass observes + stamps `data-aakar-observed="1"`; StrictMode cleanup disconnects the observer before its async callback; second pass skips stamped nodes ⇒ they are never observed again ⇒ `opacity:0` forever.
2. **H-02 (HIGH)** — GSAP scrub vs CSS transform transition on FeaturedWork plates (see §12).
3. **M-07/M-04 (MED)** — Lenis itself is correctly wired (`autoRaf:false`, raf on `gsap.ticker`, `ScrollTrigger.update` on lenis scroll, `refresh()` after 450 ms, full cleanup on unmount, reduced-motion bypass). **But** `gsap.ticker.lagSmoothing(0)` (`MotionProvider.jsx:48`) is a global, never-restored side effect, and StrictMode briefly creates+destroys a Lenis instance on every mount.
4. **Hero scroll binding** — `bindHeroScroll` + sweep `ScrollTrigger` are killed correctly in cleanup (`Hero.jsx:44-49`); `sceneState.heroProgress` reset ✓. No leak.
5. **Cursor** — `gsap.quickTo` tweens are never killed on unmount (`Cursor.jsx:23-27` vs cleanup `:58-63`) — minor leak; listeners removed correctly.
6. **Animations targeting missing elements** — none found; all GSAP selectors (`[data-parallax]`, sweep ref) exist when their effects run.
7. **Reduced motion** — handled thoroughly in CSS (`animations.css:135-166`) and JS (`usePrefersReducedMotion` gates Lenis, GSAP, canvas, parallax) ✓.

---

## 14. Responsive Issues (analytic + source; no real browser available)

| Viewport | Finding |
|---|---|
| 1440 px | Hero & showcase 3D clipped vertically (C-03); Process sticky dead (H-01); parallax smear (H-02); everything else structurally sound. |
| 768 px | Hero canvas disabled (`useIsCompact`) ⇒ hero shows full-opacity artwork ⇒ **looks better than desktop**; grids collapse to 1–2 cols correctly; Process plate hidden with inline step images ✓; Collection preview stacks under the list (sticky largely moot). |
| 390 px | Showcase canvas **enabled** (mode `showcase` bypasses the compact gate, `ModelViewer.jsx:53`) with portrait aspect ⇒ object clipped horizontally (NDC x ±1.40, H-06); type clamps hold; navbar/menu/overlays fine; cursor hidden on coarse pointers ✓. |

Inconsistency to fix: the compact gate protects the hero but not the showcase, so the *worst* 3D framing lands on the *smallest* screen.

---

## 15. Performance Issues

1. **M-03** — `ContactShadows` (drei) defaults to `frames=Infinity` ⇒ the shadow map re-renders **every frame** in both hero and showcase scenes (`HeroScene.jsx:47`, `ShowcaseScene.jsx:26`).
2. **M-04** — two live WebGL contexts on the homepage; hero's mounts eagerly at load (`mountCanvas` true for `mode==="hero"` regardless of viewport position, `ModelViewer.jsx:54`); each scene bakes its own `Environment` (128 px lightformer cube). Showcase correctly defers via `useInViewOnce(500px)` and both pause via `frameloop="never"` off-screen (`Scene.jsx:64`) ✓ — good, but the eager hero context + per-mount WebGL probe (M-07) add startup cost.
3. **M-05** — 1.5 MB JS / 2.2 MB dist; no route-level splitting; `rolldownOptions` `maxSize: 420KB` splits three into **two** `three-core-*` chunks (330 KB + 354 KB), complicating caching/preload (L-09).
4. **M-06** — `Navbar.measure()` runs `getBoundingClientRect()` over every `[data-nav-theme]`/`[data-nav-id]` node on **every scroll frame** (Lenis emits per-frame) ⇒ forced layout per frame (`Navbar.jsx:32-56`).
5. **M-07** — `useWebGLAvailable()` creates and immediately loses a WebGL context on **each** `ModelViewer` mount (3 on homepage) (`useMotion.js:21-39`).
6. Images: 628 KB total for 6 files is reasonable and each file is cached/reused ✓; no duplicate *downloads*, only duplicate *usage* (L-07).
7. Reveal system is CSS-only per frame (observer-driven class flips) ✓ — good design, undermined only by C-01.

---

## 16. Recommended Fix Order

**PHASE 0 — Guardrails:** keep StrictMode; add a reveal safety net (re-observe/unstamp on effect re-run, or a `requestIdleCallback`/timeout fallback that force-sets `="in"`), fixing C-01 without touching design.
**PHASE 1 — Runtime/visual blockers:** C-01 → C-04 (decouple `ready` from `onCreated`: report ready after first rendered frame *and* after model/fallback decision; keep artwork at full opacity until 3D is actually presenting) → H-01 (remove `overflow-hidden` from Process section or move sticky out) → H-02 (exclude GSAP-scrubbed imgs from the transform transition, e.g. `transition: filter …` + `will-change` or animate `translate` property instead).
**PHASE 2 — 3D framing:** C-03 + H-03 + H-06 (re-fit: compute bounding box and fit scale/camera per aspect, or reduce scale to ≈0.9–1.0 and raise camera fov/distance; place floor/shadows inside frustum; apply the compact gate to showcase or fit portrait frustum).
**PHASE 3 — Assets:** C-02 (author/add real `.glb` files into `src/mock/assets/models/` and fill `model.previewUrl`; keep Vessel only as explicit fallback) + H-05 (dev/preview asset 404 behaviour or loader guard that validates content-type).
**PHASE 4 — Data/architecture:** M-01 (route hooks through `@/services` barrel), M-02 (memoised service cache), L-01/L-03 dead schema & props cleanup, L-07 imagery dedupe.
**PHASE 5 — Performance:** M-03 (`frames={1}` on ContactShadows), M-04/M-07 (defer hero context, single WebGL probe), M-05 (route-level `lazy()` pages), M-06 (cache section rects, refresh on resize/ScrollTrigger refresh).
**PHASE 6 — Responsive & polish:** H-06 compact showcase behaviour, L-06 image attributes/srcset, M-09 Lenis-consistent scroll-to-top, L-04 layering, L-05 font hosting, L-08/L-09 minor cleanups.
**PHASE 7 — Verification:** re-run build, lint, the A/B reveal harness, frustum test, and a real-browser pass at 1440/768/390.

---

## 17. Exact Files That Need Changes (do NOT modify yet)

| File | Problem | Why | Expected fix |
|---|---|---|---|
| `src/components/common/MotionProvider.jsx:110-133` | one-shot `data-aakar-observed` guard + observer disconnect on StrictMode remount | C-01: 21 invisible elements in dev | unstamp/re-observe on setup, or fallback timer forcing `="in"`; keep observer per-effect-lifetime |
| `src/main.jsx:8-10` | (context, not culprit) StrictMode must stay | — | no change; fix belongs in MotionProvider |
| `src/components/3d/Scene.jsx:68` | `onCreated` ⇒ `ready` at GL-context creation | C-04/H-04: fade & loader dismiss before content | signal ready after first frame + content suspense resolve |
| `src/components/3d/ModelViewer.jsx:44,71,77,82-88` | fade classes + veil applied on `ready`; unused `sizes` prop | C-04, L-03 | gate fade on actual model/scene presentation; drop dead prop |
| `src/components/3d/HeroScene.jsx:35-47` | scale 1.5, floor −1.94, shadows −1.93 vs fov32/z6.5 | C-03, H-03 | fit-to-frustum scale/camera; move floor/shadows into view |
| `src/components/3d/ShowcaseScene.jsx:19,25-26` | scale 1.62, floor −2.32 | C-03, H-03, H-06 | same fit logic; portrait-aware framing |
| `src/components/3d/FormMesh.jsx:12-53,123-136` | placeholder Vessel is the only 3D ever shown | C-02 | keep as fallback; load real GLB when `previewUrl` set |
| `src/mock/data/products.js:28,60,92,124,157,189` | all `previewUrl: ""` | C-02 | point at real `.glb` assets |
| `src/mock/assets/models/` | empty directory | C-02 | add authored GLB files |
| `src/components/studio/ProcessTimeline.jsx:40` | `overflow-hidden` kills child `sticky` (`:58`) | H-01 | remove overflow-hidden (grain doesn't need it) or restructure |
| `src/components/collection/FeaturedWork.jsx:36-43,105` | GSAP scrub on imgs that carry 1.4–1.6 s transform transition | H-02 | separate transition property / use `translate` for scrub |
| `src/styles/globals.css:172-180` | `.fig img` transitions `transform` globally | H-02 | scope transition to `scale`/`filter` |
| `src/hooks/*.js` (8 files) | deep imports of `@/services/mock/*` | M-01 | import from `@/services` barrel |
| `src/services/mock/*.service.js` | no cache/dedupe | M-02 | module-level memo or tiny cache |
| `src/components/navigation/Navbar.jsx:32-56` | per-frame layout reads | M-06 | cache rects, refresh on resize/ScrollTrigger |
| `src/components/common/MotionProvider.jsx:48` | global `lagSmoothing(0)` never restored | M-07 | restore on cleanup |
| `src/components/ui/Cursor.jsx:23-27` | quickTo tweens not killed | L-08 | kill tweens in cleanup |
| `src/components/studio/FinalStatement.jsx:38` | raw `window.scrollTo` bypasses Lenis | M-09 | use `useMotion().scrollTo(0)` |
| `src/hooks/useMotion.js:21-39` | WebGL context created+lost per viewer | M-07 | probe once, module-level |
| `src/routes/AppRoutes.jsx:4-14` | static page imports | M-05 | `lazy()` per page |
| `vite.config.js:24-38` | maxSize split ⇒ two three-core chunks | L-09 | tune/remove group |
| `src/mock/data/{site,artist,categories,products,reviews}.js` | dead fields/files | L-01 | prune or consume |
| `index.html:12-17` | render-blocking Google Fonts link | L-05 | self-host/preload |

---

## 18. Final Verdict

| Dimension | Score |
|---|---:|
| PROJECT HEALTH | **4 / 10** |
| HOMEPAGE | **3 / 10** |
| 3D SYSTEM | **2 / 10** |
| ARCHITECTURE | **7 / 10** |
| PERFORMANCE | **5 / 10** |

**Biggest blockers, in order:**
1. **C-02/C-03/C-04 (3D truth):** there is no 3D content — only an oversized, clipped procedural stand-in — and the one real artwork present is faded to ~13 % opacity the moment WebGL starts. Until models exist and framing/fade are corrected, the hero and showcase can never look right.
2. **C-01 (StrictMode reveal defect):** a fifth of the homepage's typographic content is invisible in the standard development workflow, which also poisons every visual review of the other fixes.
3. **H-01/H-02 (sticky + parallax conflicts):** two self-inflicted CSS/GSAP fights that make otherwise well-built sections look unfinished.

Everything else is incremental. Notably, the foundations — layering, tokens, routing, lint/build hygiene, reduced-motion support, overlay/a11y mechanics, and the **complete absence of TypeScript** — are in good shape and need no remediation.

*End of audit. No project file was modified; awaiting the fix-phase prompt.*
