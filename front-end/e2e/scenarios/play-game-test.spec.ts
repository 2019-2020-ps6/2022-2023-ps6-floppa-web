import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';

test.describe('Play Game Test Valerie Pentacle', () => {
    test('Play Game Test Valerie Pentacle', async ({ page }) => {
        await page.goto('http://localhost:4200/start-quiz/1/3');

        // Jeu du quiz
        await expect(page.getByText('Valerie Pentacle')).toBeVisible();
        await page.getByRole('button', { name: 'Démarrer le quiz' }).click();
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/0/1/3');

        // Q1
        await expect(page.getByText('Qui est le caracal ?')).toBeVisible();
        await expect(page.getByAltText('home-img')).toBeVisible();
        await expect(page.getByAltText('next-img')).toBeVisible();
        await expect(page.getByAltText('hint')).toBeVisible();
        await expect(page.getByAltText('sound')).toBeVisible();

        await page.getByAltText('hint').click();
        let count =0;
        for (let i=1; i < 5; i++){
            if (page.getByAltText('answer-'+i).isVisible()){
                count++;
            }
        }
        expect(count==2);
        await page.getByAltText('answer-3').click();
        await expect(page).toHaveURL('http://localhost:4200/answer/1/0/true/1/3');
        await expect(page.getByText('Bravo !')).toBeVisible();
        await expect(page.getByAltText('answer-3')).toBeVisible();
        await page.getByTestId('next-question').click();
        
        // Q2
        await expect(page).toHaveURL('http://localhost:4200/play-quiz/1/1/2/3');
        await page.getByAltText('sound').click();
        await page.getByAltText('answer-4').click();
        await expect(page.getByText('La bonne réponse est :')).toBeVisible();
        await page.getByTestId('next-question').click();

        // Q3
        await page.getByAltText('next-img').click();
        // Q4
        await page.getByAltText('next-img').click();

        // Q5
        await page.getByAltText('next-img').click();
        // Q6
        await page.getByRole('button', { name: 'A connecter'}).click();
        await page.getByRole('button', { name: 'A être connecté'}).click();
        await page.getByRole('button', { name: 'Valider' }).click();
        await expect(page.getByText('Bravo !')).toBeVisible();
        await page.getByTestId('next-question').click();
        
        // Q7
        await page.getByAltText('next-img').click();

        // Q8
        await page.getByAltText('next-img').click();

        await expect(page.getByText('Félicitation')).toBeVisible();
    });
})