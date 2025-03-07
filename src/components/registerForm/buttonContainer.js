import { BUTTON_TEXT } from "../../constants/buttonText";
import renderRestaurants from "../../domain/renderRestaurant";
import { restaurantList } from "../../restaurantList";
import Restaurant from "../../model/Restaurant";
import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import { getInfo } from "../../view/input";
import Button from "../common/button";
import ErrorMessage from "../common/errorMessage";

const ButtonContainer = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

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
      onClick: (e) => registerRestaurant(e),
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

const registerRestaurant = (e) => {
  e.preventDefault();
  try {
    const info = getInfo();

    const restaurant = new Restaurant(info);
    restaurantList.push(restaurant);

    $(".modal-backdrop").classList.remove("open");
    renderRestaurants(restaurant);

    clearInput("#register-form");
  } catch (e) {
    const currentInputField = $(`#${e.cause}-form-item`);
    currentInputField.appendChild(ErrorMessage(e.message));
  }
};
