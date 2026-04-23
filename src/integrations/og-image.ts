import type { AstroIntegration } from 'astro';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { buildOgTree } from '../lib/og-template.js';

interface OgPage {
  url: string;
  title: string;
  category?: string;
}

const renderOg = async (page: OgPage, regularFont: Buffer, boldFont: Buffer): Promise<Buffer> => {
  const svg = await satori(
    buildOgTree({ title: page.title, category: page.category }) as Parameters<typeof satori>[0],
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regularFont, weight: 400, style: 'normal' },
        { name: 'Inter', data: boldFont, weight: 700, style: 'normal' }
      ]
    }
  );
  const png = new Resvg(svg).render().asPng();
  return Buffer.from(png);
};

export default function ogImageIntegration(): AstroIntegration {
  return {
    name: 'og-image',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const fontRegularPath = join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf');
        const fontBoldPath = join(process.cwd(), 'public', 'fonts', 'Inter-Bold.woff');
        if (!existsSync(fontRegularPath)) {
          console.warn('[og-image] font not found at public/fonts/Inter-Regular.ttf — skipping OG generation');
          return;
        }
        const fontData = readFileSync(fontRegularPath);
        const boldFontData = existsSync(fontBoldPath) ? readFileSync(fontBoldPath) : fontData;

        // Astro 5: dir is a URL object
        const distDir = dir instanceof URL
          ? dir.pathname.replace(/^\/([A-Za-z]:)/, '$1').replace(/\/$/, '')
          : String(dir).replace(/\/$/, '');

        const ogDir = join(distDir, 'og');
        mkdirSync(ogDir, { recursive: true });

        // Generate default OG image
        const defaultPng = await renderOg(
          { url: '/', title: 'Templates, built to be used and cited', category: 'Template.how' },
          fontData,
          boldFontData
        );
        writeFileSync(join(ogDir, 'default.png'), defaultPng);
        console.log('[og-image] generated default.png');

        let generated = 1;
        let skipped = 0;

        for (const page of pages) {
          const pathname = page.pathname;
          if (pathname === '404/') continue;

          // Read the built HTML to extract <title>
          const htmlPath = join(distDir, pathname, 'index.html');
          if (!existsSync(htmlPath)) {
            skipped++;
            continue;
          }

          const html = readFileSync(htmlPath, 'utf8');
          const titleMatch = html.match(/<title>([^<]+)<\/title>/);
          if (!titleMatch) {
            skipped++;
            continue;
          }

          // Strip site suffix
          const fullTitle = titleMatch[1];
          const title = fullTitle.replace(/ \| Template\.how$/, '').trim();

          // Slug from pathname: /bill-of-sale/ → bill-of-sale
          const slug = pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'index';

          try {
            const png = await renderOg({ url: pathname, title }, fontData, boldFontData);
            writeFileSync(join(ogDir, `${slug}.png`), png);
            generated++;
          } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e);
            console.warn(`[og-image] failed for ${pathname}: ${msg}`);
            skipped++;
          }
        }

        console.log(`[og-image] done — ${generated} generated, ${skipped} skipped`);
      }
    }
  };
}
