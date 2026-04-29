import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const backendTarget = 'http://localhost:8084'

const proxy = {
  '/api': {
    target: backendTarget,
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace(/^\/api/, ''),
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5175,
    strictPort: true,
    proxy,
  },
  preview: {
    host: true,
    port: 4175,
    strictPort: true,
    proxy,
  },
})
