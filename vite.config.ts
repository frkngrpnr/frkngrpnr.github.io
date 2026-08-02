import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT for GitHub Pages: this must match your repo name exactly.
  // e.g. if your repo is github.com/you/my-app -> base: '/my-app/'
  // If deploying to a custom domain or user/org page (you.github.io), use base: '/'
  base: '/',
})
