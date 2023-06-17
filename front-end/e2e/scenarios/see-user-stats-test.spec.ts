import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('See user stats', () => {
    test('See user stats', async ({ page }) => {
        await page.goto('http://localhost:4200/user-management');

        await expect(page.getByTestId('add-button')).toBeVisible();
        await expect(page.getByTestId('edit-button')).toBeVisible();

        await expect(page.getByTestId('user-list')).toBeVisible();
        await page.getByAltText('user-img-Madeleine-Duo').click();
        await expect(page.getByText('Voir les statistiques')).toBeVisible();
        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await page.getByAltText('stats').click();
        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await expect(page.getByAltText('user-img')).toBeVisible();
        await page.getByRole('button', { name : 'Statistiques par quiz'}).click();
        await expect(page).toHaveURL('http://localhost:4200/theme-list/Madeleine-Duo/stats');
        await expect(page.getByText('Choisissez un thème')).toBeVisible();
        await page.getByAltText('theme-Les Animaux').click();
        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await expect(page.getByAltText('user-img-Madeleine-Duo')).toBeVisible();
        await expect(page.getByText('Choisissez un quiz')).toBeVisible();
        await page.getByAltText('quiz-img-Les félins').click();

        await expect(page.getByAltText('user-img-Madeleine-Duo')).toBeVisible();
        await expect(page.getByAltText('quiz-img')).toBeVisible();

        await page.getByText('Progression').click();
        await expect(page.getByRole('dialog', {name: 'Progression'})).toBeVisible();
        await page.getByRole('button', { name : 'OK'}).click();

        await page.getByText('Similitude d\'erreur').click();
        await expect(page.getByRole('dialog', {name: 'Similitude d\'erreur'})).toBeVisible();
        await page.getByRole('button', { name : 'OK'}).click();

        await page.getByText('voir questions problématiques').click();
        await expect(page.getByRole('dialog', {name: 'Questions Problématiques'})).toBeVisible();
        await page.getByRole('button', { name : 'OK'}).click();

        await page.getByText('Temps moyen par question').click();
        await expect(page.getByRole('dialog', {name: 'Temps moyen par question'})).toBeVisible();
        await page.getByRole('button', { name : 'OK'}).click();

    });
})