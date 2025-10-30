import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Optional: Configure the server for development
  server: {
    // Set up a proxy to forward API calls (e.g., /api/blogs)
    // to your backend server running on a different port (e.g., 3003)
    // Uncomment and adjust this section when you start integrating the backend
    /*
    proxy: {
      '/api': {
        target: 'http://localhost:3003', // Replace with your backend URL/port
        changeOrigin: true,
      },
    },
    */
  },
})
