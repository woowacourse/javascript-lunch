import { ERRORS } from "../constants/errors";

export const validateNameInput = (rawInput) => {
  const input = rawInput.trim();
  if (input === "") {
    throw new Error(ERRORS.EMPTY_NAME);
  }

  if (input.length > 30) {
    throw new Error(ERRORS.MAXIMUM_NAME);
  }
};

export const validateDescriptiontInput = (rawInput) => {
  const input = rawInput.trim();

  if (input.length > 1500) {
    throw new Error(ERRORS.MAXIMUM_DESCRIPTION);
  }
};

export const validateSelectInput = (code) => {
  console.log(code);
  if (code === "error_category" || code === "error_distance")
    throw new Error(ERRORS.NON_SELECTED(code.slice(6)));
};
