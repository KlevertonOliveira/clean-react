import { faker } from '@faker-js/faker';
import type { HttpPostParams } from '../protocols/http';

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: { test: faker.internet.exampleEmail() }
})