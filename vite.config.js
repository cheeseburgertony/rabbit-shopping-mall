import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      // 这里的@做实际的路径转换  @ -> src
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
