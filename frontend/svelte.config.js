import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({
    script: true,
  }),

  kit: {
    adapter: adapter({
      out: 'build',
      precompress: false,
    }),
  },
};

export default config;