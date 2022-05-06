import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// const babel = require('@rollup/plugin-babel').default;
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    {
      ...babel({
        presets: [['@babel/preset-env', { loose: true }]],
      }),
      apply: 'build',
    },
  ],
  server: {
    host: '0.0.0.0',
    port: 80,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/GlobalVariables.scss";',
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    sourcemap: true,
    rollupOptions: {
      input: {
        index: 'index.html',
        404: '404.html',
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
});
