import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// GitHub Pages subpath support
const site = process.env.SITE || 'https://PabloAballe.github.io';
const base = process.env.GITHUB_ACTIONS ? '/ViralLoom/' : '/';

export default defineConfig({
  site,
  base,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  output: 'static',
});
