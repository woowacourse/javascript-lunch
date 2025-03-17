import { CATEGORY_ICON, RESTAURANT_LIST_KEY } from "../constants/constants.ts";
import state from "../state.ts";
import LocalStorage from "../utils/localStorage.ts";
import { $ } from "../utils/querySelectors.js";
import RestaurantListUtils from "../utils/RestaurantListUtils.ts";
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

  onClickFavorite(restaurantListId, event) {
    const target = event.target;
    if (!target.classList.contains("restaurant__favorite")) return;

    const favoriteList = RestaurantListUtils.favoriteById(
      LocalStorage.getJSON(RESTAURANT_LIST_KEY),
      Number(target.id)
    );
    LocalStorage.setJSON(RESTAURANT_LIST_KEY, favoriteList);
    state.setCurrentRestaurantList(
      RestaurantListUtils.favoriteById(
        state.currentRestaurantList,
        Number(target.id)
      )
    );
    this.applyState(restaurantListId);
  },

  applyData(restaurantListId) {
    this.applyList(restaurantListId, LocalStorage.getJSON(RESTAURANT_LIST_KEY));
  },

  applyState(restaurantListId) {
    this.applyList(restaurantListId, state.currentRestaurantList);
  },

  applyList(restaurantListId, restaurantList) {
    state.setCurrentRestaurantList(restaurantList);
    const restaurantElementList = this.getRestaurantElementList(restaurantList);
    this.applyElements(restaurantListId, restaurantElementList);
  },

  applyElements(restaurantListId, elements) {
    $(`.restaurant-list[id=${restaurantListId}]`).replaceChildren();
    elements.forEach((element) =>
      $(`.restaurant-list[id=${restaurantListId}]`).appendChild(element)
    );
  },

  getRestaurantElementList(restaurantList) {
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
