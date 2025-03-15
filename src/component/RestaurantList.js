import { CATEGORY_ICON } from "../constants/constants.ts";
import data from "../data.ts";
import state from "../state.ts";
import { $ } from "../utils/querySelectors.js";
import RestaurantListUtils from "../utils/RestaurantListUtils.ts";
import FilterSelect from "./FilterSelect.js";
import LunchInfoCard from "./LunchInfoCard.js";

const RestaurantList = {
  create(id) {
    const restaurantListElement = document.createElement("ul");
    restaurantListElement.id = id;
    restaurantListElement.classList.add("restaurant-list");
    restaurantListElement.addEventListener("click", (e) =>
      this.onClickFavorite(id, e)
    );
    return restaurantListElement;
  },

  onClickFavorite(id, event) {
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
    this.applyState(id);
  },

  applyData(id) {
    this.applyList(id, data.restaurantList);
  },

  applyState(id) {
    this.applyList(id, state.currentRestaurantList);
  },

  applyList(id, restaurantList) {
    state.setCurrentRestaurantList(restaurantList);
    const restaurantElementList = this.getRestaurantElementList(restaurantList);
    this.applyElements(id, restaurantElementList);
  },

  applyElements(id, elements) {
    $(`.restaurant-list[id=${id}]`).replaceChildren();
    elements.forEach((element) =>
      $(`.restaurant-list[id=${id}]`).appendChild(element)
    );
  },

  getRestaurantElementList(restaurantList) {
    console.dir(restaurantList);
    return restaurantList.map(
      ({ id, name, distance, description, label, favorite, link }) =>
        LunchInfoCard.create({
          id,
          src: CATEGORY_ICON[label],
          label,
          name,
          distance,
          description,
          link,
          favorite,
        })
    );
  },
};

export default RestaurantList;
