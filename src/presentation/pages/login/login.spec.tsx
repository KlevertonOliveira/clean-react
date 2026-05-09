import { describe, expect, test } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'; 
import LoginPage from "./login";
import { ValidationSpy } from "@/presentation/test";
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.lorem.words();

  const sut = render(<LoginPage validation={validationSpy}/>);
  
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => { 
  test('Should start with initial state', () => {
    const { sut } = makeSut();

    const spinner = sut.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = sut.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();
    
    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeDisabled()

    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus).toBeInTheDocument();
    expect(emailStatus.title).toBe('Required field');
    
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus).toBeInTheDocument();
    expect(passwordStatus.title).toBe('Required field');
  });

  test('Should call Validation with correct email', async() => {
    const { sut, validationSpy } = makeSut();
    const user = userEvent.setup();

    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, email);
    
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  })

  test('Should call Validation with correct password', async() => {
    const { sut, validationSpy } = makeSut();
    const user = userEvent.setup();

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    await user.type(passwordInput, password);
    
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  })

  test('Should show email error if Validation fails', async() => {
    const { sut, validationSpy } = makeSut();
    const user = userEvent.setup();

    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, faker.internet.email());
 
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
  })
 })