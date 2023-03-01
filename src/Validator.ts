import { CATEGORIES, DISTANCES } from './constants/formCondition';
import { ERROR_MESSAGE } from './constants/message';

const Validator = {
  validateCategory(selectedCategory: string) {
    if (this.isEmptyFormValue(selectedCategory)) {
      throw new Error(ERROR_MESSAGE.emptyCategory);
    }

    if (!this.isValidCategory(selectedCategory)) {
      throw new Error(ERROR_MESSAGE.invalidCategory);
    }
  },

  isEmptyFormValue(formValue: string) {
    return formValue === '';
  },

  isValidCategory(selectedCategory: string) {
    return CATEGORIES.includes(selectedCategory);
  },

  isValidDistance(selectedDistance: string) {
    return DISTANCES.includes(selectedDistance);
  },
};

export default Validator;
