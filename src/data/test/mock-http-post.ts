import { faker } from '@faker-js/faker';
import type { HttpPostParams } from '../protocols/http';
import type { AuthenticationParams } from "@/domain/usecases";

export const mockPostRequest = (): HttpPostParams<AuthenticationParams> => ({
  url: faker.internet.url(),
  body: { 
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(), 
  }
})