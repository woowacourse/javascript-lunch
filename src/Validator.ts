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

  validateRestaurantName(restaurantName: string) {
    if (this.isEmptyFormValue(restaurantName)) {
      throw new Error(ERROR_MESSAGE.emptyName);
    }
  },

  isEmptyFormValue(formValue: string) {
    return formValue === '';
  },

  isValidCategory(selectedCategory: string) {
    return CATEGORIES.includes(selectedCategory);
  },

  validateDistance(selectedDistance: string) {
    if (this.isEmptyFormValue(selectedDistance)) {
      throw new Error(ERROR_MESSAGE.emptyDistance);
    }

    if (!this.isValidDistance(selectedDistance)) {
      throw new Error(ERROR_MESSAGE.invalidDistance);
    }
  },

  isValidDistance(selectedDistance: string) {
    return DISTANCES.includes(selectedDistance);
  },
};

export default Validator;
