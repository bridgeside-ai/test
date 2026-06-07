const { test, expect } = require('@playwright/test');

test.describe('Marketing Pages', () => {
  test('Landing page loads without errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Page title should contain bridgeside
    await expect(page).toHaveTitle(/bridgeside/i);

    // No console errors
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('Hero section is visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hero headline should be visible
    const hero = page.locator('text=Orchestrate agentic workflows');
    await expect(hero).toBeVisible();

    // CTA buttons should be present
    await expect(page.locator('text=Start for free').first()).toBeVisible();
    await expect(page.locator('text=See how it works').first()).toBeVisible();
  });

  test('Navigation bar is present', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Logo / brand name visible
    await expect(page.locator('text=bridgeside.ai').first()).toBeVisible();

    // Get started button visible
    await expect(page.locator('button:has-text("Get started")').first()).toBeVisible();
  });

  test.describe('Pricing section', () => {
    test('Pricing cards are visible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to pricing section
      await page.evaluate(() => {
        const pricing = document.querySelector('[class*="Pricing"]') ||
          Array.from(document.querySelectorAll('*')).find(el =>
            el.textContent.includes('Simple, predictable pricing'));
        if (pricing) pricing.scrollIntoView();
      });
      await page.waitForTimeout(500);

      // Free tier card
      const freeCard = page.locator('text=/\\$0.*per month/i').first();
      await expect(freeCard).toBeVisible({ timeout: 10000 });

      // Pro tier card
      const proCard = page.locator('text=/\\$29.*per month/i').first();
      await expect(proCard).toBeVisible({ timeout: 5000 });

      // Enterprise card
      const enterpriseCard = page.locator('text=/Custom.*per month/i').first();
      await expect(enterpriseCard).toBeVisible({ timeout: 5000 });
    });

    test('Pricing buttons are present', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to pricing
      await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('*')).find(e =>
          e.textContent.includes('Simple, predictable pricing'));
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(500);

      // "Get started" button on Free tier
      const getStartedBtn = page.locator('button:has-text("Get started")').first();
      await expect(getStartedBtn).toBeVisible({ timeout: 10000 });

      // "Start free trial" button on Pro tier
      const freeTrialBtn = page.locator('button:has-text("Start free trial")').first();
      await expect(freeTrialBtn).toBeVisible({ timeout: 5000 });

      // "Contact sales" button on Enterprise
      const contactSalesBtn = page.locator('button:has-text("Contact sales")').first();
      await expect(contactSalesBtn).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Footer', () => {
    test('Footer is visible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Copyright text
      const copyright = page.locator('text=/© \\d{4} Bridgeside/i');
      await expect(copyright).toBeVisible({ timeout: 10000 });
    });

    test('Footer links are present', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Privacy link
      const privacyLink = page.locator('a:has-text("Privacy Policy")').first();
      await expect(privacyLink).toBeVisible({ timeout: 10000 });

      // Terms link
      const termsLink = page.locator('a:has-text("Terms of Service")').first();
      await expect(termsLink).toBeVisible({ timeout: 5000 });

      // Cookie policy link
      const cookieLink = page.locator('a:has-text("Cookie Policy")').first();
      await expect(cookieLink).toBeVisible({ timeout: 5000 });

      // GDPR link
      const gdprLink = page.locator('a:has-text("GDPR")').first();
      await expect(gdprLink).toBeVisible({ timeout: 5000 });

      // Security link
      const securityLink = page.locator('a:has-text("Security")').first();
      await expect(securityLink).toBeVisible({ timeout: 5000 });

      // About link
      const aboutLink = page.locator('a:has-text("About")').first();
      await expect(aboutLink).toBeVisible({ timeout: 5000 });
    });

    test('Footer links navigate to correct URLs', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to footer
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Check Privacy link href
      const privacyLink = page.locator('a:has-text("Privacy Policy")').first();
      const privacyHref = await privacyLink.getAttribute('href');
      expect(privacyHref).toBe('https://bridgeside.ai/privacy.html');

      // Check Terms link href
      const termsLink = page.locator('a:has-text("Terms of Service")').first();
      const termsHref = await termsLink.getAttribute('href');
      expect(termsHref).toBe('https://bridgeside.ai/terms.html');

      // Check About link href
      const aboutLink = page.locator('a:has-text("About")').first();
      const aboutHref = await aboutLink.getAttribute('href');
      expect(aboutHref).toBe('https://bridgeside.ai/about.html');
    });
  });

  test.describe('FAQ section', () => {
    test('FAQ items are expandable', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Scroll to FAQ
      await page.evaluate(() => {
        const el = Array.from(document.querySelectorAll('*')).find(e =>
          e.textContent.includes('Frequently asked questions'));
        if (el) el.scrollIntoView();
      });
      await page.waitForTimeout(500);

      // Click first FAQ item
      const firstFaq = page.locator('text=What is bridgeside.ai?').first();
      await expect(firstFaq).toBeVisible({ timeout: 10000 });
      await firstFaq.click();
      await page.waitForTimeout(300);

      // Answer should appear
      const answer = page.locator('text=bridgeside.ai is a cloud-based agentic software development platform');
      await expect(answer).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Features section', () => {
    test('Features grid is visible', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Features heading
      const featuresHeading = page.locator('text=Everything you need to ship faster').first();
      await expect(featuresHeading).toBeVisible({ timeout: 10000 });

      // Feature cards should be present
      const agenticCard = page.locator('text=Agentic workflow trigger').first();
      await expect(agenticCard).toBeVisible({ timeout: 5000 });

      const sandboxCard = page.locator('text=Sandbox security').first();
      await expect(sandboxCard).toBeVisible({ timeout: 5000 });
    });
  });
});