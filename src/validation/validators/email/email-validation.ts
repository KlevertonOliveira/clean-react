import { InvalidFieldError } from "@/validation/errors";
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(input: Record<string, string>): Error | null {
    const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return !input[this.field] || emailRegExp.test(input[this.field])
      ? null
      : new InvalidFieldError();
  }
}