import renderRestaurants from "../../ui/renderRestaurant";
import restaurantList from "../../domain/RestaurantList";
import Restaurant from "../../domain/Restaurant";
import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import { getInfo } from "./getInfo";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import createElement from "../../utils/createElement/createElement";
import createRestaurantCards from "../../service/createRestaurantCards";

const ButtonContainer = (restaurantList) => {
  const cancleButton = Button({
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
    children: [cancleButton, addButton],
  });

  return buttonContainer;
};

export default ButtonContainer;

const BUTTON_TEXT = {
  CANCEL: "취소하기",
  ADD: "추가하기",
};

const closeModal = () => {
  $(".modal-backdrop").classList.remove("open");
  clearInput("#register-form");
  clearError();
};

const registerRestaurant = (e, restaurantList) => {
  e.preventDefault();
  try {
    const info = getInfo();

    const restaurant = new Restaurant(info);

    restaurantList.add(restaurant);

    $(".modal-backdrop").classList.remove("open");
    renderRestaurants(createRestaurantCards(restaurantList.filter()));

    clearInput("#register-form");
  } catch (e) {
    const currentInputField = $(`#${e.cause}-form-item`);
    currentInputField.appendChild(ErrorMessage(e.message));
  }
};
