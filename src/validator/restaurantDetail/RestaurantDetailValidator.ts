import { startValidation } from "../startValidation";

import type { RestaurantDetailIsValidType } from "./RestaurantDetailValidator.type";
import type { RestaurantDetail } from "../../domain/Restaurant/Restaurant.type";
import { URL_REGEXP } from "../../constants/regexp";

const RestaurantDetailValidator = {
  validationTypes: {
    emptyCategory: {
      errorMessage: "입력한 카테고리가 존재하지 않습니다. 다시 입력해 주세요.",
      isValid({ userInputRestaurantDetail }: RestaurantDetailIsValidType) {
        return userInputRestaurantDetail.category !== "";
      },
    },

    emptyRestaurantName: {
      errorMessage:
        "입력한 음식점 이름이 존재하지 않습니다. 다시 입력해 주세요.",
      isValid({ userInputRestaurantDetail }: RestaurantDetailIsValidType) {
        return userInputRestaurantDetail.name !== "";
      },
    },

    emptyDistance: {
      errorMessage: "입력한 거리가 존재하지 않습니다. 다시 입력해 주세요.",
      isValid({ userInputRestaurantDetail }: RestaurantDetailIsValidType) {
        return userInputRestaurantDetail.distance !== "";
      },
    },

    duplicateNames: {
      errorMessage: "중복된 음식점 이름이 존재합니다. 다시 입력해주세요.",
      isValid({
        userInputRestaurantDetail,
        restaurantDetails,
      }: RestaurantDetailIsValidType) {
        return restaurantDetails.every(
          (restaurantDetail) =>
            restaurantDetail.name !== userInputRestaurantDetail.name
        );
      },
    },

    invalidUrlFormat: {
      errorMessage: "유효하지 않은 이메일 형식 입니다. 다시 입력해주세요.",
      isValid({ userInputRestaurantDetail }: RestaurantDetailIsValidType) {
        return URL_REGEXP.test(userInputRestaurantDetail?.url ?? "");
      },
    },
  } as const,

  check(
    userInputRestaurantDetail: RestaurantDetailIsValidType["userInputRestaurantDetail"],
    restaurantDetails: RestaurantDetail[]
  ) {
    startValidation(this.validationTypes, {
      userInputRestaurantDetail,
      restaurantDetails,
    });
  },
};

export default RestaurantDetailValidator;
