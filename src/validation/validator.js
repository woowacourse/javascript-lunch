import {
  MAX_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  REGEX,
  ERROR_MESSAGE,
} from '../constants/lunchRecommendation.ts';

const validator = {
  checkName(input) {
    validator.isEmpty(input);
    validator.isCorrectNameFormat(input);
    validator.isCorrectNameLength(input);
  },

  checkDescription(input) {
    if (input.length > MAX_DESCRIPTION_LENGTH) throw new Error(ERROR_MESSAGE.DESCRIPTION_LENGTH);
  },

  checkLinkFormat(input) {
    if (!REGEX.URL.test(input)) throw new Error(ERROR_MESSAGE.LINK_FORMAT);
  },

  isEmpty(input) {
    if (input === '') throw new Error(ERROR_MESSAGE.EMPTY);
  },

  isCorrectNameFormat(input) {
    if (!REGEX.NAME.test(input)) throw new Error(ERROR_MESSAGE.NAME_FORMAT);
  },

  isCorrectNameLength(input) {
    if (input.length > MAX_NAME_LENGTH) throw new Error(ERROR_MESSAGE.NAME_LENGTH);
  },
};

export default validator;
