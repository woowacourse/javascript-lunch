import { BUTTON_TEXT } from "../../constants/buttonText";
import renderRestaurants from "../../ui/renderRestaurant";
import restaurantList from "../../domain/RestaurantList";
import Restaurant from "../../domain/Restaurant";
import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import { getInfo } from "../../view/input";
import Button from "../common/button";
import ErrorMessage from "../common/errorMessage";
import createElement from "../../utils/createElement/createElement";

const ButtonContainer = (restaurantList) => {
  const buttonContainer = createElement({
    tagName: "div",
    classNames: ["button-container"],
  });

  buttonContainer.appendChild(
    Button({
      text: BUTTON_TEXT.CANCEL,
      style: "button--secondary",
      onClick: closeModal,
      type: "button",
      id: "cancel-button",
    })
  );

  buttonContainer.appendChild(
    Button({
      text: BUTTON_TEXT.ADD,
      style: "button--primary",
      onClick: (e) => registerRestaurant(e, restaurantList),
      id: "register-button",
    })
  );

  return buttonContainer;
};
export default ButtonContainer;

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
    renderRestaurants(restaurant);

    clearInput("#register-form");
  } catch (e) {
    const currentInputField = $(`#${e.cause}-form-item`);
    currentInputField.appendChild(ErrorMessage(e.message));
  }
};
