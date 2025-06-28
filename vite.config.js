import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Set base path: GitHub Pages uses /tokenVault/, Vercel/local uses /
  base: process.env.VERCEL ? '/' : (process.env.GITHUB_PAGES ? '/tokenVault/' : '/'),
  plugins: [react()],
})
