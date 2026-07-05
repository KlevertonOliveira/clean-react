/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null;

  constructor(readonly field: string) { }

  validate(_input: Record<string, unknown>): Error | null {
    return this.error;
  }
}