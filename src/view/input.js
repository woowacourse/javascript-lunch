import { ERROR_MESSAGE } from "../constants/error";
import addIdToError from "../utils/attachError";
import { $ } from "../utils/dom";
import { validateEmptyString } from "../validate/validateEmptyString";
import validateStringLength from "../validate/validateStringLength";

export const getInfo = () => {
  const form = $("#register-form");
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());

  return validateInfo(info);
};

const validateInfo = (info) => {
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
  addIdToError("description", () =>
    validateStringLength(info.description, { minLength: 0, maxLength: 500 })
  );

  return info;
};
