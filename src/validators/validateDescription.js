import { RESTAURANT_RULES } from "../constants/rules.js";
import throwError from "./throwError.js";

const validateDescription = (description) => {
  const { MAX_DESCRIPTION_TEXT_LENGTH, MIN_DESCRIPTION_TEXT_LENGTH } =
    RESTAURANT_RULES;
  throwError({
    condition: description.length > MAX_DESCRIPTION_TEXT_LENGTH,
    message: `설명은 ${MIN_DESCRIPTION_TEXT_LENGTH}자 이상 ${MAX_DESCRIPTION_TEXT_LENGTH}자 이하여야 합니다.`,
  });
};

export default validateDescription;
