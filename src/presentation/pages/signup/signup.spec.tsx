import { cleanup, render, screen } from "@testing-library/react";
import { Helper, UpdateCurrentAccountMock, ValidationSpy } from "@/presentation/test";
import { AddAccountSpy } from "@/presentation/test/mock-add-account";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import SignUpPage from "./signup";
import { EmailInUseError } from "@/domain/errors";
import { generateTestRouter } from "@/utils/test/test-router-utils";
import { RouterProvider } from "@tanstack/react-router";

type SutTypes = {
  addAccountSpy: AddAccountSpy,
  updateCurrentAccountMock: UpdateCurrentAccountMock;
  router: ReturnType<typeof generateTestRouter>;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError ?? "";

  const addAccountSpy = new AddAccountSpy();
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();

  const router = generateTestRouter({
    initialLocation: "/signup",
    rootRoutecomponent: (
      <SignUpPage
        validation={validationSpy}
        addAccount={addAccountSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    )
  });

  render(<RouterProvider router={router} />);

  return {
    addAccountSpy,
    updateCurrentAccountMock,
    router
  };
};

const simulateValidSubmit = async (fields = {
  name: faker.lorem.word(),
  email: faker.internet.email(),
  password: faker.internet.password()
}) => {
  await Helper.populateField("name", fields.name);
  await Helper.populateField("email", fields.email);
  await Helper.populateField("password", fields.password);
  await Helper.populateField("confirmPassword", fields.password);

  const submitButton = screen.getByTestId("submit-button");
  expect(submitButton).toBeEnabled();

  const user = userEvent.setup();
  await user.click(submitButton);
};

describe("SignUpPage", () => {
  afterEach(cleanup);

  test("Should start with initial state", async () => {
    const validationError = "Required field";
    makeSut({ validationError });
    await screen.findByTestId("signup-form");

    const spinner = screen.queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = screen.queryByTestId("errorMessage");
    expect(errorMessage).not.toBeInTheDocument();

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const fields = ["name", "email", "password", "confirmPassword"];

    for (const field of fields) {
      Helper.testErrorStatusForField(field, validationError);
    }
  });

  test("Should show name error if Validation fails", async () => {
    const field = "name";
    const validationError = faker.lorem.word();

    makeSut({ validationError });
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    Helper.testErrorStatusForField(field, validationError);
  });

  test("Should show email error if Validation fails", async () => {
    const field = "email";
    const validationError = faker.lorem.word();

    makeSut({ validationError });
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    Helper.testErrorStatusForField(field, validationError);
  });

  test("Should show password error if Validation fails", async () => {
    const field = "password";
    const validationError = faker.lorem.word();

    makeSut({ validationError });
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    Helper.testErrorStatusForField(field, validationError);
  });

  test("Should show confirm password error if Validation fails", async () => {
    const field = "confirmPassword";
    const validationError = faker.lorem.word();

    makeSut({ validationError });
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    Helper.testErrorStatusForField(field, validationError);
  });

  test("Should show valid name state if Validation succeeds", async () => {
    const field = "name";

    makeSut();
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    expect(screen.queryByTestId(`${field}-error-status`)).not.toBeInTheDocument();
  });

  test("Should show valid email state if Validation succeeds", async () => {
    const field = "email";

    makeSut();
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    expect(screen.queryByTestId(`${field}-error-status`)).not.toBeInTheDocument();
  });

  test("Should show valid password state if Validation succeeds", async () => {
    const field = "password";

    makeSut();
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    expect(screen.queryByTestId(`${field}-error-status`)).not.toBeInTheDocument();
  });

  test("Should show valid confirmPassword state if Validation succeeds", async () => {
    const field = "confirmPassword";

    makeSut();
    await screen.findByTestId("signup-form");

    await Helper.populateField(field);
    expect(screen.queryByTestId(`${field}-error-status`)).not.toBeInTheDocument();
  });

  test("Should enable submit button if form is valid", async () => {
    makeSut();
    await screen.findByTestId("signup-form");

    const name = faker.lorem.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await Helper.populateField("name", name);
    await Helper.populateField("email", email);
    await Helper.populateField("password", password);
    await Helper.populateField("confirmPassword", password);

    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  test("Should disable submit button and show spinner on submit", async () => {
    makeSut();
    await screen.findByTestId("signup-form");

    await simulateValidSubmit();

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("Should call addAccount with correct values", async () => {
    const { addAccountSpy } = makeSut();
    await screen.findByTestId("signup-form");

    const name = faker.lorem.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit({ name, email, password });

    expect(addAccountSpy.params).toEqual({
      name, email, password, confirmPassword: password
    });
  });

  test("Should present error if AddAccount fails", async () => {
    const { addAccountSpy } = makeSut();
    await screen.findByTestId("signup-form");

    const error = new EmailInUseError();
    vi.spyOn(addAccountSpy, "add").mockRejectedValue(error);

    await simulateValidSubmit();

    const formErrorMessage = screen.getByTestId("formErrorMessage");
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test("Should call UpdateCurrentAccount and redirect to main page on success", async () => {
    const { addAccountSpy, updateCurrentAccountMock, router } = makeSut();
    await screen.findByTestId("signup-form");

    await simulateValidSubmit();

    expect(updateCurrentAccountMock.account).toEqual(addAccountSpy.account);
    expect(router.state.location.pathname).toBe("/");
  });

  test("Should present error if UpdateCurrentAccount fails", async () => {
    const { updateCurrentAccountMock } = makeSut();
    await screen.findByTestId("signup-form");

    const error = new Error(faker.lorem.word());
    vi.spyOn(updateCurrentAccountMock, "save").mockRejectedValue(error);

    await simulateValidSubmit();

    const formErrorMessage = screen.getByTestId("formErrorMessage");
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test("Should redirect to login page upon Link interaction", async () => {
    const { router } = makeSut();
    await screen.findByTestId("signup-form");

    const loginLink = screen.getByTestId("login-link");
    expect(loginLink).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(loginLink);

    expect(router.state.location.pathname).toBe("/login");
  });
});