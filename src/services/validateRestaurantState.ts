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
        errorMessage: "카테고리는 필수적으로 선택해주세요.",
      };
    }
    return valid;
  },

  validateNoName(name?: string) {
    if (name === undefined || name.length <= 0) {
      return {
        targetClassName: "invalid_name",
        isValid: false,
        errorMessage: "레스토랑 이름은 필수적으로 작성해주세요",
      };
    }
    return valid;
  },

  validateDuplicateName(name?: string) {
    if (this.checkDuplicate(name)) {
      return {
        targetClassName: "invalid_name",
        isValid: false,
        errorMessage: "이미 등록된 레스토랑입니다.",
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
        errorMessage: "거리를 필수적으로 선택해주세요.",
      };
    }
    return valid;
  },

  validateDescription(description?: string) {
    if (description?.length && description.length > 300) {
      return {
        targetClassName: "invalid_description",
        isValid: false,
        errorMessage: "설명의 최대 글자수는 300자입니다.",
      };
    }
    return valid;
  },

  validateLink(link?: string) {
    if (!link?.startsWith("http") && link !== undefined) {
      return {
        targetClassName: "invalid_link",
        isValid: false,
        errorMessage: "유효한 주소값을 입력해주세요.",
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
