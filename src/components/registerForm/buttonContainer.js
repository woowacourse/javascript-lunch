import { BUTTON_TEXT } from "../../constants/buttonText";
import Restaurant from "../../model/Restaurant";
import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import { getInfo } from "../../view/input";
import Button from "../common/button";
import { registerModalClose } from "../common/modal/handleCloseModal";

const ButtonContainer = (onSubmitFailed, pushList) => {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  buttonContainer.appendChild(
    Button({
      text: BUTTON_TEXT.CANCEL,
      style: "button--secondary",
      onClick: registerModalClose,
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
          registerRestaurant(e, pushList);
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

const registerRestaurant = (e, pushList) => {
  e.preventDefault();

  const info = getInfo();
  pushList(new Restaurant(info));
  $(".modal-backdrop").classList.remove("open");

  clearInput("#register-form");
};
