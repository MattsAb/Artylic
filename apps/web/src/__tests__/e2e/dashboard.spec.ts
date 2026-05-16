import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {

  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');


  })


  test('should load the first page and get its title', async ({ page }) => {
    await expect(page).toHaveTitle(/Artylic/);
  });

  test('should open auth modal and log in', async ({ page }) => {

    await page.getByText('Sign in').click();


    const email = await page.getByPlaceholder('Email');
    await email.fill('test1@gmail.com');

    const password = await page.getByPlaceholder('Password');
    await password.fill('test12345');

    await page.getByRole("button", {name: "Log in"}).click();

    await expect(page.getByRole('heading', { name: 'Log in' })).not.toBeVisible()
    await expect(page.getByText('Create')).toBeVisible();

  });
})