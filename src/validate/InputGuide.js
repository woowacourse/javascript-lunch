import { ERROR_MESSAGE } from "../constants/Message.js";
import { removeError, setError } from "../util/errorHandler.js";

export class InputGuide {
  error;

  constructor(name, message) {
    setError(name);
    this.error = new Error(message);
    throw this.error;
  }

  static category(input) {
    const inputId = "category";
    if (input.length === 0) {
      return new InputGuide(inputId, ERROR_MESSAGE.required);
    }
    removeError(inputId);
  }

  static name(input, maxLength) {
    const inputId = "name";
    if (input.length === 0) {
      return new InputGuide(inputId, ERROR_MESSAGE.required);
    }
    if (input.length > maxLength) {
      return new InputGuide(inputId, ERROR_MESSAGE.length(maxLength));
    }
    removeError(inputId);
  }

  static distance(input, maxLength) {
    const inputId = "distance";
    if (input.length === 0) {
      return new InputGuide(inputId, ERROR_MESSAGE.required);
    }
    if (input.length > maxLength) {
      return new InputGuide(inputId, ERROR_MESSAGE.length(maxLength));
    }
    removeError(inputId);
  }

  static description(input) {
    const inputId = "description";
    removeError(inputId);
  }

  static link(input) {
    const inputId = "link";
    if (!input) return;
    try {
      new URL(input);
    } catch (error) {
      return new InputGuide(inputId, ERROR_MESSAGE.url);
    }
    removeError(inputId);
  }
}
