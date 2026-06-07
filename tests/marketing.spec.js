const { test, expect } = require('@playwright/test');

test.describe('Marketing Pages', () => {
  test('Landing page returns HTTP 200', async ({ page }) => {
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response.status()).toBe(200);
  });

  test('Landing page loads Flutter bootstrap', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const loadingDiv = page.locator('#flutter-loading');
    await expect(loadingDiv).toBeAttached({ timeout: 5000 });
  });

  test('Landing page has correct meta description', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /bridgeside/i);
  });

  test('Landing page has correct title', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/bridgeside/i);
  });
});