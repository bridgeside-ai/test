const { test, expect } = require('@playwright/test');

test.describe('Marketing Pages', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);
  });

  test('Landing page loads without errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title.toLowerCase()).toMatch(/bridgeside/i);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('Hero section is visible', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    const hero = page.locator('h1.hero-title');
    await expect(hero).toBeVisible({ timeout: 15000 });
    await expect(hero).toContainText('Orchestrate');

    await expect(page.locator('text=Start for free').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=See how it works').first()).toBeVisible({ timeout: 5000 });
  });

  test('Navigation bar is present', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await expect(page.locator('.nav-logo').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('button:has-text("Get started")').first()).toBeVisible({ timeout: 5000 });
  });

  test.describe('Pricing section', () => {
    test('Pricing cards are visible', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      await expect(page.locator('text=Simple, predictable pricing').first()).toBeVisible({ timeout: 15000 });

      await expect(page.locator('text=$0').first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=$29').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('text=Custom').first()).toBeVisible({ timeout: 5000 });
    });

    test('Pricing buttons are present', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      await expect(page.locator('button:has-text("Get started")').first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('button:has-text("Start free trial")').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('button:has-text("Contact sales")').first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Footer', () => {
    test('Footer is visible', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      await expect(page.locator('footer').first()).toBeVisible({ timeout: 15000 });
      await expect(page.locator('text=/© \\d{4}/').first()).toBeVisible({ timeout: 10000 });
    });

    test('Footer links are present', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      await expect(page.locator('a:has-text("Privacy Policy")').first()).toBeVisible({ timeout: 10000 });
      await expect(page.locator('a:has-text("Terms of Service")').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('a:has-text("Cookie Policy")').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('a:has-text("GDPR")').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('a:has-text("Security")').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('a:has-text("About")').first()).toBeVisible({ timeout: 5000 });
    });

    test('Footer links navigate to correct URLs', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000);

      const privacyLink = page.locator('a:has-text("Privacy Policy")').first();
      await expect(privacyLink).toBeVisible({ timeout: 10000 });
      await expect(privacyLink).toHaveAttribute('href', 'https://bridgeside.ai/privacy.html');

      const termsLink = page.locator('a:has-text("Terms of Service")').first();
      await expect(termsLink).toBeVisible({ timeout: 5000 });
      await expect(termsLink).toHaveAttribute('href', 'https://bridgeside.ai/terms.html');

      const aboutLink = page.locator('a:has-text("About")').first();
      await expect(aboutLink).toBeVisible({ timeout: 5000 });
      await expect(aboutLink).toHaveAttribute('href', 'https://bridgeside.ai/about.html');
    });
  });

  test.describe('FAQ section', () => {
    test('FAQ items are expandable', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('*')).find(e =>
          e.textContent.includes('Frequently asked questions'));
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(1000);

      const firstFaq = page.locator('text=What is bridgeside.ai?').first();
      await expect(firstFaq).toBeVisible({ timeout: 15000 });
      await firstFaq.click();
      await page.waitForTimeout(500);
      await expect(page.locator('text=bridgeside.ai is a cloud-based').first()).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Features section', () => {
    test('Features grid is visible', async ({ page }) => {
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('*')).find(e =>
          e.textContent.includes('Everything you need to ship faster'));
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(1000);

      await expect(page.locator('text=Everything you need to ship faster').first()).toBeVisible({ timeout: 15000 });
      await expect(page.locator('text=Agentic workflow trigger').first()).toBeVisible({ timeout: 5000 });
      await expect(page.locator('text=Sandbox security').first()).toBeVisible({ timeout: 5000 });
    });
  });
});