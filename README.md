# AAKAR

**A digital atelier where 3D art is exhibited, examined, experienced and purchased.**

AAKAR is a single-brand, single-owner platform: a 3D artist portfolio, a 3D asset
store, an interactive product examination experience, and the studio story behind
the work.

> This is **not** a marketplace. There is one artist and one management system —
> no vendors, no seller onboarding, no vendor payouts, no marketplace RBAC.

---

## Where things live

| Path | What it is |
| --- | --- |
| [`frontend/`](./frontend) | The Vite + React application (Phase 0/1 foundation) |
| [`frontend/AAKAR_PRD.md`](./frontend/AAKAR_PRD.md) | Product requirements — the wider roadmap |
| [`frontend/README.md`](./frontend/README.md) | Architecture, conventions and how to extend it |

---

## Running it

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # serve the production build
```

---

## Current status — Phase 0/1: foundation

Built and verified:

- Vite + React + JavaScript (no TypeScript anywhere)
- Design system: tokens, global styles, animation system (60/30/10 white / obsidian / cobalt)
- Routing and global layout — navigation, main, footer
- Mock data → service layer → hooks → UI (no component touches data directly)
- Navbar with dark/light surface states and responsive drawer
- Homepage: hero, selected work, catalogue index, store, studio, commissions
- 3D foundation: scene, camera rig, studio lighting, model viewer, fallbacks
- Cart and wishlist state foundation, accessibility and reduced-motion support

Deliberately **not** built yet: authentication, payments, orders, downloads,
admin/owner system, search indexing, product filters. The routes exist and state
clearly what is planned for them — see `frontend/README.md`.
