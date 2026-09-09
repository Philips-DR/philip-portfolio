// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // TODO(Phase 5): confirm this matches the real Vercel production URL (or custom domain)
  // before shipping — it feeds sitemap.xml and canonical/OG tags.
  site: 'https://philip-portfolio.vercel.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});