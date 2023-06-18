import { test, expect } from '@playwright/test';
import { homeProfilChoiceUrl } from 'e2e/e2e.config';
import { userManagementUrl } from 'e2e/e2e.config';
import { statsValeriePentacleUrl } from 'e2e/e2e.config';

test.describe('Play Game Valerie Pentacle and see stats', () => {
    test('Play Game Valerie Pentacle', async ({ page }) => {
        await page.goto(homeProfilChoiceUrl);
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

    test('See statisques after game',async ({page}) => {
        await page.goto(userManagementUrl);

        await expect(page.getByTestId('add-button')).toBeVisible();
        
        await expect(page.getByTestId('user-list')).toBeVisible();
        await page.getByAltText('user-img-Valerie-Pentacle').click();
        await expect(page.getByText('Voir les statistiques')).toBeVisible();
        await expect(page.getByText('Valerie Pentacle')).toBeVisible();
        await page.getByAltText('stats').click();
        await expect(page.getByText('Valerie Pentacle')).toBeVisible();
        await expect(page.getByAltText('user-img')).toBeVisible();
        await page.getByRole('button', { name : 'Statistiques par quiz'}).click();
        await expect(page).toHaveURL(statsValeriePentacleUrl);
        await expect(page.getByText('Choisissez un thème')).toBeVisible();
        await page.getByAltText('theme-Les Animaux').click();
        await expect(page.getByText('Valerie Pentacle')).toBeVisible();
        await expect(page.getByAltText('user-img-Valerie-Pentacle')).toBeVisible();
        await expect(page.getByText('Choisissez un quiz')).toBeVisible();
        await page.getByAltText('quiz-img-Les félins').click();

        await expect(page.getByAltText('user-img-Valerie-Pentacle')).toBeVisible();
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
    })
})