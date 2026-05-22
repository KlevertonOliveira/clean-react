import { describe, expect, test } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'; 
import LoginPage from "./login";
import { ValidationSpy } from "@/presentation/test";
import { faker } from '@faker-js/faker';
import type { Authentication, AuthenticationParams } from "@/domain/usecases";
import type { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params!: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy(); 
  const authenticationSpy = new AuthenticationSpy(); 
  validationSpy.errorMessage = params?.validationError ?? '';

  const sut = render(
    <LoginPage 
      validation={validationSpy}
      authentication={authenticationSpy}
    />
  );
  
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('Login Component', () => { 
  test('Should start with initial state', () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
     
    const spinner = sut.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = sut.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();
    
    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();

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
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    const user = userEvent.setup();

    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, faker.internet.email());
 
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
  })
 
  test('Should show password error if Validation fails', async() => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    const user = userEvent.setup();

    const passwordInput = sut.getByTestId('password');
    await user.type(passwordInput, faker.internet.password());
 
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
  })
  
  test('Should show valid email state if Validation succeeds', async() => {
    const { sut } = makeSut();
    
    const user = userEvent.setup();
    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, faker.internet.email());
 
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('');
  })
  
  test('Should show valid password state if Validation succeeds', async() => {
    const { sut } = makeSut();
    
    const passwordInput = sut.getByTestId('password');
    const user = userEvent.setup();
    await user.type(passwordInput, faker.internet.password());
 
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('');
  })
  
  test('Should enable submit button if form is valid', async() => {
    const { sut } = makeSut();
    
    const user = userEvent.setup();
    
    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, faker.internet.email());

    const passwordInput = sut.getByTestId('password');
    await user.type(passwordInput, faker.internet.password());

    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
  })
  
  test('Should show spinner on submit', async() => {
    const { sut } = makeSut();
    
    const user = userEvent.setup();
    
    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, faker.internet.email());

    const passwordInput = sut.getByTestId('password');
    await user.type(passwordInput, faker.internet.password());

    const submitButton = sut.getByTestId('submit-button');
    await user.click(submitButton);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  })
  
  test('Should call Authentication with correct credentials', async() => {
    const { sut, authenticationSpy } = makeSut();
    
    const user = userEvent.setup();
    
    const email = faker.internet.email();
    const emailInput = sut.getByTestId('email');
    await user.type(emailInput, email);

    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    await user.type(passwordInput, password);

    const submitButton = sut.getByTestId('submit-button');
    await user.click(submitButton);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  })
 })