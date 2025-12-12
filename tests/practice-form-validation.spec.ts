import { test, expect } from "@playwright/test";
import { PracticeFormPage } from "../pages/PracticeFormPage";

test.describe("Practice Form Validation Tests", () => {

  test("Verify required field validation errors appear on empty form submission", async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    // Navigate to the practice form page
    await practiceForm.navigate();

    // Click Submit button without filling any fields
    await practiceForm.clickSubmit();

    // Verify all required field validation errors appear (red borders)
    await practiceForm.verifyAllRequiredFieldsHaveErrors();

    // Email should not have error (not required)
    // Date of Birth should not have error (has default value)
    // Other fields are optional

    // Take screenshot showing validation errors
    await page.screenshot({ path: 'test-results/form-validation-errors.png' });
  });

  test("Verify validation errors disappear after filling required fields", async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    // Navigate to the practice form page
    await practiceForm.navigate();

    // Click Submit button to trigger validation
    await practiceForm.clickSubmit();

    // Verify errors are present for all required fields
    await practiceForm.verifyAllRequiredFieldsHaveErrors();

    // Now fill the required fields
    await practiceForm.fillFirstName("Test");
    await practiceForm.fillLastName("User");
    await practiceForm.selectGender("Male");
    await practiceForm.fillMobile("1234567890");

    // Verify validation errors are cleared
    await practiceForm.verifyFirstNameValid();
    await practiceForm.verifyLastNameValid();
    await practiceForm.verifyMobileValid();

    // Take screenshot showing valid state
    await page.screenshot({ path: 'test-results/form-validation-cleared.png' });
  });

});
