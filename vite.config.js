import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexiones desde cualquier IP
    port: 3000,
    strictPort: true, // Falla si el puerto 3000 no está disponible
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  }
})
