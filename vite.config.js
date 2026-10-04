import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Relative base path works for both GitHub Pages (/tisuta/) and custom domains
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
