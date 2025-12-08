import { Page, Locator, expect } from "@playwright/test";

export class RadioButtonPage {
  readonly page: Page;

  readonly yesLabel: Locator;
  readonly impressiveLabel: Locator;
  readonly noLabel: Locator;
  readonly resultText: Locator;

  constructor(page: Page) {
    this.page = page;

    // Selecting based on visible label text
    this.yesLabel = page.locator("label[for='yesRadio']");
    this.impressiveLabel = page.locator("label[for='impressiveRadio']");
    this.noLabel = page.locator("label[for='noRadio']");
    this.resultText = page.locator(".mt-3");
  }

  async navigate() {
    await this.page.goto("https://demoqa.com/radio-button");
  }

  async clickYes() {
    await this.yesLabel.click();
  }

  async clickImpressive() {
    await this.impressiveLabel.click();
  }

  async assertYesSelected() {
    await expect(this.resultText).toContainText("Yes");
  }

  async assertImpressiveSelected() {
    await expect(this.resultText).toContainText("Impressive");
  }

  async assertNoIsDisabled() {
    await expect(this.noLabel).toHaveClass(/disabled/);
  }
}
