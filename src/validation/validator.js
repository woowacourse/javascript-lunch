import { ERRORS } from "../constants/errors";
import { MESSAGES } from "../constants/messages";

export const validateNameInput = (rawInput) => {
  const input = rawInput.trim();
  if (input === "") {
    throw new Error(ERRORS.EMPTY_NAME);
  }

  if (input.length > MESSAGES.MAXIMUM_NAME_LENGTH) {
    throw new Error(ERRORS.MAXIMUM_NAME);
  }
};

export const validateDescriptionInput = (rawInput) => {
  const input = rawInput.trim();

  if (input.length > MESSAGES.MAXIMUM_DESCRIPTION_LENGTH) {
    throw new Error(ERRORS.MAXIMUM_DESCRIPTION);
  }
};

export const validateSelectInput = (code) => {
  if (code === "error_category" || code === "error_distance") {
    throw new Error(ERRORS.NON_SELECTED(code.slice(MESSAGES.SELECT_TYPE)));
  }
};
