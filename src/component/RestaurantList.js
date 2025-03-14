import { CATEGORY_ICON } from "../constants/constants.ts";
import data from "../data.ts";
import state from "../state.ts";
import { $ } from "../utils/querySelectors.js";
import LunchInfoCard from "./LunchInfoCard.js";

const RestaurantList = {
  create() {
    const restaurantListElement = document.createElement("ul");
    restaurantListElement.classList.add("restaurant-list");
    return restaurantListElement;
  },

  applyData() {
    state.setCurrentRestaurantList(data.restaurantList);
    this.applyState();
  },

  applyState() {
    this.applyList(state.currentRestaurantList);
  },

  applyList(restaurantList) {
    const restaurantElementList = this.getRestaurantElementList(restaurantList);
    this.applyElements(restaurantElementList);
  },

  applyElements(elements) {
    $(".restaurant-list").replaceChildren();
    elements.forEach((element) => $(".restaurant-list").appendChild(element));
  },

  getRestaurantElementList(restaurantList) {
    return restaurantList.map(({ name, distance, description, label }) =>
      LunchInfoCard.create({
        src: CATEGORY_ICON[label],
        name,
        distance,
        description,
        label,
      })
    );
  },
};

export default RestaurantList;
