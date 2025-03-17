import toThrowNewError from "./toThrowNewError.js";
import { RESTAURANT_CONSTRAINTS } from "../constants/rules.js";

const validateDescription = (description) => {
  toThrowNewError({
    condition:
      description.length > RESTAURANT_CONSTRAINTS.MAX_DESCRIPTION_TEXT_LENGTH,
    message: `설명은 ${RESTAURANT_CONSTRAINTS.MIN_DESCRIPTION_TEXT_LENGTH}자 이상 ${RESTAURANT_CONSTRAINTS.MAX_DESCRIPTION_TEXT_LENGTH}자 이하여야 합니다.`,
  });
};

export default validateDescription;
