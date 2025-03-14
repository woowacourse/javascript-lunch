import { CATEGORY_ICON } from "../constants/constants.ts";
import data from "../data.ts";
import state from "../state.ts";
import { $ } from "../utils/querySelectors.js";
import RestaurantListUtils from "../utils/RestaurantListUtils.ts";
import FilterSelect from "./FilterSelect.js";
import LunchInfoCard from "./LunchInfoCard.js";

const RestaurantList = {
  create() {
    const restaurantListElement = document.createElement("ul");
    restaurantListElement.classList.add("restaurant-list");
    restaurantListElement.addEventListener("click", (e) =>
      this.onClickFavorite(e)
    );
    return restaurantListElement;
  },

  onClickFavorite(event) {
    const target = event.target;
    if (!target.classList.contains("restaurant__favorite")) return;
    data.restaurantList = RestaurantListUtils.favoriteById(
      data.restaurantList,
      Number(target.id)
    );
    state.setCurrentRestaurantList(
      RestaurantListUtils.favoriteById(
        state.currentRestaurantList,
        Number(target.id)
      )
    );
    this.applyState();
  },

  applyData() {
    this.applyList(data.restaurantList);
  },

  applyState() {
    this.applyList(state.currentRestaurantList);
  },

  applyList(restaurantList) {
    state.setCurrentRestaurantList(restaurantList);
    const restaurantElementList = this.getRestaurantElementList(restaurantList);
    this.applyElements(restaurantElementList);
  },

  applyElements(elements) {
    $(".restaurant-list").replaceChildren();
    elements.forEach((element) => $(".restaurant-list").appendChild(element));
  },

  getRestaurantElementList(restaurantList) {
    return restaurantList.map(
      ({ id, name, distance, description, label, favorite }) =>
        LunchInfoCard.create({
          id,
          src: CATEGORY_ICON[label],
          name,
          distance,
          description,
          label,
          favorite,
        })
    );
  },
};

export default RestaurantList;
