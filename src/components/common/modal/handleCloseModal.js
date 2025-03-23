import Restaurants from "../../../model/Restaurants";
import { $ } from "../../../utils/dom";
import RestaurantList from "../../restaurantList";

export const modalCloseAndFilter = (renderRestaurants) => {
  renderRestaurants();
  modalClose();
};

export const modalClose = () => {
  const backDrop = $(".modal-backdrop");
  backDrop.classList.remove("open");
  backDrop.replaceChildren();
};
