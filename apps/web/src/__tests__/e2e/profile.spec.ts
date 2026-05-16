import { test, expect } from '@playwright/test';

test.describe('profile', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:5173/')

        await page.getByText('Sign in').click()
        await page.getByPlaceholder('Email').fill('test1@gmail.com')
        await page.getByPlaceholder('Password').fill('test12345')
        await page.getByRole('button', { name: 'Log in' }).click()
        await page.waitForLoadState('networkidle')
    })

    test('should open users profile', async ({page}) => {

        await page.getByTestId('userAvatar').click();
        await page.getByRole("button", {name: 'Profile', exact: true}).click();

        await page.waitForURL('**/profile/**')
        await page.waitForLoadState('networkidle')

        await expect(page.getByTestId('userProfile')).toBeDefined();

    })
})