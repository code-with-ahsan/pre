import { test, expect } from '@playwright/test';

test.describe('Guesser Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the initial UI message with random prompt', async ({ page }) => {
    await expect(page.getByRole('heading', {
      name: /guess the number/i
    })).toBeVisible();
    await expect(page.getByRole('heading', {
      name: /guess an integer between 1 and/i
    })).toBeVisible();
  });

  test('should congratulate on a successful guess', async ({ page }) => {
    await page.getByTestId('guessInputEl').fill('3');
    await page.getByTestId('submitBtn').click();
    await expect(page.getByRole('heading', { name: /Congratulations! Great guess ✅ The random number was 3/i })).toBeVisible();
  });

  test('should display the failure message & try again btn on wrong guess', async ({ page }) => {
    await page.getByTestId('guessInputEl').fill('2');
    await page.getByTestId('submitBtn').click();
    await expect(page.getByRole('heading', {
      name: /wrong guess/i
    })).toBeVisible();
    await expect(page.getByRole('button', {
      name: /try again/i
    })).toBeVisible();
    await expect(page.getByTestId('guessInputEl')).toBeDisabled();
  });

  test('should reset the UI on try again btn click', async ({ page }) => {
    await page.getByTestId('guessInputEl').fill('2');
    await page.getByTestId('submitBtn').click();
    await page.getByRole('button', {
      name: /try again/i
    }).click();
    await expect(page.getByRole('heading', {
      name: /guess an integer between 1 and/i
    })).toBeVisible();
  });
})