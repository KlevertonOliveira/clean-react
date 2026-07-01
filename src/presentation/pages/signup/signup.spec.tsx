import { cleanup, render, type RenderResult } from "@testing-library/react";
import { Helper, SaveAccessTokenMock, ValidationSpy } from "@/presentation/test";
import { AddAccountSpy } from "@/presentation/test/mock-add-account";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

import SignUpPage from "./signup";
import { EmailInUseError } from "@/domain/errors";
import { generateTestRouter } from "@/utils/test/test-router-utils";
import { RouterProvider } from "@tanstack/react-router";

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy,
  saveAccessTokenMock: SaveAccessTokenMock;
  router: ReturnType<typeof generateTestRouter>;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError ?? '';

  const addAccountSpy = new AddAccountSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  const router = generateTestRouter({
    initialLocation: '/signup',
    rootRoutecomponent: (
      <SignUpPage
        validation={validationSpy}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    )
  });

  const sut = render(<RouterProvider router={router} />);

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock,
    router
  };
};

const simulateValidSubmit = async (sut: RenderResult, fields = {
  name: faker.lorem.word(),
  email: faker.internet.email(),
  password: faker.internet.password()
}) => {
  await Helper.populateField(sut, "name", fields.name);
  await Helper.populateField(sut, "email", fields.email);
  await Helper.populateField(sut, "password", fields.password);
  await Helper.populateField(sut, "confirmPassword", fields.password);

  const submitButton = sut.getByTestId("submit-button");
  expect(submitButton).toBeEnabled();

  const user = userEvent.setup();
  await user.click(submitButton);
};

describe("SignUpPage", () => {
  afterEach(cleanup);

  test("Should start with initial state", async () => {
    const validationError = "Required field";
    const { sut } = makeSut({ validationError });
    await sut.findByTestId("signup-form");

    const spinner = sut.queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = sut.queryByTestId("errorMessage");
    expect(errorMessage).not.toBeInTheDocument();

    const submitButton = sut.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const fields = ["name", "email", "password", "confirmPassword"];

    for (const field of fields) {
      Helper.testStatusForField(sut, field, validationError);
    }
  });

  test("Should show name error if Validation fails", async () => {
    const field = "name";
    const validationError = faker.lorem.word();

    const { sut } = makeSut({ validationError });
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, validationError);
  });

  test("Should show email error if Validation fails", async () => {
    const field = "email";
    const validationError = faker.lorem.word();

    const { sut } = makeSut({ validationError });
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, validationError);
  });

  test("Should show password error if Validation fails", async () => {
    const field = "password";
    const validationError = faker.lorem.word();

    const { sut } = makeSut({ validationError });
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, validationError);
  });

  test("Should show confirm password error if Validation fails", async () => {
    const field = "confirmPassword";
    const validationError = faker.lorem.word();

    const { sut } = makeSut({ validationError });
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, validationError);
  });

  test("Should show valid name state if Validation succeeds", async () => {
    const field = "name";

    const { sut } = makeSut();
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, "");
  });

  test("Should show valid email state if Validation succeeds", async () => {
    const field = "email";

    const { sut } = makeSut();
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, "");
  });

  test("Should show valid password state if Validation succeeds", async () => {
    const field = "password";

    const { sut } = makeSut();
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, "");
  });

  test("Should show valid confirmPassword state if Validation succeeds", async () => {
    const field = "confirmPassword";

    const { sut } = makeSut();
    await sut.findByTestId("signup-form");

    await Helper.populateField(sut, field);
    Helper.testStatusForField(sut, field, "");
  });

  test("Should enable submit button if form is valid", async () => {
    const { sut } = makeSut();
    await sut.findByTestId("signup-form");

    const name = faker.lorem.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await Helper.populateField(sut, "name", name);
    await Helper.populateField(sut, "email", email);
    await Helper.populateField(sut, "password", password);
    await Helper.populateField(sut, "confirmPassword", password);

    expect(sut.getByTestId('submit-button')).toBeEnabled();
  });

  test('Should disable submit button and show spinner on submit', async () => {
    const { sut } = makeSut();
    await sut.findByTestId('signup-form');

    await simulateValidSubmit(sut);

    const submitButton = sut.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test('Should call addAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut();
    await sut.findByTestId('signup-form');

    const name = faker.lorem.word();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(sut, { name, email, password });

    expect(addAccountSpy.params).toEqual({
      name, email, password, confirmPassword: password
    });
  });

  test('Should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut();
    await sut.findByTestId('signup-form');

    const error = new EmailInUseError();
    vi.spyOn(addAccountSpy, 'add').mockRejectedValue(error);

    await simulateValidSubmit(sut);

    const formErrorMessage = sut.getByTestId('formErrorMessage');
    expect(formErrorMessage).toBeInTheDocument();
    expect(formErrorMessage).toHaveTextContent(error.message);
  });

  test('Should call SaveAccessToken and redirect to main page on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock, router } = makeSut();
    await sut.findByTestId('signup-form');

    await simulateValidSubmit(sut);

    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken);
    expect(router.state.location.pathname).toBe('/');
  });
});