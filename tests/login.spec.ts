import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { generateRamdonUserData } from '../utils/generateData';

test.describe('Signup Tests', () => {
    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        await signupPage.open();
    });

    test('Should register a new user successfully', async ({ page }) => {
        // Destructure generated dynamic user data
        const { name, email, userDetails } = generateRamdonUserData();

        // Step 1: Submit initial name and email form
        await signupPage.fillInitialSignupForm(name, email);

        // Step 2: Fill detailed profile information and submit
        await signupPage.completeRegistration(userDetails);

        await expect(
            page.getByText('Account Created!', { exact: false })
        ).toBeVisible();
    });
});