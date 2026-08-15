import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.locator('#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > p');
    }

    async open(): Promise<void> {
        await this.navigateTo('/');
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

    async login(email: string, pass: string): Promise<void> {
        await this.usernameInput.fill(email);
        await this.passwordInput.fill(pass);
        await this.loginButton.click();
        
        // Ensure user is fully logged in before continuing
        await expect(this.page.getByText(/Logged in as/i)).toBeVisible();
    }
}