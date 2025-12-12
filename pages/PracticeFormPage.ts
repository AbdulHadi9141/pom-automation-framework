import { Locator, Page, expect } from "@playwright/test";

export class PracticeFormPage {
  readonly page: Page;

  // Form field locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly genderOtherRadio: Locator;
  readonly mobileInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly hobbySportsCheckbox: Locator;
  readonly hobbyReadingCheckbox: Locator;
  readonly hobbyMusicCheckbox: Locator;
  readonly pictureUploadInput: Locator;
  readonly currentAddressTextarea: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitBtn: Locator;

  // Submission dialog locators
  readonly submissionDialog: Locator;
  readonly closeDialogBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Form fields
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#userEmail");
    this.genderMaleRadio = page.locator("label[for='gender-radio-1']");
    this.genderFemaleRadio = page.locator("label[for='gender-radio-2']");
    this.genderOtherRadio = page.locator("label[for='gender-radio-3']");
    this.mobileInput = page.locator("#userNumber");
    this.dateOfBirthInput = page.locator("#dateOfBirthInput");
    this.subjectsInput = page.locator("#subjectsInput");
    this.hobbySportsCheckbox = page.locator("label[for='hobbies-checkbox-1']");
    this.hobbyReadingCheckbox = page.locator("label[for='hobbies-checkbox-2']");
    this.hobbyMusicCheckbox = page.locator("label[for='hobbies-checkbox-3']");
    this.pictureUploadInput = page.locator("#uploadPicture");
    this.currentAddressTextarea = page.locator("#currentAddress");
    this.stateDropdown = page.locator("#state");
    this.cityDropdown = page.locator("#city");
    this.submitBtn = page.locator("#submit");

