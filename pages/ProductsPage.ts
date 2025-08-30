import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly firstProduct: Locator;
  readonly addToCartButton: Locator;
  readonly sucessModal: Locator;
  readonly modalTitle: Locator;
  readonly modalContent: Locator;
  readonly modalFooter: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.firstProduct = page.locator('.features_items .product-image-wrapper').first();
    this.addToCartButton = page.locator('.features_items .add-to-cart').first();
    this.sucessModal = page.locator('.modal-content');
    this.modalTitle = page.locator('.modal-title');
    this.modalContent = page.locator('.modal-body');
    this.modalFooter = page.locator('.modal-footer');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async search(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
    await expect(this.page.getByText('Added!')).toBeVisible();
    await expect(this.page.getByText('Your product has been added to cart.')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();
    await this.continueShoppingButton.click();
  }
}