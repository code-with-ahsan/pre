import { test, expect } from '@playwright/test';


test.describe('Guesser Game', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:5173');
  });

  test('has heading', async ({ page }) => {

    // Expect a title "to contain" a substring.
    await expect(page.getByRole('heading', {
      name: /Guess the number/i
    })).toBeVisible();
  });

  test('should show the initial UI message', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Guess an integer between 1 and 5' })).toBeVisible();
  })

  test('should congratulate on successful guess', async ({ page }) => {
    await page.getByTestId('guessInputEl').fill('3');
    await page.getByTestId('submitBtn').click();
    await expect(page.getByRole('heading', { name: 'Congratulations! Great guess' })).toBeVisible();
  })

  test('should display the failure message & try again btn on wrong guess', async ({ page }) => {
    await page.getByTestId('guessInputEl').fill('2');
    await page.getByTestId('submitBtn').click();
    await expect(page.getByRole('heading', { name: /wrong guess/i })).toBeVisible();
    await expect(page.getByRole('button', {
      name: /try again/i
    })).toBeVisible();
  })

  test('should reset the UI on try again btn click', async ({ page }) => {
    await page.getByTestId('guessInputEl').fill('2');
    await page.getByTestId('submitBtn').click();
    await page.getByRole('button', { name: /try again/i }).click();
    await expect(page.getByRole('heading', { name: 'Guess an integer between 1 and 5' })).toBeVisible();
  })
})