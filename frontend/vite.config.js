import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "three-core",
              test: /node_modules[\\/]three[\\/]/,
              priority: 10,
              maxSize: 420 * 1024,
            },
          ],
        },
      },
    },
  },
});
