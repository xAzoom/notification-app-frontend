import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'

export default defineConfig({
  plugins: [react(), basicSsl()],
  watch: {
    usePolling: true,
  },
  host: true,
  strictPort: true,
  port: 5173,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

})
