import Restaurant from "../../domain/Restaurant";
import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import { getInfo } from "./getInfo";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import createElement from "../../utils/createElement/createElement";
import storage from "../../domain/storage.ts";
import renderFilteredRestaurants from "../../ui/renderFilteredRestaurant.js";

const RegisterButtonContainer = (restaurantList) => {
  const cancelButton = Button({
    text: BUTTON_TEXT.CANCEL,
    style: "button--secondary",
    onClick: closeModal,
    type: "button",
    id: "cancel-button",
  });

  const addButton = Button({
    text: BUTTON_TEXT.ADD,
    style: "button--primary",
    onClick: (e) => registerRestaurant(e, restaurantList),
    id: "register-button",
  });

  const buttonContainer = createElement({
    tagName: "div",
    classNames: ["button-container"],
    children: [cancelButton, addButton],
  });

  return buttonContainer;
};

export default RegisterButtonContainer;

const BUTTON_TEXT = {
  CANCEL: "취소하기",
  ADD: "추가하기",
};

const closeModal = () => {
  $("#register-modal-backdrop").classList.remove("open");
  clearInput("#register-form");
  clearError();
};

const registerRestaurant = (e, restaurantList) => {
  e.preventDefault();
  try {
    const info = getInfo();
    const restaurant = new Restaurant(info);

    restaurantList.add(restaurant);
    storage.saveRestaurantList(restaurantList.value);

    $("#register-modal-backdrop").classList.remove("open");
    renderFilteredRestaurants(restaurantList);
    clearInput("#register-form");
  } catch (e) {
    console.log(e.message);

    const currentInputField = $(`#${e.cause}-form-item`);

    currentInputField.appendChild(ErrorMessage(e.message));
  }
};
