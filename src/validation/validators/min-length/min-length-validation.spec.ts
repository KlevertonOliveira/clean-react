import { InvalidSizeError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";
import { faker } from "@faker-js/faker";

const makeSut = (): MinLengthValidation => (
  new MinLengthValidation( faker.database.column(), 8)
)

describe('MinLengthValidation', () => { 
  test('Should return error when value length is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.string.alphanumeric(7));
    expect(error).toEqual(new InvalidSizeError());
  })
  
  test('Should return null when value length is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.string.alphanumeric(8));
    expect(error).toBeNull();
  })
 })