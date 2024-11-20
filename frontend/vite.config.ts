import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default {
  plugins: [sveltekit()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      $lib: path.resolve('src/lib'),
      $stores: path.resolve('src/stores'),
      $interfaces: path.resolve('src/interfaces'),
      $schemas: path.resolve('src/schemas')
    },
  },
};
