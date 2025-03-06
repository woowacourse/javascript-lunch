import { BUTTON_TEXT } from "../../constants/buttonText";
import renderRestaurants from "../../domain/renderRestaurant";
import Restaurant from "../../model/Restaurant";
import { $ } from "../../utils/dom";
import { getInfo } from "../../view/input";
import Button from "../common/button";

const ButtonContainer = (restaurantList) => {
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
      onClick: (e) => registerRestaurant(e, restaurantList),
      id: "register-button",
    })
  );

  return buttonContainer;
};
export default ButtonContainer;

const closeModal = () => {
  $(".modal-backdrop").classList.remove("open");
};

const registerRestaurant = (e, restaurantList) => {
  e.preventDefault();
  const restaurant = new Restaurant(getInfo());
  restaurantList.push(restaurant);

  $(".modal-backdrop").classList.remove("open");
  renderRestaurants(restaurantList);
};
