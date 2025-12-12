import { test } from "@playwright/test";
import { PracticeFormPage } from "../pages/PracticeFormPage";
import path from "path";

test.describe("Practice Form Automation", () => {

  test("Fill and submit complete practice form", async ({ page }) => {
    const practiceForm = new PracticeFormPage(page);

    // Navigate to the practice form page
    await practiceForm.navigate();

    // Fill First Name
    await practiceForm.fillFirstName("User Name");

    // Fill Last Name
    await practiceForm.fillLastName("One");

    // Fill Email
    await practiceForm.fillEmail("testuser@yopmail.com");

    // Select Gender - Male
    await practiceForm.selectGender("Male");

    // Fill Mobile Number
    await practiceForm.fillMobile("1234567890");

    // Select Current Date for Date of Birth
    await practiceForm.selectCurrentDate();

    // Fill Subject - Maths
    await practiceForm.fillSubject("Maths");

    // Select Hobbies - Reading and Sports
    await practiceForm.selectHobbies(["Reading", "Sports"]);

    // Upload Picture
    const imagePath = path.join(__dirname, "..", "test-data", "test-image.png");
    await practiceForm.uploadPicture(imagePath);

    // Fill Current Address
    await practiceForm.fillCurrentAddress("Dummy Address");

    // Select State - NCR
    await practiceForm.selectState("NCR");

    // Select City - Delhi
    await practiceForm.selectCity("Delhi");

    // Wait a moment to ensure all fields are properly set
    await page.waitForTimeout(500);

    // Submit the form
    await practiceForm.clickSubmit();

    // Verify submission dialog appears
    await practiceForm.verifySubmissionDialogAppears();

    // Get current date for validation
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')} ${today.toLocaleString('en-US', { month: 'long' })},${today.getFullYear()}`;

    // Verify all successfully submitted data
    await practiceForm.verifySubmittedData({
      studentName: "User Name One",
      studentEmail: "testuser@yopmail.com",
      gender: "Male",
      mobile: "1234567890",
      dateOfBirth: formattedDate,
      subjects: "Maths",
      hobbies: "Reading, Sports", // Hobbies appear in the order they're checked
      picture: "test-image.png",
      address: "Dummy Address",
      stateAndCity: "NCR Delhi"
    });

    // Take screenshot of submission dialog for visual verification
    await page.screenshot({ path: 'test-results/practice-form-submission.png' });

    // Note: Closing the dialog is optional since ads may interfere
    // await practiceForm.closeSubmissionDialog();
  });

});
