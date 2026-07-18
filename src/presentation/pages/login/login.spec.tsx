import { describe, expect, test } from "vitest";
import { render, type RenderResult, cleanup } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { LoginPage } from "@/presentation/pages";
import { ValidationSpy, AuthenticationSpy, SaveAccessTokenMock, Helper } from "@/presentation/test";
import { faker } from '@faker-js/faker';
import { InvalidCredentialsError } from "@/domain/errors";
import { RouterProvider } from "@tanstack/react-router";
import { generateTestRouter } from "@/utils/test/test-router-utils";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
  router: ReturnType<typeof generateTestRouter>;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  validationSpy.errorMessage = params?.validationError ?? '';

  const router = generateTestRouter({
    initialLocation: '/login',
    rootRoutecomponent: (
      <LoginPage
        validation={validationSpy}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    )
  });

  const sut = render(<RouterProvider router={router} />);

  return {
    sut,
    validationSpy,
    authenticationSpy,
    saveAccessTokenMock,
    router
  };
};

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const user = userEvent.setup();

  await Helper.populateField(sut, "email", email);
  await Helper.populateField(sut, "password", password);

  const submitButton = sut.getByTestId('submit-button');
  await user.click(submitButton);
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', async () => {
    const validationError = "Required field";
    const { sut } = makeSut({ validationError });
    await sut.findByTestId('login-form');

    const spinner = sut.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = sut.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();

    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();

    const fields = ["email", "password"];

    for (const field of fields) {
      Helper.testErrorStatusForField(sut, field, validationError);
    }
  });

  test('Should call Validation with correct email', async () => {
    const { sut, validationSpy } = makeSut();
    await sut.findByTestId('login-form');

    const email = faker.internet.email();
    await Helper.populateField(sut, "email", email);

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call Validation with correct password', async () => {
    const { sut, validationSpy } = makeSut();
    await sut.findByTestId('login-form');

    const password = faker.internet.password();
    await Helper.populateField(sut, "password", password);

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    await sut.findByTestId('login-form');

    await Helper.populateField(sut, "email", faker.internet.email());

    Helper.testErrorStatusForField(sut, "email", validationError);
  });

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.lorem.words();
    const { sut } = makeSut({ validationError });
    await sut.findByTestId('login-form');

    await Helper.populateField(sut, "password", faker.internet.password());

    Helper.testErrorStatusForField(sut, "password", validationError);
  });

  test('Should show valid email state if Validation succeeds', async () => {
    const { sut } = makeSut();
    await sut.findByTestId('login-form');

    await Helper.populateField(sut, "email", faker.internet.email());

    expect(sut.queryByTestId("email-status")).not.toBeInTheDocument();
  });

  test('Should show valid password state if Validation succeeds', async () => {
    const { sut } = makeSut();
    await sut.findByTestId('login-form');

    await Helper.populateField(sut, "password", faker.internet.password());
    expect(sut.queryByTestId("email-status")).not.toBeInTheDocument();
  });

  test('Should enable submit button if form is valid', async () => {
    const { sut } = makeSut();
    await sut.findByTestId('login-form');

    await Helper.populateField(sut, "email", faker.internet.email());
    await Helper.populateField(sut, "password", faker.internet.password());

    const submitButton = sut.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await sut.findByTestId('login-form');

    await simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Should call Authentication with correct credentials', async () => {
    const { sut, authenticationSpy } = makeSut();
    await sut.findByTestId('login-form');

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await sut.findByTestId('login-form');

    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.lorem.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await sut.findByTestId('login-form');

    await Helper.populateField(sut, "email", faker.internet.email());

    const user = userEvent.setup();
    const submitButton = sut.getByTestId('submit-button');
    await user.click(submitButton);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present errors if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    await sut.findByTestId('login-form');

    const error = new InvalidCredentialsError();
    vi.spyOn(authenticationSpy, 'auth').mockRejectedValue(error);

    await simulateValidSubmit(sut);

    const formErrorMessage = sut.getByTestId('formErrorMessage');
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test('Should call SaveAccessToken on Authentication success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();
    await sut.findByTestId('login-form');

    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );
  });

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    await sut.findByTestId('login-form');

    const error = new Error('Something went wrong!');
    vi.spyOn(saveAccessTokenMock, 'save').mockRejectedValue(error);

    await simulateValidSubmit(sut);

    const formErrorMessage = sut.getByTestId('formErrorMessage');
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test('Should redirect to /signup upon Link interaction', async () => {
    const { sut, router } = makeSut();
    const user = userEvent.setup();
    await sut.findByTestId('login-form');

    const signupLink = sut.getByTestId('signup-link');
    await user.click(signupLink);

    expect(router.state.location.pathname).toBe('/signup');
  });

  test('Should navigate to main page on authentication success', async () => {
    const { sut, router } = makeSut();
    await sut.findByTestId('login-form');

    await simulateValidSubmit(sut);

    expect(router.state.location.pathname).toBe('/');
  });
});