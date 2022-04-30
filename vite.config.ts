import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '/articles/': '../',
    },
  },
  plugins: [vue()],
  server: {
    port: 80,
    open: true,
  },
  base: './',
});
