import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('User can search and add product to cart', async ({ page }) => {
  const home = new HomePage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);

  // Step 1: Open home page
  await test.step('Home page is opened', async () => {
    await home.goto();
    await expect(home.logo).toBeVisible();
  });

  // Step 2: Go to products page
  await test.step('Navigate to Products page', async () => {
    await home.clickProducts();
    await expect(products.searchInput).toBeVisible();
  });

  // Step 3: Search for a product
  await test.step('Search for T-Shirt', async () => {
    await products.search('T-Shirt');
    await expect(products.firstProduct).toBeVisible();
  });

  // Step 4: Add first product to cart
  await test.step('Add first product to cart and verify modal', async () => {
    await products.addFirstProductToCart();
  });

  // Step 5: Go to cart
  await test.step('Open Cart page', async () => {
    await home.clickCart();
    await expect(cart.cartItems.first()).toBeVisible();
  });

  // Step 6: Verify cart has items
  await test.step('Check that cart has items', async () => {
    const count = await cart.checkItemQuantity();
    expect(count).toBeGreaterThan(0);
  });
});
