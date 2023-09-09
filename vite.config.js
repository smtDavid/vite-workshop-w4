import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  ase: process.env.NODE_ENV === 'production' ? '/vite-workshop-w4/' : '/',
  plugins: [react()],
})
