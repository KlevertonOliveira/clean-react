
import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
test.describe("SignUp", () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/signup`, { waitUntil: "load" });
    await expect(page.getByTestId("signup-form")).toBeVisible();
  });

  test("Should load with correct initial state", async ({ page }) => {
    await expect(page.getByTestId("name-error-status")).toBeVisible();
    await expect(page.getByTestId("name-error-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("email-error-status")).toBeVisible();
    await expect(page.getByTestId("email-error-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("password-error-status")).toBeVisible();
    await expect(page.getByTestId("password-error-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("confirmPassword-error-status")).toBeVisible();
    await expect(page.getByTestId("confirmPassword-error-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present error state if form is invalid", async ({ page }) => {
    await page.getByTestId("name").fill(faker.string.alphanumeric(3));
    await expect(page.getByTestId("name-error-status")).toHaveAttribute("title", "Invalid field size (minimum: 5)");

    await page.getByTestId("email").fill(faker.lorem.word());
    await expect(page.getByTestId("email-error-status")).toHaveAttribute("title", "Invalid field value");

    await page.getByTestId("password").fill(faker.string.alphanumeric(3));
    await expect(page.getByTestId("password-error-status")).toHaveAttribute("title", "Invalid field size (minimum: 8)");

    await page.getByTestId("confirmPassword").fill(faker.string.alphanumeric(2));
    await expect(page.getByTestId("confirmPassword-error-status")).toHaveAttribute("title", "Invalid field value");

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });
});