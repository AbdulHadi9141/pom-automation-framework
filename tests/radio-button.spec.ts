import { test } from "@playwright/test";
import { RadioButtonPage } from "../pages/radio-button-page";

test.describe("Radio Button Automation", () => {

  test("Validate Yes, Impressive, and No disabled", async ({ page }) => {
    const radio = new RadioButtonPage(page);

    await radio.navigate();

    // ✔ YES radio button
    await radio.clickYes();
    await radio.assertYesSelected();

    // ✔ IMPRESSIVE radio button
    await radio.clickImpressive();
    await radio.assertImpressiveSelected();

    // ✔ NO button disabled state
    await radio.assertNoIsDisabled();
  });

});
