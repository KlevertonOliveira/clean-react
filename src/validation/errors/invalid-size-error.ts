export class InvalidSizeError extends Error {
  constructor(minLength: number) {
    super(`Invalid field size (minimum: ${minLength})`);
  }
}