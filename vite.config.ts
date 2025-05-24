import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  optimizeDeps: {
    exclude: ['@tabler/icons-react'],
    include: ['@mantine/core', '@mantine/hooks', '@mantine/notifications']
  },
  build: {
    chunkSizeWarningLimit: 1600,
  }
})
