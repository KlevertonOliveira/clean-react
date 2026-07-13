import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
test.describe("Login", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/login");
  });

  test("Should load with correct initial state", async ({ page }) => {
    await expect(page).toHaveTitle("4Dev - Surveys for programmers");

    await expect(page.getByTestId("email-status")).toBeVisible();
    await expect(page.getByTestId("email-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("password-status")).toBeVisible();
    await expect(page.getByTestId("password-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present error state if form is invalid", async ({ page }) => {
    await page.getByTestId("email").fill(faker.lorem.word());
    await expect(page.getByTestId("email-status")).toHaveAttribute("title", "Invalid field value");

    await page.getByTestId("password").fill(faker.lorem.word());
    await expect(page.getByTestId("password-status")).toHaveAttribute("title", "Invalid size error!");

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });
});