import { REGEX, RESTAURANT_CATEGORIES, ERROR_MESSAGE } from '../constant/';
import { UserRestaurantInput } from '../type';

class Validator {
  errorIfInvalidRestaurant(restaurant: UserRestaurantInput) {
    this.#errorIfInvalidCategory(restaurant.category);
    this.#errorIfEmptyName(restaurant.name);
    this.#errorIfInvalidDistanceInMinutes(restaurant.distanceInMinutes);
    this.#errorIfInvalidLink(restaurant.link);
  }

  #errorIfInvalidCategory(category: string) {
    if (!RESTAURANT_CATEGORIES.includes(category)) {
      throw new Error(ERROR_MESSAGE.categoryIsEmpty);
    }
  }

  #errorIfEmptyName(name: string) {
    if (name.trim().length === 0) {
      throw new Error(ERROR_MESSAGE.nameIsEmpty);
    }
  }

  #errorIfInvalidDistanceInMinutes(distanceInMinutes: string) {
    if (distanceInMinutes.trim().length === 0) {
      throw new Error(ERROR_MESSAGE.distanceInMinutesIsEmpty);
    }
  }

  #errorIfInvalidLink(link: string) {
    if (!REGEX.link.test(link)) {
      throw new Error(ERROR_MESSAGE.linkIsInvalid);
    }
  }
}

export default Validator;
