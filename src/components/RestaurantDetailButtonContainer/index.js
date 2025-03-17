import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Button from "../common/Button";

const BUTTON_TEXT = {
  DELETE: "삭제하기",
  CLOSE: "닫기",
};

const RestaurantDetailButtonContainer = (restaurant, clickDelete) => {
  const deleteButton = Button({
    text: BUTTON_TEXT.DELETE,
    style: "button--secondary",
    onClick: () => {
      $("#restaurant-detail-modal-backdrop").classList.remove("open");
      clickDelete();
    },
  });

  const closeButton = Button({
    text: BUTTON_TEXT.CLOSE,
    style: "button--primary",
    onClick: () => {
      $("#restaurant-detail-modal-backdrop").classList.remove("open");
    },
  });

  const buttonContainer = createElement({
    tagName: "div",
    classNames: ["button-container"],
    children: [deleteButton, closeButton],
  });

  return buttonContainer;
};

export default RestaurantDetailButtonContainer;
