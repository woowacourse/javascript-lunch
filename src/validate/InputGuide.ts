import { ERROR_MESSAGE } from "../constants/Message.js";
import {
  CategoryType,
  DescriptionType,
  DistanceType,
  InputGuideType,
  LinkType,
  NameType,
} from "../types/vaildate/InputGuideType.js";
import { removeError, setError } from "../util/errorHandler.js";

export class InputGuide {
  error;

  constructor({ name, message }: InputGuideType) {
    setError({ name });
    this.error = new Error(message);
    throw this.error;
  }

  static category({ input }: CategoryType) {
    const inputId = "category";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }
    removeError({ name: inputId });
  }

  static name({ input, maxLength }: NameType) {
    const inputId = "name";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }
    if (input.length > maxLength) {
      return new InputGuide({
        name: inputId,
        message: ERROR_MESSAGE.length(maxLength),
      });
    }
    removeError({ name: inputId });
  }

  static distance({ input }: DistanceType) {
    const inputId = "distance";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }

    removeError({ name: inputId });
  }

  static description({ input, maxLength }: DescriptionType) {
    const inputId = "description";
    if (input.length === 0) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.required });
    }
    if (input.length > maxLength) {
      return new InputGuide({
        name: inputId,
        message: ERROR_MESSAGE.length(maxLength),
      });
    }
    removeError({ name: inputId });
  }

  static link({ input }: LinkType) {
    const inputId = "link";
    if (!input) return;
    try {
      new URL(input);
    } catch (error) {
      return new InputGuide({ name: inputId, message: ERROR_MESSAGE.url });
    }
    removeError({ name: inputId });
  }
}
