import { InvalidSizeError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";

describe('MinLengthValidation', () => { 
  test('Should return error when value length is invalid', () => {
    const sut = new MinLengthValidation('field', 8);
    const error = sut.validate('123');
    expect(error).toEqual(new InvalidSizeError());
  })
 })