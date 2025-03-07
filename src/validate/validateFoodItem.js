import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../constants/constants.js";
import { alertError } from "../util/alertError.js";
import { getInput } from "../util/getInput.js";
import { resetError } from "../util/handleIsError.js";
import {
  validateLength,
  validateRequiredInput,
  validateURL,
} from "../validate/validateCondition.js";

export function validateFoodItem({
  category,
  name,
  distance,
  description,
  link,
}) {
  resetError();
  try {
    validateRequiredInput(category);
    validateRequiredInput(name);
    validateLength(name, NAME_MAX_LENGTH);
    validateRequiredInput(distance);
    validateLength(description, DESCRIPTION_MAX_LENGTH);
    validateURL(link);
  } catch (error) {
    alertError(error.message);
    return;
  }
  return {
    category: getInput(category),
    name: getInput(name),
    distance: getInput(distance),
    description: getInput(description),
    link: getInput(link),
  };
}
