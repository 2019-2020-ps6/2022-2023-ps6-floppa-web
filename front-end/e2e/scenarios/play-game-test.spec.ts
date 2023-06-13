import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Play Game Test Madeleine Duo', () => {
    test('Play Game Test Madeleine Duo', async ({ page }) => {
        await page.goto(testUrl);

        await page.getByTestId('user-page').click();
        await expect(page).toHaveURL("http://localhost:4200/home-profil-choice");
        
        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await page.getByAltText('user-img-Madeleine-Duo').click();
        await expect(page).toHaveURL("http://localhost:4200/theme-list/Madeleine-Duo/play");

        await expect(page.getByText('Choisissez un thème')).toBeVisible();
        await expect(page.getByAltText('user-img-Madeleine-Duo')).toBeVisible();
        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await expect(page.getByAltText('theme-Les animaux')).toBeVisible();
        await page.getByAltText('theme-Les animaux').click();
        await expect(page).toHaveURL('http://localhost:4200/quiz-list/Madeleine-Duo/0/play');

        await expect(page.getByText('Choisissez un quiz')).toBeVisible();
        await expect(page.getByAltText('user-img-Madeleine-Duo')).toBeVisible();
        await expect(page.getByAltText('quiz-img-Les félins')).toBeVisible();
        await page.getByAltText('quiz-img-Les félins').click();
        await expect(page).toHaveURL('http://localhost:4200/start-quiz/1/1');

        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await page.getByRole('button', { name: 'Démarrer le quiz' }).click();
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/0/1/1');

        await expect(page.getByText('Madeleine Duo')).toBeVisible();
        await expect(page.getByText('Qui est le caracal ?')).toBeVisible();
        await expect(page.getByAltText('home-img')).toBeVisible();
        await expect(page.getByAltText('next-img')).toBeVisible();
        await expect(page.getByAltText('hint')).toBeHidden();
        await expect(page.getByAltText('sound')).toBeHidden();
        await page.getByAltText('answer-3').click();

        await expect(page).toHaveURL('http://localhost:4200/answer/1/0/true/1/1');
        await expect(page.getByText('Bonne réponse !')).toBeVisible();
        await expect(page.getByAltText('answer-3')).toBeVisible();
        await expect(page.getByText('Madeleine Duo')).toBeVisible();

        await page.getByRole('button', { name: 'Question Suivante' }).click();
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/1/2/1');

        await page.getByAltText('answer-4').click();
        await expect(page.getByText('Mauvaise réponse')).toBeVisible();
        await page.getByRole('button', { name: 'Question Suivante' }).click();

        await expect(page.getByText('Question 3/8')).toBeVisible();
        await page.getByAltText('next-img').click();
        await expect(page.getByText('Question 4/8')).toBeVisible();
        await expect(page.getByAltText('answer-3')).toBeHidden();
        await expect(page.getByAltText('answer-2')).toBeVisible();
        await page.getByAltText('answer-2').click();
        await page.getByRole('button', { name: 'Question Suivante' }).click();

        await page.getByAltText('answer-1').click();
        await expect(page.getByText('Mauvaise réponse')).toBeVisible();
        await page.getByRole('button', { name: 'Question Suivante' }).click();

        await page.getByRole('button', { name: 'A connecter'}).click();
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/2/6/1');
        await page.getByRole('button', { name: 'A être connecté' }).click();
        await page.getByRole('button', { name: 'Réinitialiser' }).click();
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/2/6/1');
        await page.getByRole('button', { name: 'Valider' }).click();
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/2/6/1');
        await page.getByRole('button', { name: 'A connecter'}).click();
        await page.getByRole('button', { name: 'A être connecté' }).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await expect(page.getByAltText('arrow')).toBeVisible();
        // await page.getByRole('button', { name: 'Question Suivante' }).click();
        // await expect(page.getByText('Quel animal, quel son?')).toBeVisible();

        // await page.getByAltText('next-img').click();
        // await page.getByRole('button', { name: 'Poussin' }).click();
        // await page.getByRole('button', { name: 'Pioupiou' }).click();
        // await page.getByRole('button', { name: 'Woaf' }).click();
        // await page.getByRole('button', { name: 'Chien' }).click();
        // await page.getByRole('button', { name: 'Valider' }).click();

        // await expect(page.getByTestId('solutions')).toBeVisible();
        // await page.getByRole('button', { name: 'Question Suivante' }).click();
        
        // await expect(page.getByText('Les félins')).toBeVisible();

        // await expect(page.getByAltText('quiz-img')).toBeVisible();
        // await expect(page.getByAltText('user-img')).toBeVisible();
        // await expect(page.getByText('Félicitations')).toBeVisible();
        // await expect(page.getByText('vous avez terminé le quiz !')).toBeVisible();
        // await expect(page.getByRole('button', { name: 'home' })).toBeVisible();
        // await page.getByRole('button', { name: 'home' }).click();

        // await expect(page).toHaveURL('http://localhost:4200/theme-list/Madeleine-Duo/play');
    })
    
})