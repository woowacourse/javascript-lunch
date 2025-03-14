import { ERROR_MESSAGE } from "../constants/error";
import addIdToError from "../utils/attachError";
import { $ } from "../utils/dom";
import validateInfo from "../validate/validateRestaurantInfo";

export const getInfo = () => {
  const form = $("#register-form");
  const formData = new FormData(form);
  const info = Object.fromEntries(formData.entries());

  return validateInfo(info);
};
