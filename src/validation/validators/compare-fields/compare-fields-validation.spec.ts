import { CompareFieldsValidation } from "./compare-fields-validation";
import { InvalidFieldError } from "@/validation/errors";
import { faker } from '@faker-js/faker';

const makeSut = (valueToCompare: string): CompareFieldsValidation => (
  new CompareFieldsValidation(
    faker.database.column(),
    valueToCompare
  )
);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.lorem.word());
    const error = sut.validate(faker.lorem.word());
    expect(error).toEqual(new InvalidFieldError());
  });
});