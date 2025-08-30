import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly cartQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.cartQuantity = page.locator('.cart_quantity');
    this.checkoutButton = page.getByRole('link', { name: 'Proceed To Checkout' });
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async checkItemQuantity() {
    const qtyText = await this.cartQuantity.textContent(); // return "number"
    return parseInt(qtyText || '0', 10);                  // transform to number
  } 

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
