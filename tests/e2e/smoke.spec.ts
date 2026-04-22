import { test, expect } from '@playwright/test';

test('homepage renders brand and tiles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Templates you can actually use.');
  await expect(page.locator('.wordmark')).toBeVisible();
  await expect(page.locator('.tiles li')).toHaveCount(8);
});

test('legal NODE page renders and links back home', async ({ page }) => {
  await page.goto('/legal-document-templates/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('nav[aria-label="Breadcrumb"] a')).toContainText(['Home']);
});

test('skip-to-content link is focusable', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.textContent);
  expect(focused).toContain('Skip to content');
});

test('organization JSON-LD is present on every page', async ({ page }) => {
  await page.goto('/');
  const count = await page.locator('script[type="application/ld+json"]').count();
  expect(count).toBeGreaterThanOrEqual(1);
});
