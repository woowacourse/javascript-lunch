import { regex } from '../constants/regex';

interface IValidatorUtils {
  [key: string]: (input: string) => boolean;
}

export const validatorUtils: IValidatorUtils = {
  name: (input: string): boolean => {
    return regex.nameInputLength.test(input);
  },
  category: (input: string): boolean => {
    return input !== '';
  },
  distance: (input: string): boolean => {
    return input !== '';
  },
  description: (input: string): boolean => {
    return regex.descriptionInputLength.test(input);
  },
  link: (input: string): boolean => {
    return regex.urlInput.test(input);
  },
};
