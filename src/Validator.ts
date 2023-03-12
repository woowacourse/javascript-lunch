import { REGEX } from "./constants";
import { RestaurantForm } from "./global/types";

const Validator = {
  name(name: string) {
    return !REGEX.NAME.test(name.trim());
  },

  duplicatedName(restaurantList: RestaurantForm[], inputName: string) {
    for (const restaurant of restaurantList) {
      if (restaurant.name === inputName) return true;
    }
    return false;
  },

  url(link: string) {
    return !REGEX.URL.test(link);
  },
};

export default Validator;
