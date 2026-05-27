import { InvalidFieldError } from "@/validation/errors";
import { EmailValidation } from "./email-validation";
import { faker } from '@faker-js/faker';

describe('EmailValidation', () => { 
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.lorem.word());
    const error = sut.validate(faker.lorem.word());

    expect(error).toEqual(new InvalidFieldError())
  })
  
  test('Should return null if email is valid', () => {
    const sut = new EmailValidation(faker.lorem.word());
    const error = sut.validate(faker.internet.email());

    expect(error).toBeNull();
  })
 })