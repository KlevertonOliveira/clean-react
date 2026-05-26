import { RequiredFieldError } from "@/validation/errors";
import { RequiredFieldValidation } from "./required-field-validation";
import { faker } from '@faker-js/faker';

describe('RequiredFieldValidation', () => { 
  test ('Should return error message if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    
    const errorMessage = sut.validate('');
    expect(errorMessage).toEqual(new RequiredFieldError());
  })
  
  test ('Should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');
    
    const errorMessage = sut.validate(faker.lorem.word());
    expect(errorMessage).toBeFalsy();
  })
 })