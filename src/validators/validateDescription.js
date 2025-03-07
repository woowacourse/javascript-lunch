import toThrowNewError from "./toThrowNewError.js";

const MAX_DESCRIPTION_TEXT_LENGTH = 300;
const MIN_DESCRIPTION_TEXT_LENGTH = 0;

const validateDescription = (description) => {
  toThrowNewError({
    condition: description.length > MAX_DESCRIPTION_TEXT_LENGTH,
    message: `설명은 ${MIN_DESCRIPTION_TEXT_LENGTH}자 이상 ${MAX_DESCRIPTION_TEXT_LENGTH}자 이하여야 합니다.`,
  });
};

export default validateDescription;
