import {Page, Locator} from 'playwright/test';
import {BasePage} from './BasePage';

export class LoginPage extends BasePage {
    //login locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        //login elements
        this.usernameInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.errorMessage = page.locator('#form > div > div > div.col-sm-4.col-sm-offset-1 > div > form > p');


    }
    async open(): Promise<void> {
        await this.navigateTo('/');
        await this.getTitle();
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

}
