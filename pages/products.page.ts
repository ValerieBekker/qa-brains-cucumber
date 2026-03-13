import { BasePage } from './base.page';
import { Locator, Page, expect } from 'playwright/test';

export class ProductsPage extends BasePage {
  readonly productsContainer: Locator;

  constructor(page: Page) {
    super(page);

    this.productsContainer = page.locator('.products'); // xpath: '//input[@id='email']'
  }

  async isProductsContainerVisible(): Promise<boolean> {
    await this.productsContainer.waitFor();
    return await this.productsContainer.isVisible();
  }
}