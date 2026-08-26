import { describe, expect, test } from "vitest";
import { render, cleanup, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/user-event';
import { LoginPage } from "@/presentation/pages";
import { ValidationSpy, AuthenticationSpy, UpdateCurrentAccountMock, Helper } from "@/presentation/test";
import { faker } from '@faker-js/faker';
import { InvalidCredentialsError } from "@/domain/errors";
import { RouterProvider } from "@tanstack/react-router";
import { generateTestRouter } from "@/utils/test/test-router-utils";

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  updateCurrentAccountMock: UpdateCurrentAccountMock;
  router: ReturnType<typeof generateTestRouter>;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();

  validationSpy.errorMessage = params?.validationError ?? '';

  const router = generateTestRouter({
    initialLocation: '/login',
    rootRoutecomponent: (
      <LoginPage
        validation={validationSpy}
        authentication={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    )
  });

  render(<RouterProvider router={router} />);

  return {
    validationSpy,
    authenticationSpy,
    updateCurrentAccountMock,
    router
  };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  const user = userEvent.setup();

  await Helper.populateField("email", email);
  await Helper.populateField("password", password);

  const submitButton = screen.getByTestId('submit-button');
  await user.click(submitButton);
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', async () => {
    const validationError = "Required field";
    makeSut({ validationError });
    await screen.findByTestId('login-form');

    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = screen.queryByTestId('errorMessage');
    expect(errorMessage).not.toBeInTheDocument();

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();

    const fields = ["email", "password"];

    for (const field of fields) {
      Helper.testErrorStatusForField(field, validationError);
    }
  });

  test('Should call Validation with correct email', async () => {
    const { validationSpy } = makeSut();
    await screen.findByTestId('login-form');

    const email = faker.internet.email();
    await Helper.populateField("email", email);

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call Validation with correct password', async () => {
    const { validationSpy } = makeSut();
    await screen.findByTestId('login-form');

    const password = faker.internet.password();
    await Helper.populateField("password", password);

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if Validation fails', async () => {
    const validationError = faker.lorem.words();
    makeSut({ validationError });
    await screen.findByTestId('login-form');

    await Helper.populateField("email", faker.internet.email());

    Helper.testErrorStatusForField("email", validationError);
  });

  test('Should show password error if Validation fails', async () => {
    const validationError = faker.lorem.words();
    makeSut({ validationError });
    await screen.findByTestId('login-form');

    await Helper.populateField("password", faker.internet.password());

    Helper.testErrorStatusForField("password", validationError);
  });

  test('Should show valid email state if Validation succeeds', async () => {
    makeSut();
    await screen.findByTestId('login-form');

    await Helper.populateField("email", faker.internet.email());

    expect(screen.queryByTestId("email-status")).not.toBeInTheDocument();
  });

  test('Should show valid password state if Validation succeeds', async () => {
    makeSut();
    await screen.findByTestId('login-form');

    await Helper.populateField("password", faker.internet.password());
    expect(screen.queryByTestId("email-status")).not.toBeInTheDocument();
  });

  test('Should enable submit button if form is valid', async () => {
    makeSut();
    await screen.findByTestId('login-form');

    await Helper.populateField("email", faker.internet.email());
    await Helper.populateField("password", faker.internet.password());

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await screen.findByTestId('login-form');

    await simulateValidSubmit();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Should call Authentication with correct credentials', async () => {
    const { authenticationSpy } = makeSut();
    await screen.findByTestId('login-form');

    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();
    await screen.findByTestId('login-form');

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.lorem.words();
    const { authenticationSpy } = makeSut({ validationError });
    await screen.findByTestId('login-form');

    await Helper.populateField("email", faker.internet.email());

    const user = userEvent.setup();
    const submitButton = screen.getByTestId('submit-button');
    await user.click(submitButton);

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present errors if Authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    await screen.findByTestId('login-form');

    const error = new InvalidCredentialsError();
    vi.spyOn(authenticationSpy, 'auth').mockRejectedValue(error);

    await simulateValidSubmit();

    const formErrorMessage = screen.getByTestId('formErrorMessage');
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test('Should call SaveAccessToken on Authentication success', async () => {
    const { authenticationSpy, updateCurrentAccountMock } = makeSut();
    await screen.findByTestId('login-form');

    await simulateValidSubmit();

    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account);
  });

  test('Should present error if SaveAccessToken fails', async () => {
    const { updateCurrentAccountMock } = makeSut();
    await screen.findByTestId('login-form');

    const error = new Error('Something went wrong!');
    vi.spyOn(updateCurrentAccountMock, 'save').mockRejectedValue(error);

    await simulateValidSubmit();

    const formErrorMessage = screen.getByTestId('formErrorMessage');
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test('Should redirect to /signup upon Link interaction', async () => {
    const { router } = makeSut();
    const user = userEvent.setup();
    await screen.findByTestId('login-form');

    const signupLink = screen.getByTestId('signup-link');
    await user.click(signupLink);

    expect(router.state.location.pathname).toBe('/signup');
  });

  test('Should navigate to main page on authentication success', async () => {
    const { router } = makeSut();
    await screen.findByTestId('login-form');

    await simulateValidSubmit();

    expect(router.state.location.pathname).toBe('/');
  });
});