import { RequiredFieldError } from "@/validation/errors";
import { RequiredFieldValidation } from "./required-field-validation";

describe('RequiredFieldValidation', () => { 
  test ('Should return error message if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    
    const errorMessage = sut.validate('');
    expect(errorMessage).toEqual(new RequiredFieldError());
  })
 })