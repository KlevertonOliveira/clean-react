import type { RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";

export const populateField = async (
  sut: RenderResult,
  fieldName: string,
  value = faker.lorem.word()
): Promise<void> => {
  const user = userEvent.setup();
  const fieldInput = sut.getByTestId(fieldName);
  await user.type(fieldInput, value);
};

export const testStatusForField = (
  sut: RenderResult,
  field: string,
  validationError: string,
) => {
  const fieldStatus = sut.getByTestId(field + '-status');
  expect(fieldStatus).toBeInTheDocument();
  expect(fieldStatus.title).toBe(validationError);
};