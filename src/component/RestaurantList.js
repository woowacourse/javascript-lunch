import state from "../state.js";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";

const RestaurantList = {
  create() {
    const restaurantListElement = document.createElement("ul");
    restaurantListElement.classList.add("restaurant-list");
    return restaurantListElement;
  },

  applyState() {
    $(".restaurant-list").replaceChildren();
    const innerElements = this.getRestaurantElementList();
    innerElements.forEach((element) =>
      $(".restaurant-list").appendChild(element)
    );
  },

  getRestaurantElementList() {
    return state.restaurantList.map(
      ({ src, name, distance, description, label }) =>
        LunchInfoCard.create({ src, name, distance, description, label })
    );
  },
};

export default RestaurantList;
