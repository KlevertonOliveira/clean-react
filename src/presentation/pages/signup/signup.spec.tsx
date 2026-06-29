import { render, type RenderResult } from "@testing-library/react";
import SignUpPage from "./signup";

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<SignUpPage />);

  return {
    sut,
  };
};

describe("Login Component", () => {
  test("Should start with initial state", async () => {
    const validationError = "Required field";
    const { sut } = makeSut();
    await sut.findByTestId("signup-form");

    const spinner = sut.queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();

    const errorMessage = sut.queryByTestId("errorMessage");
    expect(errorMessage).not.toBeInTheDocument();

    const submitButton = sut.getByTestId("submit-button");
    expect(submitButton).toBeDisabled();

    const fields = ["name", "email", "password", "confirm-password"];

    for (const field of fields) {
      const fieldStatus = sut.getByTestId(field + '-status');
      expect(fieldStatus).toBeInTheDocument();
      expect(fieldStatus.title).toBe(validationError);
    }
  });
});