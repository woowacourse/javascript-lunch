import {
  MAX_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  REGEX,
  ERROR_MESSAGE,
} from '../constants/lunchRecommendation';

export interface IValidator {
  checkName(input: string): void;
  checkDescription(input: string): void;
  checkLinkFormat(input: string): void;
  isEmpty(input: string): void;
  isCorrectNameFormat(input: string): void;
  isCorrectNameLength(input: string): void;
  isCorrectDescriptionLength(input: string): void;
  isCorrectLinkFormat(input: string): void;
}

export const validator: IValidator = {
  checkName(input: string) {
    validator.isEmpty(input);
    validator.isCorrectNameFormat(input);
    validator.isCorrectNameLength(input);
  },

  checkDescription(input: string) {
    validator.isCorrectDescriptionLength(input);
  },

  checkLinkFormat(input: string) {
    validator.isCorrectLinkFormat(input);
  },

  isEmpty(input: string) {
    if (input === '') throw new Error(ERROR_MESSAGE.EMPTY);
  },

  isCorrectNameFormat(input: string) {
    if (!REGEX.NAME.test(input)) throw new Error(ERROR_MESSAGE.NAME_FORMAT);
  },

  isCorrectNameLength(input: string) {
    if (input.length > MAX_NAME_LENGTH || input.length === 0)
      throw new Error(ERROR_MESSAGE.NAME_LENGTH);
  },

  isCorrectDescriptionLength(input: string) {
    if (input.length > MAX_DESCRIPTION_LENGTH) throw new Error(ERROR_MESSAGE.DESCRIPTION_LENGTH);
  },

  isCorrectLinkFormat(input: string) {
    if (!REGEX.URL.test(input)) throw new Error(ERROR_MESSAGE.LINK_FORMAT);
  },
};
