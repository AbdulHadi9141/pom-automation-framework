import { test } from "@playwright/test";
import { CheckBoxPage } from "../pages/checkbox.page";

test.describe("DemoQA Checkbox Automation", () => {

  test("Select Notes & Commands under Desktop", async ({ page }) => {

    const checkbox = new CheckBoxPage(page);

    // Navigate
    await checkbox.navigate();

    // Expand all so items are visible
    await checkbox.expandAll();

    // Select two checkboxes
    await checkbox.selectNotes();
    await checkbox.selectCommands();

    // Validate selections
    await checkbox.validateSelection(["notes", "commands"]);
  });

});
