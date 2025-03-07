import { $ } from "./dom";

const addIdToError = (id, validateFn) => {
  try {
    validateFn();
    clearError();
  } catch (e) {
    throw new Error(e.message, { cause: id });
  }
};

const clearError = () => {
  $(".error-message")?.remove();
};

export default addIdToError;
