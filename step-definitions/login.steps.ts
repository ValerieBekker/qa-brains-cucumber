import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { expect } from 'playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products.page';

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let productsPage: ProductsPage;

const testUser = {
  email: 'test@qabrains.com',
  password: 'Password123',
};

Before(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    baseURL: process.env.BASE_URL
  });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
});

Given('user is on login page', async () => {
  await loginPage.open();
});

When('user enters valid credentials', async () => {
  await loginPage.login(testUser.email, testUser.password);
});

Then('user should see products page', async () => {
  const visible = await productsPage.isProductsContainerVisible();
  expect(visible).toBeTruthy();
});

After(async () => {
  await browser.close();
});