import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // Ficheiros em `public/` são servidos na raiz do site (dev) e copiados para a raiz de `dist/` (build).
  // Nos componentes use `publicPath("images/...")` em `src/utils/publicPath.js` — não use o prefixo "public/" na URL.
  // Se o site rodar em subpasta, ajuste o base:
  // base: '/subpasta/',
  base: '/',
})
