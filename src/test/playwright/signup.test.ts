
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
});