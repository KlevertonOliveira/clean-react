import { describe, expect, test } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'; 
import LoginPage from "./login";
import type { Validation } from "@/presentation/protocols/validation";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
}

class ValidationSpy implements Validation {
  errorMessage!: string;
  input!: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
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

    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, 'any_email');
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
    
    const passwordInput = sut.getByTestId('password');
    await user.type(passwordInput, 'any_password');
    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
 })