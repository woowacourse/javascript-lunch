import { RestaurantInfo } from "../../types/restaurant";
import { ERROR_MESSAGE } from "../constants/error";
import addIdToError from "../utils/attachError";
import validateEmptyString from "./validateEmptyString";
import validateStringLength from "./validateStringLength";

const validateInfo = (info: RestaurantInfo) => {
  addIdToError("category", () =>
    validateEmptyString(info.category, ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED)
  );
  addIdToError("name", () => {
    validateEmptyString(info.name, ERROR_MESSAGE.NAME_FIELD_REQUIRED);
    validateStringLength(info.name, { minLength: 1, maxLength: 20 });
  });
  addIdToError("distance", () =>
    validateEmptyString(info.distance, ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED)
  );
  addIdToError("description", () => {
    if (info.description)
      validateStringLength(info.description, { minLength: 0, maxLength: 500 });
  });

  return info;
};

export default validateInfo;
