import { $ } from "./dom";

const addIdToError = (id, validateFn) => {
  try {
    clearError();
    validateFn();
  } catch (e) {
    throw new Error(e.message, { cause: id });
  }
};

const clearError = () => {
  $(".error-message")?.remove();
};

export default addIdToError;
