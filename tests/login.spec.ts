import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';
import { generateRamdonUserData } from '../utils/generateData';

test.describe('User Operations Flow', () => {
    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);

        const { name, email, userDetails } = generateRamdonUserData();
        await signupPage.registerAndKeepLoggedIn(name, email, userDetails);
    });

    test.afterEach(async () => {
        await signupPage.deleteAccount();
    });

    test('Should perform user actions when logged in', async ({ page }) => {
        await expect(page.getByText(/Logged in as/i)).toBeVisible();
    });
});