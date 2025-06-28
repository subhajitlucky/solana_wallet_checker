import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set base path conditionally: GitHub Pages uses /tokenVault/, Vercel uses /
  base: process.env.GITHUB_PAGES ? '/tokenVault/' : '/',
  plugins: [react()],
})
