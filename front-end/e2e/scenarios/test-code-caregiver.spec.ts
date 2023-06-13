import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Test caregiver code', () => {
    test('Test caregiver code', async ({ page }) => {
        await page.goto(testUrl);
        await page.getByTestId('caregiver-page').click();

        await expect(page.getByRole('textbox', { name : 'CODE'})).toBeVisible();
        await expect(page.getByText('Écrire le code secret')).toBeVisible();
        await page.getByRole('textbox', { name : 'CODE'}).click();
        await page.getByRole('textbox', { name : 'CODE'}).fill('test');
        await page.getByRole('button', { name : 'Valider'}).click();
        await expect(page.getByText('Veuillez saisir le bon code')).toBeVisible();
        await page.getByRole('textbox', { name : 'CODE'}).fill('0000');
        await page.getByRole('button', { name : 'Valider'}).click();
        await expect(page).toHaveURL('http://localhost:4200/user-management');
    });
})