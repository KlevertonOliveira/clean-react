import { describe, expect, test } from "vitest";
import { render, type RenderResult, cleanup } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event'; 
import LoginPage from "./login";
import { ValidationSpy } from "@/presentation/test";
import { faker } from '@faker-js/faker';
import { AuthenticationSpy } from "@/presentation/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors";

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

const fillEmailField = async(
  sut: RenderResult, 
  email = faker.internet.email()
): Promise<void> => {
  const user = userEvent.setup();
  const emailInput = sut.getByTestId('email');
  await user.type(emailInput, email);
}

const fillPasswordField = async(
  sut: RenderResult, 
  password = faker.internet.password()
): Promise<void> => {
  const user = userEvent.setup();
  const passwordInput = sut.getByTestId('password');
  await user.type(passwordInput, password);
}

const simulateValidSubmit = async(
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const user = userEvent.setup();
    
  await fillEmailField(sut, email);
  await fillPasswordField(sut, password);

  const submitButton = sut.getByTestId('submit-button');
  await user.click(submitButton);
}

describe('Login Component', () => { 
  afterEach(cleanup);
  beforeEach(() => localStorage.clear());

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

    const email = faker.internet.email();
    await fillEmailField(sut, email);
    
    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  })

  test('Should call Validation with correct password', async() => {
    const { sut, validationSpy } = makeSut();

    const password = faker.internet.password();
    await fillPasswordField(sut, password);
    
    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  })

  test('Should show email error if Validation fails', async() => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });

    await fillEmailField(sut);
 
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
  })
 
  test('Should show password error if Validation fails', async() => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    
    await fillPasswordField(sut);

    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
  })
  
  test('Should show valid email state if Validation succeeds', async() => {
    const { sut } = makeSut();
    
    await fillEmailField(sut);
 
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('');
  })
  
  test('Should show valid password state if Validation succeeds', async() => {
    const { sut } = makeSut();
   
    await fillPasswordField(sut);
 
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('');
  })
  
  test('Should enable submit button if form is valid', async() => {
    const { sut } = makeSut();
    
    await fillEmailField(sut);
    await fillPasswordField(sut);

    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
  })
  
  test('Should show spinner on submit', async() => {
    const { sut } = makeSut();
    
    await simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  })
  
  test('Should call Authentication with correct credentials', async() => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  })
  
  test('Should call Authentication only once', async() => {
    const { sut, authenticationSpy } = makeSut();

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  })
  
  test('Should not call Authentication if form is invalid', async() => {
    const validationError = faker.lorem.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    
    await fillEmailField(sut);
    
    const user = userEvent.setup();
    const submitButton = sut.getByTestId('submit-button');
    await user.click(submitButton);

    expect(authenticationSpy.callsCount).toBe(0);
  })
  
  test('Should present errors if Authentication fails', async() => {
    const { sut, authenticationSpy } = makeSut();
    
    const error = new InvalidCredentialsError();
    vi.spyOn(authenticationSpy, 'auth').mockRejectedValue(error);

    await simulateValidSubmit(sut);

    const formErrorMessage = sut.getByTestId('formErrorMessage');
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  })
  
  test('Should add accessToken to localStorage on Authentication success', async() => {
    const { sut, authenticationSpy } = makeSut();

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    await simulateValidSubmit(sut);

    expect(setItemSpy)
      .toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken);
  })
 })