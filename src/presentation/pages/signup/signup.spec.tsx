import { cleanup, render, type RenderResult } from "@testing-library/react";
import SignUpPage from "./signup";
import { Helper, ValidationSpy } from "@/presentation/test";
import { faker } from "@faker-js/faker";

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
});