import {
  REGEX,
  RESTAURANT_CATEGORIES,
  RESTAURANT_DISTANCES_IN_MINUTE,
  ERROR_MESSAGE,
} from '../constant/';

const Validator = {
  checkCategory: (category: string) => {
    if (!Validator.isRestaurantCategory(category)) {
      throw new Error(ERROR_MESSAGE.category);
    }
  },

  isRestaurantCategory: (category: string) => {
    return RESTAURANT_CATEGORIES.includes(category);
  },

  checkName: (name: string) => {
    if (Validator.isBlank(name.trim())) {
      throw new Error(ERROR_MESSAGE.name);
    }
  },

  isBlank: (name: string) => {
    return name.length === 0;
  },

  checkDistance: (distance: string) => {
    if (!Validator.isRestaurantDistance(distance)) {
      throw new Error(ERROR_MESSAGE.distance);
    }
  },

  isRestaurantDistance: (distance: string) => {
    return RESTAURANT_DISTANCES_IN_MINUTE.includes(distance);
  },

  checkLink: (link: string) => {
    if (!Validator.isLink(link)) {
      throw new Error(ERROR_MESSAGE.link);
    }
  },

  isLink: (link: string) => {
    return REGEX.link.test(link);
  },
};

export default Validator;
