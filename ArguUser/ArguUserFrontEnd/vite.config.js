import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9002,
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
        changeOrigin: true,
      }
    }
  }
})

