import { regex } from '@res/constants/regex';

export const validatorUtils = {
  isNameLengthValidRange(nameInput: string): boolean {
    return regex.nameInputLength.test(nameInput);
  },
};
