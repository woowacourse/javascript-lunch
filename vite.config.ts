import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/javascript-lunch/',
  resolve: {
    extensions: ['.ts', '.js'], // .ts 파일을 우선적으로 해석하되 .js 파일도 지원한다.
    alias: {
      '@': resolve(__dirname, './src'), // 경로 별칭 설정
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) {
            return 'assets/css/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },
});
