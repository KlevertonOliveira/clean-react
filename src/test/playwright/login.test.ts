import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
test.describe("Login", () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`);
    await expect(page).toHaveTitle("4Dev - Surveys for programmers");
  });

  test("Should load with correct initial state", async ({ page }) => {
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

  test("Should present valid state if form is valid", async ({ page }) => {
    await page.getByTestId("email").fill(faker.internet.email());
    await expect(page.getByTestId("email-status")).toHaveAttribute("title", "");

    await page.getByTestId("password").fill(faker.internet.password());
    await expect(page.getByTestId("password-status")).toHaveAttribute("title", "");

    await expect(page.getByTestId("submit-button")).toBeEnabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present error if invalid credentials are provided", async ({
    page, baseURL }) => {
    await page.route('*/**/api/login', async route => {
      await route.fulfill({ status: 401 });
    });

    await page.getByTestId("email").fill(faker.internet.email());
    await page.getByTestId("password").fill(faker.internet.password());
    await page.getByTestId("submit-button").click();

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Invalid credentials");
    expect(page.url()).toEqual(`${baseURL}/login`);
  });

  test("Should present save access token if valid credentials are provided", async ({ page, baseURL }) => {
    const accessToken = faker.string.uuid();

    await page.route("*/**/api/login", async route => {
      await route.fulfill({
        status: 200,
        json: { accessToken }
      });
    });

    await page.getByTestId("email").fill(faker.internet.email());
    await page.getByTestId("password").fill(faker.internet.password());
    await page.getByTestId("submit-button").click();

    expect(page.url()).toEqual(`${baseURL}/`);
    expect(await page.localStorage.getItem('accessToken')).toEqual(accessToken);
  });
});