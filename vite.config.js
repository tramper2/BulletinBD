import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/BulletinBD/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        board: resolve(__dirname, 'board.html'),
      },
    },
  },
});
