import { FieldValidationSpy } from "../test/mock-field-validation";
import { ValidationComposite } from "./validation-composite";
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpyList: FieldValidationSpy[];
}

const makeSut = ({ fieldName }: { fieldName: string }): SutTypes => {
  const fieldValidationSpyList = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = new ValidationComposite(fieldValidationSpyList);

  return { sut, fieldValidationSpyList }
}

describe('ValidationComposite', () => { 
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationSpyList } = makeSut({ fieldName });

    const firstErrorMessage = faker.lorem.word();
    fieldValidationSpyList[0].error = new Error(firstErrorMessage);
    const secondErrorMessage = faker.lorem.word();
    fieldValidationSpyList[1].error = new Error(secondErrorMessage);

    const error = sut.validate(fieldName, faker.lorem.word());
    expect(error).toBe(firstErrorMessage);
  })

  test('Should return falsy if there is no error', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut({ fieldName });
    
    const error = sut.validate(fieldName, faker.lorem.word());
    expect(error).toBeFalsy();
  })
 })