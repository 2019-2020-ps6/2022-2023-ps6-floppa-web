import { test, expect } from '@playwright/test';
import { userManagementUrl } from 'e2e/e2e.config';


test.describe('Create/delete new patient', () => {
    test('Create new patient', async ({ page }) => {
        await page.goto(userManagementUrl);
        await page.getByAltText('add').click();

        await page.getByTestId('lastName').fill('Dupont');
        await page.getByTestId('firstName').fill('Robert');
        await page.getByTestId('alzheimerStade-1-2').check();
        await page.getByRole('textbox', {name: 'URL de l\'image'}).fill('https://thumbs.dreamstime.com/b/vieux-vieil-homme-24922472.jpg');

        await page.getByRole('button', {name: 'Créer utilisateur'}).click();

        await expect(page.getByRole('img', {name: 'user-img-Robert-Dupont'})).toBeVisible();
    });

    test('Delete patient', async ({ page }) => {
        await page.goto(userManagementUrl);
        await page.getByRole('img', {name: 'trash-img-Robert-Dupont'}).click();
        await page.getByRole('button', {name: 'Oui'}).click();

        await expect(page.getByRole('img', {name: 'user-img-Robert-Dupont'})).toBeHidden();

    });
})