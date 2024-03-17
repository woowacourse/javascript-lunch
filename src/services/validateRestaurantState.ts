import ERROR_MESSAGE from "../constants/error";
import { MAX_LENGTH_OF_DESCRIPTION } from "../constants/system";
import restaurantListStateStore from "../store/RestaurantListStateStore";
import { Icategory } from "../types/category";
import { Irestaurant } from "../types/restaurant";

const valid = {
  isValid: true,
};

const validate = {
  validateCategory(category?: Icategory) {
    if (category === undefined || category.length <= 0) {
      return {
        targetClassName: "invalid_category",
        isValid: false,
        errorMessage: ERROR_MESSAGE.REQUIRED_CATEGORY,
      };
    }
    return valid;
  },

  validateNoName(name?: string) {
    if (name === undefined || name.length <= 0) {
      return {
        targetClassName: "invalid_name",
        isValid: false,
        errorMessage: ERROR_MESSAGE.REQUIRED_NAME,
      };
    }
    return valid;
  },

  validateDuplicateName(name?: string) {
    if (this.checkDuplicate(name)) {
      return {
        targetClassName: "invalid_name",
        isValid: false,
        errorMessage: ERROR_MESSAGE.DUPLICATE_NAME,
      };
    }
    return valid;
  },

  validateName(name?: string) {
    if (!this.validateNoName(name).isValid) {
      return this.validateNoName(name);
    }
    if (!this.validateDuplicateName(name).isValid) {
      return this.validateDuplicateName(name);
    }
    return valid;
  },

  checkDuplicate(name?: string) {
    const restaurantList = restaurantListStateStore.getListData();
    return restaurantList.find(
      (restaurant: Irestaurant) => restaurant.name === name,
    );
  },

  validateDistance(distance?: number) {
    if (distance === undefined) {
      return {
        targetClassName: "invalid_distance",
        isValid: false,
        errorMessage: ERROR_MESSAGE.REQUIRED_DISTANCE,
      };
    }
    return valid;
  },

  validateDescription(description?: string) {
    if (description?.length && description.length > MAX_LENGTH_OF_DESCRIPTION) {
      return {
        targetClassName: "invalid_description",
        isValid: false,
        errorMessage: ERROR_MESSAGE.INVALID_DESCRIPTION_MAX_LENGTH,
      };
    }
    return valid;
  },

  validateLink(link?: string) {
    if (!link?.startsWith("http") && link !== undefined) {
      return {
        targetClassName: "invalid_link",
        isValid: false,
        errorMessage: ERROR_MESSAGE.INVALID_LINK,
      };
    }
    return valid;
  },
};

function validateRestaurantState(restaurantInfo: Partial<Irestaurant>) {
  return [
    validate.validateCategory(restaurantInfo.category),
    validate.validateName(restaurantInfo.name),
    validate.validateDistance(restaurantInfo.distance),
    validate.validateDescription(restaurantInfo.description),
    validate.validateLink(restaurantInfo.link),
  ];
}
export default validateRestaurantState;
