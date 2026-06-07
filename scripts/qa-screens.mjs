// QA screenshot capture for the template.how redesign.
//
// Captures full-page PNGs of key surfaces at 3 viewports (mobile/tablet/desktop),
// plus dark-mode variants for the homepage and one seed page, and the builder
// Edit/Preview toggle state on mobile.
//
// Usage:
//   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
//   node scripts/qa-screens.mjs [baseURL] [outDir] [chromePath]
//
// Browsers cannot be downloaded in the CI sandbox (CDN blocked); we point at a
// pre-installed chromium via executablePath. PNGs are written OUTSIDE the repo.
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';

const BASE = process.argv[2] || 'http://localhost:4321';
const OUT = process.argv[3] || '/home/user/redesign-screens';
const CHROME =
  process.argv[4] ||
  process.env.QA_CHROME_PATH ||
  '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 900 }
};

// page key -> route
const PAGES = {
  home: '/',
  hub: '/legal-document-templates/',
  seed: '/bill-of-sale/',
  static: '/twitch-banner-size/',
  variant: '/bill-of-sale/california/',
  '404': '/this-page-does-not-exist-xyz/'
};

async function shoot(page, route, file) {
  const resp = await page.goto(BASE + route, { waitUntil: 'networkidle' });
  // wait for fonts/layout to settle
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}/${file}.png`, fullPage: true });
  return resp ? resp.status() : 0;
}

const saved = [];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME });

  // ---- Standard surfaces across viewports (light) ----
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: 'light' });
    const page = await ctx.newPage();
    for (const [key, route] of Object.entries(PAGES)) {
      const file = `${key}-${vpName}`;
      const status = await shoot(page, route, file);
      saved.push(`${file}.png  (${route} -> HTTP ${status})`);
    }
    await ctx.close();
  }

  // ---- Dark mode: homepage + seed, all viewports ----
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport: vp, colorScheme: 'dark' });
    const page = await ctx.newPage();
    for (const key of ['home', 'seed']) {
      const file = `${key}-${vpName}-dark`;
      await shoot(page, PAGES[key], file);
      saved.push(`${file}.png  (${PAGES[key]} dark)`);
    }
    await ctx.close();
  }

  // ---- Builder Edit/Preview toggle on mobile (seed page) ----
  {
    const ctx = await browser.newContext({ viewport: VIEWPORTS.mobile, colorScheme: 'light' });
    const page = await ctx.newPage();
    await page.goto(BASE + PAGES.seed, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    // Try to find the Preview toggle (segmented control) and click it.
    const previewBtn = page.locator(
      'button:has-text("Preview"), [role="radio"]:has-text("Preview"), label:has-text("Preview")'
    ).first();
    let toggled = false;
    try {
      if (await previewBtn.count()) {
        await previewBtn.scrollIntoViewIfNeeded();
        await previewBtn.click({ timeout: 3000 });
        await page.waitForTimeout(400);
        toggled = true;
      }
    } catch (e) {
      console.error('[qa] preview toggle click failed:', e.message);
    }
    await page.screenshot({ path: `${OUT}/seed-bill-of-sale-mobile-preview.png`, fullPage: true });
    saved.push(`seed-bill-of-sale-mobile-preview.png  (toggled=${toggled})`);
    await ctx.close();
  }

  await browser.close();
  console.log('SAVED FILES:\n' + saved.map((s) => '  ' + s).join('\n'));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
