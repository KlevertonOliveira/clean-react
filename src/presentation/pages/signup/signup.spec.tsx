import { cleanup, render, type RenderResult } from "@testing-library/react";
import SignUpPage from "./signup";
import { Helper, ValidationSpy } from "@/presentation/test";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError ?? '';

  const sut = render(<SignUpPage validation={validationSpy} />);

  return {
    sut,
  };
};

const simulateValidSubmit = async (sut: RenderResult) => {
  const name = faker.lorem.word();
  const email = faker.internet.email();
  const password = faker.internet.password();

  await Helper.populateField(sut, "name", name);
  await Helper.populateField(sut, "email", email);
  await Helper.populateField(sut, "password", password);
  await Helper.populateField(sut, "confirmPassword", password);

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

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await sut.findByTestId('signup-form');

    await simulateValidSubmit(sut);

    const submitButton = sut.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const spinner = sut.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});