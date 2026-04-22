import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://template.how',
  integrations: [react(), mdx(), sitemap()],
  trailingSlash: 'always',
  build: {
    format: 'directory',
    assets: '_assets'
  },
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname
      }
    }
  }
});
