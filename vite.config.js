import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Root path for development, will be updated for GitHub Pages when you rename repo
  plugins: [react()],
})
