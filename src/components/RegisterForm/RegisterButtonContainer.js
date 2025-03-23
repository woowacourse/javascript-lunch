import { clearError } from "../../utils/clearError";
import { clearInput } from "../../utils/clearInput";
import { $ } from "../../utils/dom";
import Button from "../common/Button";
import createElement from "../../utils/createElement/createElement";

const RegisterButtonContainer = (restaurantList, { onClickAddButton }) => {
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
    onClick: (e) => onClickAddButton(e, restaurantList),
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
