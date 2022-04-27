import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
export default [
  {
    input: './src/index.ts',
    output: {
      file: './dist/lispress.js',
      name: 'lispress',
      format: 'es',
    },
    plugins: [typescript(), resolve()],
  },
  {
    input: './src/index.ts',
    output: {
      file: './dist/lispress.min.js',
      name: 'lispress',
      format: 'iife',
    },
    plugins: [typescript(), resolve(), terser()],
  },
  {
    input: './src/index.ts',
    output: {
      file: './dist/lispress.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
