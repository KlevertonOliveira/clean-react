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

  test('Should return falsy if compare is valid', () => {
    const fieldValue = faker.lorem.word();
    const sut = makeSut(fieldValue);
    const error = sut.validate(fieldValue);
    expect(error).toBeFalsy();
  });
});