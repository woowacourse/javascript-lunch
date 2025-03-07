import { clearError } from "./clearError";

const addIdToError = (id, validateFn) => {
  try {
    clearError();
    validateFn();
  } catch (e) {
    throw new Error(e.message, { cause: id });
  }
};

export default addIdToError;
