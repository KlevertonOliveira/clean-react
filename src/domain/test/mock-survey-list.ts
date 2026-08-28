import { faker } from "@faker-js/faker";
import type { SurveyModel } from "../models";

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.string.uuid(),
  question: faker.lorem.words(10),
  answers: [
    { answer: faker.lorem.words(3), image: faker.internet.url() },
    { answer: faker.lorem.words(5) }
  ],
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent(),
});

export const mockSurveyList = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
]);