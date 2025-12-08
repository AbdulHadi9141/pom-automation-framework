import { test } from "@playwright/test";
import { TextBoxPage } from "../pages/TextBoxPage";

test.describe("Text Box Form Automation", () => {
  test("Fill and submit text box form using POM", async ({ page }) => {

    const tb = new TextBoxPage(page);

    await tb.navigate();

    await tb.fillForm(
      "Abdul Hadi",
      "abdul@example.com",
      "Karachi Pakistan",
      "Permanent Address Test"
    );

    await tb.submitForm();

    await tb.verifyOutput(
      "Abdul Hadi",
      "abdul@example.com"
    );
  });
});
