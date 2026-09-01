const { test, expect } = require('../../src/fixtures/customFixtures');

test.describe('E2E Login Suite', () => {

  test('User can log in successfully with valid credentials', async ({ page, loginPage, inventoryPage }) => {
    // 1. Navigate to the login page
    await loginPage.navigate();

    // 2. Perform login action
    await loginPage.login('standard_user', 'secret_sauce');

    // 3. Assert redirection and page content
    await expect(page).toHaveURL(/.*inventory.html/);
    expect(await inventoryPage.getTitleText()).toBe('Products');
    expect(await inventoryPage.getItemCount()).toBeGreaterThan(0);
  });

});