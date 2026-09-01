class InventoryPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.title = page.locator('.title');
      this.inventoryItems = page.locator('.inventory_item');
    }
  
    async getTitleText() {
      return await this.title.textContent();
    }
  
    async getItemCount() {
      return await this.inventoryItems.count();
    }
  }
  
  module.exports = { InventoryPage };