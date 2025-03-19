import Restaurants from "../../../model/Restaurants";
import { $ } from "../../../utils/dom";
import RestaurantList from "../../restaurantList";

export const modalCloseAndFilter = (filter) => {
  const restaurantList = filter.filter();
  RestaurantList(restaurantList);
  modalClose();
};

export const modalClose = () => {
  const backDrop = $(".modal-backdrop");
  backDrop.classList.remove("open");
  backDrop.replaceChildren();
};
