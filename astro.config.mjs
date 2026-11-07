// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://philip-portfolio-five.vercel.app',

  // docu-ai's case study became Shelby's (2026-11-07): docu-ai is one of Shelby's tools now.
  redirects: { '/work/docu-ai': '/work/shelby' },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});