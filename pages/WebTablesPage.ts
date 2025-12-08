import { expect, Locator, Page } from "@playwright/test";

export class WebTablesPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator("#addNewRecordButton");
    this.tableRows = page.locator(".rt-tbody .rt-tr-group");
  }

  async open() {
    await this.page.goto("https://demoqa.com/webtables");
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async searchRecord(email: string) {
  await this.page.locator('#searchBox').fill(email);
}

async getSearchedRowValues() {
  const row = this.page.locator(".rt-tbody .rt-tr-group").first();
  const cells = row.locator(".rt-td");

  return {
    firstName: await cells.nth(0).innerText(),
    lastName: await cells.nth(1).innerText(),
    age: await cells.nth(2).innerText(),
    email: await cells.nth(3).innerText(),
    salary: await cells.nth(4).innerText(),
    department: await cells.nth(5).innerText(),
  };
}

}
