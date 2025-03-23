import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare(), sentryVitePlugin({
    org: "hriday-jg",
    project: "blogs"
  })],

  build: {
    sourcemap: true
  }
})