import { CATEGORIES } from './constants/formCondition';
import { ERROR_MESSAGE } from './constants/message';

const Validator = {
  validateCategory(categoryOption: string) {
    if (this.isEmptyFormValue(categoryOption)) {
      throw new Error(ERROR_MESSAGE.emptyCategory);
    }

    if (!this.isValidCategory(categoryOption)) {
      throw new Error(ERROR_MESSAGE.invalidCategory);
    }
  },

  isEmptyFormValue(formValue: string) {
    return formValue === '';
  },

  isValidCategory(categoryOption: string) {
    return CATEGORIES.includes(categoryOption);
  },
};

export default Validator;
