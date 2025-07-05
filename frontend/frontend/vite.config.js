import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  fontFamily: {
        inter: ['Inter', 'sans-serif'], // key: 'inter'
      },
  server : {port : 5173}
})
