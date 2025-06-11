import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // any request to /api/* on port 5173 will be forwarded to port 3500
      '/api': {
        target: 'http://localhost:3500',
        changeOrigin: true,
      },
    },
  },
})
