import { BUTTON_TEXT } from "../../constants/buttonText";
import Restaurant from "../../model/Restaurant";
import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import { getInfo } from "../../view/input";
import Button from "../common/button";

const ButtonContainer = (onSubmitFailed, restaurantList) => {
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
      onClick: (e) => {
        try {
          registerRestaurant(e, restaurantList);
        } catch (e) {
          onSubmitFailed(e);
        }
      },
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

  const info = getInfo();
  restaurantList.pushList(new Restaurant(info));
  $(".modal-backdrop").classList.remove("open");

  clearInput("#register-form");
};
