import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('User Test', () => {
    test('Test user Page', async ({ page }) => {
        await page.goto(testUrl);
        
        await expect(page).toHaveURL("http://localhost:4200/home-profil-choice")

    })
    
})