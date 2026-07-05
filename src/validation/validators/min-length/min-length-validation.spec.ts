import { InvalidSizeError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";
import { faker } from "@faker-js/faker";

const makeSut = (field: string): MinLengthValidation => (
  new MinLengthValidation(field, 8)
);

describe('MinLengthValidation', () => {
  test('Should return error when value length is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.string.alphanumeric(7) });
    expect(error).toEqual(new InvalidSizeError());
  });

  test('Should return null when value length is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.string.alphanumeric(8) });
    expect(error).toBeNull();
  });

  test('Should return null if field does not exist in schema', () => {
    const sut = makeSut(faker.database.column());
    const error = sut.validate({
      [faker.database.column()]: faker.string.alphanumeric(8)
    });
    expect(error).toBeNull();
  });
});