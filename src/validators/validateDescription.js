import toThrowNewError from "./toThrowNewError.js";
import RULES from "../constants/rules.js";

const validateDescription = (description) => {
  toThrowNewError({
    condition: description.length > RULES.MAX_DESCRIPTION_TEXT_LENGTH,
    message: `설명은 ${RULES.MIN_DESCRIPTION_TEXT_LENGTH}자 이상 ${RULES.MAX_DESCRIPTION_TEXT_LENGTH}자 이하여야 합니다.`,
  });
};

export default validateDescription;
