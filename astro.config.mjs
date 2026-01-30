// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://astrocyte74.github.io/clawd',
  base: '/clawd',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()],
  build: {
    format: 'directory'
  }
});