import { test, expect } from '@playwright/test';

test('bill-of-sale page renders with builder', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await expect(page.locator('h1').first()).toContainText('Bill of Sale Template');
  await expect(page.locator('[role="region"][aria-label*="builder"]')).toBeVisible();
});

test('builder reflects form input in preview', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await page.locator('input#seller_name').fill('Sunny Patel');
  await page.locator('input#buyer_name').fill('Alex Test');
  await expect(page.locator('.b-doc')).toContainText('Sunny Patel');
  await expect(page.locator('.b-doc')).toContainText('Alex Test');
});

test('vehicle conditional fields appear when item_type is vehicle', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  // Scroll builder into view to trigger client:visible hydration
  await page.locator('[role="region"][aria-label*="builder"]').scrollIntoViewIfNeeded();
  await expect(page.locator('input#vin')).toHaveCount(0);
  await page.locator('select#item_type').selectOption('vehicle');
  await expect(page.locator('input#vin')).toBeVisible();
});

test('PDF download triggers a file download', async ({ page }) => {
  await page.goto('/bill-of-sale/');
  await page.locator('input#seller_name').fill('Sunny');
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
