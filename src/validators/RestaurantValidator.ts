import { RestaurantInfo } from '../../types/restaurants';
import ERROR_MESSAGES from '../constants/MESSAGE';

const RestaurantValidator = {
  validate(restaurantInput: RestaurantInfo): boolean {
    if (!restaurantInput.category || !restaurantInput.name || !restaurantInput.distance) {
      alert(ERROR_MESSAGES.REQUIRED_FIELDS);
      return false;
    }

    if (restaurantInput.name) {
      if (restaurantInput.name.length > 100) {
        alert(ERROR_MESSAGES.NAME_TOO_LONG);
        return false;
      }
    }

    if (restaurantInput.link) {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

      if (!urlRegex.test(restaurantInput.link)) {
        alert(ERROR_MESSAGES.INVALID_URL);
        return false;
      }
    }

    if (restaurantInput.description) {
      if (restaurantInput.description && restaurantInput.description.length > 300) {
        alert(ERROR_MESSAGES.DESCRIPTION_TOO_LONG);
        return false;
      }
    }

    return true;
  },
};

export default RestaurantValidator;
