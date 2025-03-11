import toThrowNewError from "./toThrowNewError.js";
import RESTAURANT_RULES from "../constants/rules.js";

const validateDescription = (description) => {
  toThrowNewError({
    condition:
      description.length > RESTAURANT_RULES.MAX_DESCRIPTION_TEXT_LENGTH,
    message: `설명은 ${RESTAURANT_RULES.MIN_DESCRIPTION_TEXT_LENGTH}자 이상 ${RESTAURANT_RULES.MAX_DESCRIPTION_TEXT_LENGTH}자 이하여야 합니다.`,
  });
};

export default validateDescription;
