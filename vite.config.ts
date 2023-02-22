/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  test: {
    setupFiles: ['./test/vitest.setup.ts'],
    environment: 'happy-dom',
    coverage: {
      all: true,
      provider: 'c8',
    },
  },
})
