import { faker } from "@faker-js/faker";
import type { Page } from "@playwright/test";

export const mockUnexpectedError = async (page: Page, url: string) => {
  await page.route(`*/**/api${url}`, async route => {
    await route.fulfill({ status: faker.helpers.arrayElement([400, 500]) });
  });
};

export const mockInvalidCredentialsError = async (page: Page, url: string) => {
  await page.route(`*/**/api${url}`, async route => {
    await route.fulfill({ status: 401 });
  });
};

export const mockInvalidReturnData = async (page: Page, url: string) => {
  await page.route(`*/**/api${url}`, async route => {
    await route.fulfill({
      status: 200,
      json: { invalidProperty: faker.string.uuid() }
    });
  });
};

export const mockSuccessfulRequest = async ({ page, url, response, callback }: {
  page: Page,
  url: string,
  response: any,
  callback?: VoidFunction;
}) => {
  await page.route(`*/**/api${url}`, async route => {
    if (callback) { callback(); }

    await route.fulfill({
      status: 200,
      json: response
    });
  });
};