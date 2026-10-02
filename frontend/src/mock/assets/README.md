# mock/assets

Media referenced by the mock records.

```
images/   product thumbnails, hero images, portfolio plates, studio photography
models/   GLB / GLTF preview models (product.model.previewUrl)
```

Both folders are empty on purpose. Media fields in `mock/data/*.js` are empty
strings, which `components/ui/Plate.jsx` renders as a designed placeholder plate
using the record's own palette — and which `components/3d/Scene.jsx` answers with
the procedural form. Nothing looks broken while the owner's assets are pending.

To see the real presentation, drop a file in and point the record at it:

```js
media: {
  thumbnail: '/mock/assets/images/samurai-beast-thumb.webp',
  hero: '/mock/assets/images/samurai-beast-hero.webp',
  gallery: [],
}

model: {
  previewUrl: '/mock/assets/models/samurai-beast.glb',
}
```

Files placed here are served from the site root, so paths are absolute.
Prefer WebP/AVIF for images and keep GLB previews under ~5 MB.
