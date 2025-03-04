import { ERROR_MESSAGE } from "../constants/error";
import { $ } from "../utils/dom";
import { validateEmptyString } from "../validate/validateEmptyString";
import validateStringLength from "../validate/validateStringLength";

export const getInfo = () => {
  const form = $("#register-form");
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());

  validateEmptyString(info.category, ERROR_MESSAGE.CATEGORY_FIELD_REQUIRED);
  validateStringLength(info.name, { minLength: 1, maxLength: 20 });
  validateEmptyString(info.distance, ERROR_MESSAGE.DISTANCE_FIELD_REQUIRED);
  // 설명, 링크도 맥스 걸기
  return info;
};
