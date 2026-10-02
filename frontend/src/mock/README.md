# AAKAR — Mock Data

Realistic stand-in data for the artist's catalogue. This folder is the only
place in the codebase allowed to hold hardcoded business content.

```
mock/
├── data/          ← records (products, categories, collections, portfolio,
│                    artist, reviews)
└── assets/        ← reference media (images, models) dropped in by the owner
```

## Rules

1. **UI components never import from `mock/`.** They read through hooks, which
   read through services. See `src/services/`.
2. Every record mirrors the shape the future backend will return, so replacing
   this folder with HTTP calls requires no component changes.
3. When the real API exists, set `VITE_DATA_SOURCE=api` in `.env.local`.

## Assets

`assets/images` and `assets/models` are intentionally empty. Media fields in
the mock records are empty strings, which the UI renders as a designed
placeholder plate (see `src/components/ui/Plate.jsx`) rather than a broken
image. Drop real files in and point the record's `media.*` / `model.previewUrl`
at them (`/mock/assets/images/...`, `/mock/assets/models/...`) to see the real
presentation.
