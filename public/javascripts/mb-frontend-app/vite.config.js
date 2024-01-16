import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const mode = process.env.NODE_ENV

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../app',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: `assets/index.[ext]`,
        chunkFileNames: `assets/[name].js`,
        entryFileNames: `assets/index.js`
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __VUE_PROD_DEVTOOLS__: mode !== 'production'
  }
})
