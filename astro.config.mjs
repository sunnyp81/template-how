import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import yaml from 'js-yaml';
import ogImageIntegration from './src/integrations/og-image.ts';

const SITE = 'https://template.how';

// --- Build a `pathname -> ISO lastmod` map at config/build time. ---------
// We read markdown frontmatter and the bill-of-sale rules JSON directly
// (rather than importing astro:content, which isn't available this early)
// so @astrojs/sitemap can emit an honest per-URL <lastmod>.
function dir(rel) {
  return fileURLToPath(new URL(rel, import.meta.url));
}

function readFrontmatterUpdated(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = yaml.load(match[1]) || {};
  const value = fm.updated ?? fm.published;
  return value ? String(value) : null;
}

// Normalize any date-ish string to an ISO 8601 timestamp.
function toIso(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

// Key by pathname with a leading + trailing slash to match `trailingSlash: 'always'`.
function pathKey(pathname) {
  let p = pathname;
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p = p + '/';
  return p;
}

function buildLastmodMap() {
  const map = new Map();

  // Hub nodes -> /{slug}/
  const nodesDir = dir('./src/content/nodes');
  for (const file of readdirSync(nodesDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const slug = file.replace(/\.(md|mdx)$/, '');
    const iso = toIso(readFrontmatterUpdated(`${nodesDir}/${file}`));
    if (iso) map.set(pathKey(`/${slug}/`), iso);
  }

  // Seeds -> /{slug}/
  const seedsDir = dir('./src/content/seeds');
  for (const file of readdirSync(seedsDir)) {
    if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
    const slug = file.replace(/\.(md|mdx)$/, '');
    const iso = toIso(readFrontmatterUpdated(`${seedsDir}/${file}`));
    if (iso) map.set(pathKey(`/${slug}/`), iso);
  }

  // Bill-of-sale jurisdiction variants -> /bill-of-sale/{slug}/
  // These carry their own `last_verified` per jurisdiction.
  const rules = JSON.parse(readFileSync(dir('./src/data/legal/bill-of-sale-state-rules.json'), 'utf8'));
  const jurisdictionsSrc = readFileSync(dir('./src/data/jurisdictions.ts'), 'utf8');
  const codeToSlug = new Map();
  const entryRe = /code:\s*'([^']+)'[^}]*?slug:\s*'([^']+)'/g;
  let m;
  while ((m = entryRe.exec(jurisdictionsSrc)) !== null) {
    codeToSlug.set(m[1], m[2]);
  }
  for (const [code, rule] of Object.entries(rules)) {
    const slug = codeToSlug.get(code);
    const iso = toIso(rule && rule.last_verified);
    if (slug && iso) map.set(pathKey(`/bill-of-sale/${slug}/`), iso);
  }

  return map;
}

const LASTMOD_MAP = buildLastmodMap();
// Honest fallback for routes without a content date (home, about, contact):
// the build date, which is when their content was last regenerated/deployed.
const BUILD_DATE = new Date().toISOString();

export default defineConfig({
  site: SITE,
  integrations: [
    react(),
    mdx(),
    sitemap({
      serialize(item) {
        const { pathname } = new URL(item.url);
        item.lastmod = LASTMOD_MAP.get(pathKey(pathname)) ?? BUILD_DATE;
        return item;
      }
    }),
    ogImageIntegration()
  ],
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
