import { faker } from "@faker-js/faker";
import type { Page } from "@playwright/test";

export const mockUnexpectedError = async (page: Page, url: string) => {
  await page.route(`*/**/api${url}`, async route => {
    await route.fulfill({ status: faker.helpers.arrayElement([400, 500]) });
  });
};