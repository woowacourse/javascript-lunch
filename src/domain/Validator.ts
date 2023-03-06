import { CATEGORIES, DISTANCES } from '../constants/formCondition';
import { ERROR_MESSAGE } from '../constants/message';
import { Restaurant } from '../types';

const Validator = {
  validateFormData({ category, name, distance, link }: Restaurant) {
    this.validateCategory(category);
    this.validateRestaurantName(name);
    this.validateDistance(distance);
    this.validateLink(link);
  },

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

  validateDistance(selectedDistance: string) {
    if (this.isEmptyFormValue(selectedDistance)) {
      throw new Error(ERROR_MESSAGE.emptyDistance);
    }

    if (!this.isValidDistance(selectedDistance)) {
      throw new Error(ERROR_MESSAGE.invalidDistance);
    }
  },

  validateLink(link: string) {
    if (link && !Validator.isValidLink(link)) {
      throw new Error(ERROR_MESSAGE.invalidLink);
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

  isValidLink(link: string) {
    const isHttpLink = link.startsWith('http://');
    const isHttpsLink = link.startsWith('https://');

    return isHttpLink || isHttpsLink;
  },
};

export default Validator;
