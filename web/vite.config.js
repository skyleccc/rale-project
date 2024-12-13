import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    // proxy: {
    //   // Proxy all requests starting with /api to http://localhost:8590
    //   '^/': {
    //     target: 'http://localhost:8590',
    //     changeOrigin: true, // Needed for virtual hosted sites
    //     rewrite: (path) => path, // Keep the original path
    //   },
    // },
})
