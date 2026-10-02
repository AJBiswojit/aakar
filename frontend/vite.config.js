import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * AAKAR — Vite configuration.
 *
 * Kept intentionally small. The 3D stack (three / @react-three/fiber / drei)
 * is not listed here on purpose: it is code-split automatically because the
 * canvas is only ever mounted through a dynamic import
 * (see components/hero/HeroCanvasMount.jsx).
 *
 * VITE_HMR_CLIENT_PORT can be provided by hosted preview environments that
 * proxy the dev server over https on a different public port.
 */
const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT)

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    ...(hmrClientPort
      ? { hmr: { protocol: 'wss', clientPort: hmrClientPort } }
      : {}),
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
})
