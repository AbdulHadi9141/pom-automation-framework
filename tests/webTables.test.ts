import { test, expect } from "@playwright/test";
import { WebTablesPage } from "../pages/WebTablesPage";
import { RegistrationFormPage } from "../pages/RegistrationFormPage";

test("Add new record and verify it appears in the Web Table", async ({ page }) => {

  const webTable = new WebTablesPage(page);
  const formPage = new RegistrationFormPage(page);

  await webTable.open();
  await webTable.clickAddButton();

  const user = {
    firstName: "FirstName",
    lastName: "LastName",
    email: "name@example.com",
    age: "30",
    salary: "10000",
    department: "DEV"
  };

  await formPage.fillForm(user);
  await formPage.submit();

  // 🔍 Search the record by email
  await webTable.searchRecord(user.email);

  // Now get searched row
  const row = await webTable.getSearchedRowValues();

  // Assertions
  expect(row.firstName).toBe(user.firstName);
  expect(row.lastName).toBe(user.lastName);
  expect(row.age).toBe(user.age);
  expect(row.email).toBe(user.email);
  expect(row.salary).toBe(user.salary);
  expect(row.department).toBe(user.department);
});
