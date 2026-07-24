import { faker } from "@faker-js/faker";
import { test, expect, type Page } from "@playwright/test";
import { mockInvalidCredentialsError, mockInvalidReturnData, mockSuccessfulRequest, mockUnexpectedError } from "../api-mocks/api-mocks";

const populateFieldsCorrectly = async (page: Page) => {
  await page.getByTestId("email").fill(faker.internet.email());
  await page.getByTestId("password").fill(faker.internet.password());
};

const simulateValidSubmit = async (page: Page) => {
  populateFieldsCorrectly(page);
  await expect(page.getByTestId("submit-button")).toBeEnabled();
  await page.getByTestId("submit-button").click();
};

test.describe("Login", () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/login`, { waitUntil: "load" });
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("Should load with correct initial state", async ({ page }) => {
    await expect(page.getByTestId("email-error-status")).toBeVisible();
    await expect(page.getByTestId("email-error-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("password-error-status")).toBeVisible();
    await expect(page.getByTestId("password-error-status")).toHaveAttribute("title", "Required field");

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present error state if form is invalid", async ({ page }) => {
    await page.getByTestId("email").fill(faker.lorem.word());
    await expect(page.getByTestId("email-error-status")).toHaveAttribute("title", "Invalid field value");

    await page.getByTestId("password").fill(faker.string.alphanumeric(3));
    await expect(page.getByTestId("password-error-status")).toHaveAttribute("title", "Invalid field size (minimum: 8)");

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present valid state if form is valid", async ({ page }) => {
    await populateFieldsCorrectly(page);

    await expect(page.getByTestId("email-error-status")).not.toBeVisible();
    await expect(page.getByTestId("password-error-status")).not.toBeVisible();

    await expect(page.getByTestId("submit-button")).toBeEnabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present InvalidCredentialsError on 401", async ({
    page, baseURL }) => {
    await mockInvalidCredentialsError(page, "/login");

    await simulateValidSubmit(page);

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Invalid credentials");
    expect(page.url()).toEqual(`${baseURL}/login`);
  });

  test("Should present UnexpectedError on default error cases", async ({ page, baseURL }) => {
    await mockUnexpectedError(page, "/login");
    await simulateValidSubmit(page);

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Something went wrong. Try again later.");
    expect(page.url()).toEqual(`${baseURL}/login`);
  });

  test("Should present UnexpectedError if invalid data is returned", async ({ page, baseURL }) => {
    await mockInvalidReturnData(page, "/login");

    await simulateValidSubmit(page);

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Something went wrong. Try again later.");
    expect(page.url()).toEqual(`${baseURL}/login`);
  });

  test("Should prevent submit if form is invalid", async ({ page, baseURL }) => {
    let loginCallCount = 0;

    await mockSuccessfulRequest({
      page,
      url: "/login",
      response: { accessToken: faker.string.uuid() },
      callback: () => { loginCallCount++; }
    });

    await page.getByTestId("email").fill(faker.internet.email());

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await page.getByTestId("email").press("Enter");

    expect(loginCallCount).toBe(0);
    expect(page.url()).toEqual(`${baseURL}/login`);
  });

  test("Should prevent multiple submits", async ({ page }) => {
    let loginCallCount = 0;

    await mockSuccessfulRequest({
      page,
      url: "/login",
      response: { accessToken: faker.string.uuid() },
      callback: () => { loginCallCount++; }
    });

    await populateFieldsCorrectly(page);
    await page.getByTestId("submit-button").dblclick();

    expect(loginCallCount).toBe(1);
  });

  test("Should present save access token if valid credentials are provided", async ({ page, baseURL }) => {
    const accessToken = faker.string.uuid();

    await mockSuccessfulRequest({
      page,
      url: "/login",
      response: { accessToken },
    });

    await simulateValidSubmit(page);

    expect(await page.localStorage.getItem('accessToken')).toEqual(accessToken);
    expect(page.url()).toEqual(`${baseURL}/`);
  });
});