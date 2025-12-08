import { Page, Locator, expect } from "@playwright/test";

export class CheckBoxPage {

    readonly page: Page;
    readonly expandAllBtn: Locator;
    readonly collapseAllBtn: Locator;

    // Locators for checkboxes
    readonly homeToggle: Locator;
    readonly desktopToggle: Locator;
    readonly notesCheckbox: Locator;
    readonly commandsCheckbox: Locator;

    readonly resultText: Locator;

    constructor(page: Page) {
        this.page = page;

        // Expand / Collapse
        this.expandAllBtn = page.locator(".rct-option-expand-all");
        this.collapseAllBtn = page.locator(".rct-option-collapse-all");

        // Toggles
        this.homeToggle = page.locator('button[title="Toggle"]').first();
        this.desktopToggle = page.locator('label:has-text("Desktop") button');

        // Checkboxes
        this.notesCheckbox = page.locator('label[for="tree-node-notes"]');
        this.commandsCheckbox = page.locator('label[for="tree-node-commands"]');

        // Result
        this.resultText = page.locator("#result");
    }

    async navigate() {
        await this.page.goto("https://demoqa.com/checkbox");
    }

    async expandAll() {
        await this.expandAllBtn.click();
    }

    async selectNotes() {
        await this.notesCheckbox.click();
    }

    async selectCommands() {
        await this.commandsCheckbox.click();
    }

    async validateSelection(expectedItems: string[]) {
        for (const item of expectedItems) {
            await expect(this.resultText).toContainText(item.toLowerCase());
        }
    }
}
