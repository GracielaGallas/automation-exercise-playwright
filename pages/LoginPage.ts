import {Page, Locator} from 'playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage {
    //login locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    // signup locators
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        super(page);
        //login elements
        this.usernameInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.locator('#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > p');

        //signup elements
        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');


    }
    async open(): Promise<void> {
        await this.navigateTo('/');
        await this.getTitle();
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

    async signup(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
}
