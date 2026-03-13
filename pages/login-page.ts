import { BasePage } from './base.page';
import { Locator, Page, expect } from 'playwright/test';
import { env } from '../config/env';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly passwordPreviewButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('#email'); // xpath: '//input[@id='email']'
    this.passwordInput = page.locator('#password'); // xpath: '//input[@id='password']'
    this.loginButton = page.locator('button[type=submit]'); // xpath: '//button[@type='submit']'
    this.passwordPreviewButton = page.locator('button.absolute'); // xpath: '//button[contains(@class, 'absolute')]'
  }

  async open(): Promise<void> {
    await this.navigate(`${env.baseUrl}/login`);
    await this.waitForDomLoad();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForDomLoad();
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async fillPasswordInput(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickPasswordPreviewButton(): Promise<void> {
    await this.passwordPreviewButton.click();
  }

  async verifyPasswordInputValue(expectedValue: string): Promise<void> {
    expect(this.passwordInput).toHaveValue(expectedValue);
  }

  getRequiredFieldError(field: 'Email' | 'Password') {
    return this.page.getByText(`${field} is a required field`, { exact: true });
  }
}