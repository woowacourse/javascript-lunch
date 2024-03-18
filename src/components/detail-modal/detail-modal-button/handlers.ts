import RestaurantCRUD from "../../../domain/RestaurantCRUD";
import { Irestaurant } from "../../../types/restaurant";
import removeRestaurant from "../../../utils/removeRestaurant";

export const removeHandler = (modal: Element, restaurant: Irestaurant) => {
  const removeButton = document.getElementsByClassName("button--remove")[0];
  removeButton.addEventListener("click", () => {
    RestaurantCRUD.deleteRestaurant(restaurant);
    modal.remove();
    removeRestaurant(restaurant);
  });
};

export const closeHandler = (modal: Element) => {
  const closeButton = document.getElementsByClassName("button--close")[0];

  closeButton.addEventListener("click", () => {
    modal.remove();
  });
};
