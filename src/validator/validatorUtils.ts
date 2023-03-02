import { regex } from '@res/constants/regex';

export const validatorUtils = {
  isNameLengthValidRange(input: string): boolean {
    return regex.nameInputLength.test(input);
  },

  isDescriptionLengthValidRange(input: string): boolean {
    return regex.descriptionInputLength.test(input);
  },

  isValidUrl(input: string): boolean {
    return regex.urlInput.test(input);
  },
};
