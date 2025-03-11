import {
  DESCRIPTION_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../constants/constants.js";
import { alertError } from "../util/alertError.js";
import { resetError } from "../util/errorHandler.js";
import { InputGuide } from "./InputGuide.js";

export function validateFoodItem({
  category,
  name,
  distance,
  description,
  link,
}) {
  resetError();
  try {
    InputGuide.category(category);
    InputGuide.name(name, NAME_MAX_LENGTH);
    InputGuide.distance(distance);
    InputGuide.description(description, DESCRIPTION_MAX_LENGTH);
    InputGuide.link(link);
  } catch (error) {
    alertError(error.message);
    throw error;
  }
}
