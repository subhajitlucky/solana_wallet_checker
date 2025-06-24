import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/tokenVault/', // Set base path for GitHub Pages deployment
  plugins: [react()],
})
