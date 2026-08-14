import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface UserData {
    title?: 'Mr' | 'Mrs';
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company?: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
}

export class SignupPage extends BasePage {
    // Initial Signup Locators
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator; 

    // Detailed Form Locators
    readonly titleMrRadio: Locator;
    readonly titleMrsRadio: Locator;
    readonly passwordInput: Locator;
    readonly daySelect: Locator;
    readonly monthSelect: Locator;
    readonly yearSelect: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        super(page);

        // Initial Signup locators
        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]'); 

        // Detailed Form locators
        this.titleMrRadio = page.locator('#id_gender1');
        this.titleMrsRadio = page.locator('#id_gender2');
        this.passwordInput = page.locator('#password');
        this.daySelect = page.locator('#days');
        this.monthSelect = page.locator('#months');
        this.yearSelect = page.locator('#years');
        this.firstNameInput = page.locator('#first_name');
        this.lastNameInput = page.locator('#last_name');
        this.companyInput = page.locator('#company');
        this.addressInput = page.locator('#address1');
        this.address2Input = page.locator('#address2');
        this.countrySelect = page.locator('#country');
        this.stateInput = page.locator('#state');
        this.cityInput = page.locator('#city');
        this.zipcodeInput = page.locator('#zipcode');
        this.mobileNumberInput = page.locator('#mobile_number');
        this.createAccountButton = page.locator('[data-qa="create-account"]'); 
    }

    async open(): Promise<void> {
        await this.navigateTo('/');
        await this.page.getByRole('link', { name: ' Signup / Login' }).click();
    }

    // Step 1: Fill in the initial signup form
    async fillInitialSignupForm(name: string, email: string): Promise<void> {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
        await expect(this.page).toHaveURL(/.*signup/);
    }

    // Step 2: Complete registration with details
    async completeRegistration(details: UserData): Promise<void> {
        if (details.title === 'Mrs') {
            await this.titleMrsRadio.check();
        } else {
            await this.titleMrRadio.check();
        }

        await this.passwordInput.fill(details.password);
        await this.daySelect.selectOption(details.day);
        await this.monthSelect.selectOption(details.month);
        await this.yearSelect.selectOption(details.year);

        await this.firstNameInput.fill(details.firstName);
        await this.lastNameInput.fill(details.lastName);
        if (details.company) await this.companyInput.fill(details.company);
        await this.addressInput.fill(details.address);
        if (details.address2) await this.address2Input.fill(details.address2);
        await this.countrySelect.selectOption(details.country);
        await this.stateInput.fill(details.state);
        await this.cityInput.fill(details.city);
        await this.zipcodeInput.fill(details.zipcode);
        await this.mobileNumberInput.fill(details.mobileNumber);

        await this.createAccountButton.click();
        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }
}