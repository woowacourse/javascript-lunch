export default class ValidationError extends Error {
  constructor(message, inputElement) {
    super(message);
    this.inputElement = inputElement;
  }
}
