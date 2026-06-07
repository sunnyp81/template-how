import { test, expect, type Page } from '@playwright/test';

// The builder mounts with `client:visible`, so the React island only hydrates
// once scrolled into view — and hydration completes asynchronously. Interacting
// with the still-SSR markup (fill/selectOption) before hydration lands gets
// discarded when React takes over, which made these tests racy in CI. This
// helper scrolls the island into view and retries the interaction until it
// "sticks", which is the deterministic signal that hydration has completed.
const builderRegion = (page: Page) =>
  page.locator('[role="region"][aria-label*="builder"]');

async function whenHydrated(page: Page, interact: () => Promise<void>) {
  await builderRegion(page).scrollIntoViewIfNeeded();
  await expect(interact).toPass({ timeout: 15_000 });
}

test('bill-of-sale page renders with builder', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await expect(page.locator('h1').first()).toContainText('Bill of Sale Template');
  await expect(builderRegion(page)).toBeVisible();
});

test('builder reflects form input in preview', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await whenHydrated(page, async () => {
    await page.locator('input#seller_name').fill('Sunny Patel');
    await page.locator('input#buyer_name').fill('Alex Test');
    await expect(page.locator('.b-doc')).toContainText('Sunny Patel', { timeout: 2_000 });
    await expect(page.locator('.b-doc')).toContainText('Alex Test', { timeout: 2_000 });
  });
});

test('vehicle conditional fields appear when item_type is vehicle', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await builderRegion(page).scrollIntoViewIfNeeded();
  await expect(page.locator('input#vin')).toHaveCount(0);
  await whenHydrated(page, async () => {
    await page.locator('select#item_type').selectOption('vehicle');
    await expect(page.locator('input#vin')).toBeVisible({ timeout: 2_000 });
  });
});

test('PDF download triggers a file download', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await whenHydrated(page, async () => {
    await page.locator('input#seller_name').fill('Sunny');
    await expect(page.locator('.b-doc')).toContainText('Sunny', { timeout: 2_000 });
  });
  const downloadPromise = page.waitForEvent('download');
  await page.click('button:has-text("Download PDF")');
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('bill-of-sale.pdf');
});

test('jurisdiction comparison table lists 54 jurisdictions', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  const rows = page.locator('table.jt tbody tr');
  await expect(rows).toHaveCount(54);
});

test('FAQ accordion expands and emits FAQPage schema', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await expect(page.locator('details.faq-item').first()).toBeVisible();
  const ldjson = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ldjson.some((j) => j.includes('FAQPage'))).toBe(true);
});
