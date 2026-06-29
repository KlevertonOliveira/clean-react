/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError, RequiredFieldError } from "@/validation/errors";

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) { }

  validate(value: string): Error | null {
    return new InvalidFieldError();
  }
}
