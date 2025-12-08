import { Page, Locator, expect } from "@playwright/test";

export class TextBoxPage {
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitBtn: Locator;
  readonly output: Locator;

  constructor(page: Page) {
    this.page = page;

    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitBtn = page.locator('#submit');
    this.output = page.locator('#output');
  }

  async navigate() {
    await this.page.goto("https://demoqa.com/text-box");
  }

  async fillForm(fullName: string, email: string, currentAdd: string, permanentAdd: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAdd);
    await this.permanentAddressInput.fill(permanentAdd);
  }

  async submitForm() {
    await this.submitBtn.click();
  }

  async verifyOutput(fullName: string, email: string) {
    await expect(this.output).toContainText(fullName);
    await expect(this.output).toContainText(email);
  }
}
