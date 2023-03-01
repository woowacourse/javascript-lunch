import { CATEGORIES } from './constants/formCondition';
import { ERROR_MESSAGE } from './constants/message';

const Validator = {
  validateCategory(categoryOption: string) {
    if (!CATEGORIES.includes(categoryOption)) {
      throw new Error(ERROR_MESSAGE.invalidCategory);
    }
  },

  isEmptyFormValue(formValue: string) {
    return formValue === '';
  },
};

export default Validator;