    // Submission dialog
    this.submissionDialog = page.locator(".modal-content");
    this.closeDialogBtn = page.locator("#closeLargeModal");
  }

  async navigate() {
    await this.page.goto("https://demoqa.com/automation-practice-form");
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async selectGender(gender: "Male" | "Female" | "Other") {
    if (gender === "Male") {
      await this.genderMaleRadio.click();
    } else if (gender === "Female") {
      await this.genderFemaleRadio.click();
    } else {
      await this.genderOtherRadio.click();
    }
  }

  async fillMobile(mobile: string) {
    await this.mobileInput.fill(mobile);
  }

  async selectDateOfBirth(date: Date) {
    await this.dateOfBirthInput.click();

    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear().toString();
    const day = date.getDate();

    // Select month
    await this.page.locator(".react-datepicker__month-select").selectOption(month);

    // Select year
    await this.page.locator(".react-datepicker__year-select").selectOption(year);

    // Select day
    await this.page.locator(`.react-datepicker__day--0${day.toString().padStart(2, '0')}:not(.react-datepicker__day--outside-month)`).first().click();
  }

  async selectCurrentDate() {
    const today = new Date();
    await this.selectDateOfBirth(today);
  }

  async fillSubject(subject: string) {
    // Clear any existing subjects first by clicking the clear button if present
    const clearButton = this.page.locator('.subjects-auto-complete__clear-indicator');
    if (await clearButton.isVisible()) {
      await clearButton.click();
    }
    // Click on the input to focus it
    await this.subjectsInput.click();
    // Type the subject using pressSequentially (not deprecated)
    await this.subjectsInput.pressSequentially(subject);
    // Wait a bit for autocomplete to appear
    await this.page.waitForTimeout(300);
    // Press Enter to select
    await this.page.keyboard.press("Enter");
  }

  async selectHobbies(hobbies: string[]) {
    for (const hobby of hobbies) {
      if (hobby.toLowerCase() === "sports") {
        await this.hobbySportsCheckbox.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
        await this.hobbySportsCheckbox.click({ force: true });
      } else if (hobby.toLowerCase() === "reading") {
        await this.hobbyReadingCheckbox.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
        await this.hobbyReadingCheckbox.click({ force: true });
      } else if (hobby.toLowerCase() === "music") {
        await this.hobbyMusicCheckbox.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(200);
        await this.hobbyMusicCheckbox.click({ force: true });
      }
    }
  }

  async uploadPicture(filePath: string) {
    await this.pictureUploadInput.setInputFiles(filePath);
  }

  async fillCurrentAddress(address: string) {
    await this.currentAddressTextarea.fill(address);
  }

  async selectState(state: string) {
    await this.stateDropdown.scrollIntoViewIfNeeded();
    // Click on the state container to open dropdown
    await this.page.locator('#state').click({ force: true });
    // Type the state name - this will filter and select
    await this.page.keyboard.insertText(state);
    await this.page.keyboard.press("Enter");
  }

  async selectCity(city: string) {
    await this.cityDropdown.scrollIntoViewIfNeeded();
    // Wait for city dropdown to be enabled after state selection
    await this.page.waitForTimeout(500);
    // Click on the city container to open dropdown
    await this.page.locator('#city').click({ force: true });
    // Type the city name - this will filter and select
    await this.page.keyboard.insertText(city);
    await this.page.keyboard.press("Enter");
  }

  async clickSubmit() {
    await this.submitBtn.scrollIntoViewIfNeeded();
    // Wait a bit to ensure page is ready
    await this.page.waitForTimeout(500);
    // Ensure submit button is ready and clickable
    await this.submitBtn.waitFor({ state: 'visible' });
    await this.submitBtn.click({ force: true });
    // Wait for any submission processing
    await this.page.waitForTimeout(1000);
  }

  async verifySubmissionDialogAppears() {
    // Wait for the modal to appear with increased timeout
    await expect(this.submissionDialog).toBeVisible({ timeout: 10000 });
    await expect(this.page.locator(".modal-header")).toContainText("Thanks for submitting the form");
  }

  async verifySubmittedData(expectedData: {
    studentName?: string;
    studentEmail?: string;
    gender?: string;
    mobile?: string;
    dateOfBirth?: string;
    subjects?: string;
    hobbies?: string;
    picture?: string;
    address?: string;
    stateAndCity?: string;
  }) {
    const tableRows = this.page.locator(".table tbody tr");

    if (expectedData.studentName) {
      await expect(tableRows.filter({ hasText: "Student Name" })).toContainText(expectedData.studentName);
    }
    if (expectedData.studentEmail) {
      await expect(tableRows.filter({ hasText: "Student Email" })).toContainText(expectedData.studentEmail);
    }
    if (expectedData.gender) {
      await expect(tableRows.filter({ hasText: "Gender" })).toContainText(expectedData.gender);
    }
    if (expectedData.mobile) {
      await expect(tableRows.filter({ hasText: "Mobile" })).toContainText(expectedData.mobile);
    }
    if (expectedData.dateOfBirth) {
      await expect(tableRows.filter({ hasText: "Date of Birth" })).toContainText(expectedData.dateOfBirth);
    }
    if (expectedData.subjects) {
      await expect(tableRows.filter({ hasText: "Subjects" })).toContainText(expectedData.subjects);
    }
    if (expectedData.hobbies) {
      await expect(tableRows.filter({ hasText: "Hobbies" })).toContainText(expectedData.hobbies);
    }
    if (expectedData.picture) {
      await expect(tableRows.filter({ hasText: "Picture" })).toContainText(expectedData.picture);
    }
    if (expectedData.address) {
      await expect(tableRows.filter({ hasText: "Address" })).toContainText(expectedData.address);
    }
    if (expectedData.stateAndCity) {
      await expect(tableRows.filter({ hasText: "State and City" })).toContainText(expectedData.stateAndCity);
    }
  }

  async closeSubmissionDialog() {
    await this.closeDialogBtn.click();
  }

  // Validation error verification methods
  // The form uses HTML5 validation with :invalid pseudo-class
  // Check by evaluating validity state
  async verifyFirstNameHasError() {
    const isInvalid = await this.firstNameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
    // Also check for visual indicator (red border via CSS)
    await expect(this.firstNameInput).toHaveCSS('border-color', /rgb\(220, 53, 69\)|rgb\(255, 0, 0\)|red/);
  }

  async verifyLastNameHasError() {
    const isInvalid = await this.lastNameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
    await expect(this.lastNameInput).toHaveCSS('border-color', /rgb\(220, 53, 69\)|rgb\(255, 0, 0\)|red/);
  }

  async verifyEmailHasError() {
    const isInvalid = await this.emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  }

  async verifyMobileHasError() {
    const isInvalid = await this.mobileInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
    await expect(this.mobileInput).toHaveCSS('border-color', /rgb\(220, 53, 69\)|rgb\(255, 0, 0\)|red/);
  }

  async verifyGenderHasError() {
    const genderInput = this.page.locator("input[name='gender']").first();
    const isInvalid = await genderInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  }

  async verifyAllRequiredFieldsHaveErrors() {
    await this.verifyFirstNameHasError();
    await this.verifyLastNameHasError();
    await this.verifyGenderHasError();
    await this.verifyMobileHasError();
  }

  async verifyFirstNameValid() {
    const isValid = await this.firstNameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBeTruthy();
  }

  async verifyLastNameValid() {
    const isValid = await this.lastNameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBeTruthy();
  }

  async verifyMobileValid() {
    const isValid = await this.mobileInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBeTruthy();
  }
}
