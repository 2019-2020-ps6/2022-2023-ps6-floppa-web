import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Play Game Valerie Pentacle', () => {
    test('Play Game Valerie Pentacle', async ({ page }) => {
        await page.goto('http://localhost:4200/home-profil-choice');
        await page.getByAltText('user-img-Valerie-Pentacle').click();
        await page.getByAltText('theme-Les Animaux').click();
        await page.getByAltText('quiz-img-Les félins').click();

        await page.getByRole('button', {name: 'Démarrer le quiz'}).click();

        await page.getByAltText('hint').click();
        await page.getByAltText('answer-2').click();

        await expect(page.getByText('Bravo !')).toBeVisible();
        await page.getByRole('button', {name: 'Question Suivante'}).click();

        await page.getByAltText('sound').click();
        await page.getByAltText('answer-2').click();

        await expect(page.getByText('La bonne réponse est :')).toBeVisible();
        await page.getByRole('button', {name: 'Question Suivante'}).click();

        await page.getByRole('button', {name: 'Lion'}).click();
        await page.getByRole('button', {name: 'Maison'}).click();
        await page.getByRole('button', {name: 'Chat'}).click();
        await page.getByRole('button', {name: 'Savane'}).click();
        await page.getByRole('button', {name: 'Réinitialiser'}).click();
        await page.getByRole('button', {name: 'Lion'}).click();
        await page.getByRole('button', {name: 'Savane'}).click();
        await page.getByRole('button', {name: 'Chat'}).click();
        await page.getByRole('button', {name: 'Maison'}).click();
        await page.getByRole('button', {name: 'Valider'}).click();

        await page.getByRole('button', {name: 'Question Suivante'}).click();
        await expect(page.getByText('FÉLICITATIONS')).toBeVisible();
    })
})