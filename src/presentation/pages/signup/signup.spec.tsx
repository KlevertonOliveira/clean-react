import { cleanup, render, type RenderResult } from "@testing-library/react";
import SignUpPage from "./signup";
import { ValidationSpy } from "@/presentation/test";
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

const populateField = async (
  sut: RenderResult,
  fieldName: string,
  value = faker.lorem.word()
): Promise<void> => {
  const user = userEvent.setup();
  const fieldInput = sut.getByTestId(fieldName);
  await user.type(fieldInput, value);
};

const testStatusForField = (
  sut: RenderResult,
  field: string,
  validationError: string,
) => {
  const fieldStatus = sut.getByTestId(field + '-status');
  expect(fieldStatus).toBeInTheDocument();
  expect(fieldStatus.title).toBe(validationError);
};

describe("Login Component", () => {
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

    const fields = ["name", "email", "password", "confirm-password"];

    for (const field of fields) {
      testStatusForField(sut, field, validationError);
    }
  });

  test("Should show name error if Validation fails", async () => {
    const field = "name";
    const validationError = faker.lorem.word();

    const { sut } = makeSut({ validationError });
    await sut.findByTestId("signup-form");

    await populateField(sut, field);
    testStatusForField(sut, field, validationError);
  });
});