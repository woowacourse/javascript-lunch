import restaurantStateStore from "../store/RestaurantStateStore";
import { Icategory, Irestaurant, IrestaurantField } from "../types";
import RestaurantListStorageService from "./restaurantListStorageService";

const validate = {
  validateCategory(category?: Icategory) {
    if (category === undefined || category.length <= 0) {
      return {
        targetClassName: "invalid_category",
        isValid: false,
        errorMessage: "카테고리는 필수적으로 선택해주세요.",
      };
    }
    return {
      isValid: true,
    };
  },

  validateNoName(name?: string) {
    if (name === undefined || name.length <= 0) {
      return {
        targetClassName: "invalid_name",
        isValid: false,
        errorMessage: "레스토랑 이름은 필수적으로 작성해주세요",
      };
    }
    return {
      isValid: true,
    };
  },

  validateDuplicateName(name?: string) {
    const restaurantList = RestaurantListStorageService.getData();
    const checkDuplication = restaurantList.find(
      (restaurant: Irestaurant) => restaurant.name === name,
    );

    if (checkDuplication) {
      return {
        targetClassName: "invalid_name",
        isValid: false,
        errorMessage: "이미 등록된 레스토랑입니다.",
      };
    }
    return {
      isValid: true,
    };
  },

  validateDistance(distance?: number) {
    if (distance === undefined) {
      return {
        targetClassName: "invalid_distance",
        isValid: false,
        errorMessage: "거리를 필수적으로 선택해주세요.",
      };
    }
    return {
      isValid: true,
    };
  },

  validateDescription(description?: string) {
    if (description?.length && description.length > 200) {
      return {
        targetClassName: "invalid_description",
        isValid: false,
        errorMessage: "설명의 최대 글자수는 200자입니다.",
      };
    }
    return {
      isValid: true,
    };
  },

  validateLink(link?: string) {
    if (!link?.startsWith("http") && link !== undefined) {
      return {
        targetClassName: "invalid_link",
        isValid: false,
        errorMessage: "유효한 주소값을 입력해주세요",
      };
    }
    return {
      isValid: true,
    };
  },
};

function validateRestaurantState(restaurantInfo: IrestaurantField) {
  const isValidCategory = validate.validateCategory(restaurantInfo.category);
  const isValidName =
    validate.validateNoName(restaurantInfo.name) &&
    validate.validateDuplicateName(restaurantInfo.name);
  const isValidDistance = validate.validateDistance(restaurantInfo.distance);
  const isValidDescription = validate.validateDescription(
    restaurantInfo.description,
  );
  const isValidLink = validate.validateLink(restaurantInfo.link);

  return [
    isValidCategory,
    isValidName,
    isValidDistance,
    isValidDescription,
    isValidLink,
  ];
}
export default validateRestaurantState;
