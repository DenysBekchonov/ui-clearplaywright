import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly signupLoginLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('img[alt="Website for automation practice"]');
    this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login' });
    this.productsLink = page.getByRole('link', { name: ' Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/');
  }

  async clickSignupLogin() {
    await this.signupLoginLink.click();
  }

  async clickProducts() {
    await this.productsLink.click();
  }

  async clickCart() {
    await this.cartLink.click();
  }
}
