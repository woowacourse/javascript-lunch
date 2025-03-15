import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../constants/constants.js";
import { ValidateFoodItemType } from "../types/vaildate/ValidateFoodItemType.js";
import { alertError } from "../util/alertError.js";
import { resetError } from "../util/errorHandler.js";
import { InputGuide } from "./InputGuide.js";

export function validateFoodItem({
  category,
  name,
  distance,
  description,
  link,
}: ValidateFoodItemType) {
  resetError();
  try {
    InputGuide.category({ input: category });
    InputGuide.name({ input: name, maxLength: NAME_MAX_LENGTH });
    InputGuide.distance({ input: distance });
    InputGuide.description({
      input: description,
      maxLength: DESCRIPTION_MAX_LENGTH,
    });
    InputGuide.link({ input: link });
  } catch (error) {
    alertError({ error: (error as Error).message });
    throw error;
  }
}
