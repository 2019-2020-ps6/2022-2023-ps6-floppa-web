import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';


test.describe('Create new patient', () => {
    test('Create new patient', async ({ page }) => {
        await page.goto('http://localhost:4200/user-management');


        await page.getByAltText('add').click();


        await page.getByTestId('lastName').fill('Smith');
        await page.getByTestId('firstName').fill('John');
        await page.getByTestId('alzheimerStade-1-2').check();
        await page.getByRole('textbox', {name: 'URL de l\'image'}).fill('https://thumbs.dreamstime.com/b/vieux-vieil-homme-24922472.jpg');

        await page.getByRole('button', {name: 'Créer utilisateur'}).click();

        await expect(page.getByText('John Smith')).toBeVisible();
    });
})