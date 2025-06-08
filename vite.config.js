import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// replace with your actual repo name
export default defineConfig({
  base: '/fetch-assignment/',
  plugins: [react()],
})
