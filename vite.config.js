import { defineConfig } from 'vite';

export default defineConfig({
  base: '/javascript-lunch/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  }
}); 