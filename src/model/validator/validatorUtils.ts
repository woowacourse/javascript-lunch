import { regex } from '@res/constants/regex';

export const validatorUtils = {
  isNameLengthValidRange(input: string): boolean {
    return regex.nameInputLength.test(input);
  },
};
