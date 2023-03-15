import { CATEGORIES, DISTANCES } from '../constants';
import { ERROR_MESSAGE } from '../constants';
import { Category, Distance, Restaurant } from '../types';

const Validator = {
  validateFormData({ category, name, distance }: Restaurant) {
    this.validateCategory(category);
    this.validateRestaurantName(name);
    this.validateDistance(distance);
  },

  validateCategory(selectedCategory: Category) {
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

  isValidCategory(selectedCategory: Category) {
    return CATEGORIES.includes(selectedCategory);
  },

  validateDistance(selectedDistance: Distance) {
    if (this.isEmptyFormValue(selectedDistance)) {
      throw new Error(ERROR_MESSAGE.emptyDistance);
    }

    if (!this.isValidDistance(selectedDistance)) {
      throw new Error(ERROR_MESSAGE.invalidDistance);
    }
  },

  isValidDistance(selectedDistance: Distance) {
    return DISTANCES.includes(selectedDistance);
  },
};

export default Validator;
