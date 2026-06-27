import { faker } from "@faker-js/faker";
import type { AddAccountParams } from "../usecases";

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();

  return {
    name: faker.lorem.word(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  };
};