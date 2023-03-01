import { CATEGORIES } from './constants/formCondition';
import { ERROR_MESSAGE } from './constants/message';

const Validator = {
  validateCategory(categoryOption: string) {
    if (!CATEGORIES.includes(categoryOption)) {
      throw new Error(ERROR_MESSAGE.invalidCategory);
    }
  },

  isEmpty(rastaurantName: string) {
    return rastaurantName.length === 0;
  },
};

export default Validator;
