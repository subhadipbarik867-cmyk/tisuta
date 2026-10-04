import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/tisuta/', // Explicit GitHub Pages repository path
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
