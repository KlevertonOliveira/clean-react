import { CompareFieldsValidation } from "./compare-fields-validation";
import { InvalidFieldError } from "@/validation/errors";
import { faker } from '@faker-js/faker';

const makeSut = (field: string, fieldToCompare: string): CompareFieldsValidation => (
  new CompareFieldsValidation(field, fieldToCompare)
);

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.lorem.word(),
      [fieldToCompare]: faker.lorem.word()
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const fieldValue = faker.lorem.word();

    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: fieldValue,
      [fieldToCompare]: fieldValue
    });
    expect(error).toBeFalsy();
  });
});