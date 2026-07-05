import type { Validation } from "@/presentation/protocols/validation";
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) { }

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: Record<string, string>): string {
    const validators: FieldValidation[] = (
      this.validators.filter(validator => validator.field === fieldName)
    );

    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) return error.message;
    }

    return '';
  }
}