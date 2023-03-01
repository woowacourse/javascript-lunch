import { CATEGORIES } from './constants/formCondition';
import { ERROR_MESSAGE } from './constants/message';

const Validator = {
  validateCategory(categoryOption: string) {
    if (!this.isValidCategory(categoryOption)) {
      throw new Error(ERROR_MESSAGE.invalidCategory);
    }
  },

  isValidCategory(categoryOption: string) {
    return CATEGORIES.includes(categoryOption);
  },

  isEmptyFormValue(formValue: string) {
    return formValue === '';
  },
};

export default Validator;
