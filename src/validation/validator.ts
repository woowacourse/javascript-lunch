import { ERRORS } from "../constants/errors";
import { MESSAGES } from "../constants/messages";

export const validateNameInput = (input: string) => {
  if (input === "") {
    throw new Error(ERRORS.EMPTY_NAME);
  }

  if (input.length > MESSAGES.MAXIMUM_NAME_LENGTH) {
    throw new Error(ERRORS.MAXIMUM_NAME);
  }
};

export const validateDescriptionInput = (input: string) => {
  if (input.length > MESSAGES.MAXIMUM_DESCRIPTION_LENGTH) {
    throw new Error(ERRORS.MAXIMUM_DESCRIPTION);
  }
};

export const validateSelectInput = (selectValue: string, title: string) => {
  if (selectValue === "") {
    throw new Error(ERRORS.EMPTY_SELECT(title));
  }
};
