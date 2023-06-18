import { test, expect } from '@playwright/test';
import { homeUrl } from 'e2e/e2e.config';

// This file is here to test the playwright integration.
test.describe('Initial test display', () => {
  test('Basic test', async ({ page }) => {
    await page.goto(homeUrl);
    // Let's try with something you don't have in your page.
    const pageTitle = await page.getByRole('heading', { name: 'AGreatHeadingNameYouDontHave' });
    // It should not be visible as you don't have it in your page.
    expect(pageTitle).not.toBeVisible();
    // Test case pass? Means the playwright setup is done! Congrats!
  });
});
