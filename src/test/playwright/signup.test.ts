
import { faker } from "@faker-js/faker";
import { test, expect, type Page } from "@playwright/test";

const populateFieldsCorrectly = async (page: Page) => {
  const password = faker.internet.password();
  await page.getByTestId("name").fill(faker.string.alphanumeric(7));
  await page.getByTestId("email").fill(faker.internet.email());
  await page.getByTestId("password").fill(password);
  await page.getByTestId("confirmPassword").fill(password);
};

const simulateValidSubmit = async (page: Page) => {
  populateFieldsCorrectly(page);
  await expect(page.getByTestId("submit-button")).toBeEnabled();
  await page.getByTestId("submit-button").click();
};

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

  test("Should present valid state if form is valid", async ({ page }) => {
    await page.getByTestId("name").fill(faker.string.alphanumeric(7));
    await expect(page.getByTestId("name-error-status")).not.toBeVisible();

    await page.getByTestId("email").fill(faker.internet.email());
    await expect(page.getByTestId("email-error-status")).not.toBeVisible();

    const password = faker.internet.password();

    await page.getByTestId("password").fill(password);
    await expect(page.getByTestId("password-error-status")).not.toBeVisible();

    await page.getByTestId("confirmPassword").fill(password);
    await expect(page.getByTestId("confirmPassword-error-status")).not.toBeVisible();

    await expect(page.getByTestId("submit-button")).toBeEnabled();
    await expect(page.getByTestId("formErrorMessage")).not.toBeVisible();
  });

  test("Should present EmailInUserError on 403", async ({
    page, baseURL }) => {
    await page.route('*/**/api/signup', async route => {
      await route.fulfill({ status: 403 });
    });

    await simulateValidSubmit(page);

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Email already in use!");
    expect(page.url()).toEqual(`${baseURL}/signup`);
  });

  test("Should present UnexpectedError on default error cases", async ({
    page, baseURL }) => {
    await page.route('*/**/api/signup', async route => {
      await route.fulfill({ status: faker.helpers.arrayElement([400, 500]) });
    });

    await simulateValidSubmit(page);

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Something went wrong. Try again later.");
    expect(page.url()).toEqual(`${baseURL}/signup`);
  });

  test("Should present UnexpectedError if invalid data is returned", async ({ page, baseURL }) => {
    await page.route("*/**/api/signup", async route => {
      await route.fulfill({
        status: 200,
        json: {
          invalidProperty: faker.string.uuid()
        }
      });
    });

    await simulateValidSubmit(page);

    await expect(page.getByTestId("formErrorMessage")).toBeVisible();
    await expect(page.getByTestId("formErrorMessage")).toHaveText("Something went wrong. Try again later.");
    expect(page.url()).toEqual(`${baseURL}/signup`);
  });

  test("Should present save access token if valid credentials are provided", async ({ page, baseURL }) => {
    const accessToken = faker.string.uuid();

    await page.route("*/**/api/signup", async route => {
      await route.fulfill({
        status: 200,
        json: { accessToken }
      });
    });

    await simulateValidSubmit(page);

    expect(await page.localStorage.getItem('accessToken')).toEqual(accessToken);
    expect(page.url()).toEqual(`${baseURL}/`);
  });

  test("Should prevent multiple submits", async ({ page }) => {
    let signUpCallsCount = 0;

    await page.route("*/**/api/signup", async route => {
      signUpCallsCount++;
      await route.fulfill({
        status: 200,
        json: { accessToken: faker.string.uuid() }
      });
    });

    await populateFieldsCorrectly(page);
    await page.getByTestId("submit-button").dblclick();

    expect(signUpCallsCount).toBe(1);
  });

  test("Should prevent submit if form is invalid", async ({ page, baseURL }) => {
    let signUpCallsCount = 0;

    await page.route("*/**/api/signup", async route => {
      signUpCallsCount++;
      await route.fulfill({
        status: 200,
        json: { accessToken: faker.string.uuid() }
      });
    });

    await page.getByTestId("email").fill(faker.internet.email());

    await expect(page.getByTestId("submit-button")).toBeDisabled();
    await page.getByTestId("email").press("Enter");

    expect(signUpCallsCount).toBe(0);
    expect(page.url()).toEqual(`${baseURL}/signup`);
  });

});