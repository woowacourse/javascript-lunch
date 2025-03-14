import renderRestaurants from "../../ui/renderRestaurant";
import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Button from "../common/Button";

const BUTTON_TEXT = {
  DELETE: "삭제하기",
  CLOSE: "닫기",
};

const ButtonContainer = (restaurant, restaurantList) => {
  const deleteButton = Button({
    text: BUTTON_TEXT.DELETE,
    style: "button--secondary",
    onClick: () => {
      console.log("삭제하기 클릭");
      restaurantList.delete(restaurant);
      $(".modal-backdrop").classList.remove("open");
      renderRestaurants(restaurantList, ...restaurantList.list);
    },
  });

  const closeButton = Button({
    text: BUTTON_TEXT.CLOSE,
    style: "button--primary",
    onClick: () => {
      console.log("닫기 클릭");
      $(".modal-backdrop").classList.remove("open");
    },
  });

  const buttonContainer = createElement({
    tagName: "div",
    classNames: ["button-container"],
    children: [deleteButton, closeButton],
  });

  return buttonContainer;
};

export default ButtonContainer;
