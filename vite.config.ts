import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  plugins: [vue()],
  server: {
    port: 80,
    open: true,
  },
  base: './',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        index: "index.html",
        404: "404.html"
      },
    }
  }
});
