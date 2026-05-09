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
  const validationSpy = new ValidationSpy()
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

    const emailInputStatus = sut.getByTestId('email-status');
    expect(emailInputStatus).toBeInTheDocument();
    expect(emailInputStatus).toHaveAttribute('title', 'Required field');
    
    const passwordInputStatus = sut.getByTestId('password-status');
    expect(passwordInputStatus).toBeInTheDocument();
    expect(emailInputStatus).toHaveAttribute('title', 'Required field');
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
 })