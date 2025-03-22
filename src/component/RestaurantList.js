import { CATEGORY_ICON, RESTAURANT_LIST_KEY } from "../constants/constants.ts";
import LocalStorage from "../utils/LocalStorage.ts";
import { $ } from "../utils/querySelectors.js";
import Renderer from "../utils/Renderer.js";
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
    Renderer.restaurantList();
  },

  applyList(restaurantListId, restaurantList) {
    const restaurantElementList = this.getRestaurantElementList(restaurantList);
    this.applyElements(restaurantListId, restaurantElementList);
  },

  applyElements(restaurantListId, elements) {
    const restaurantListElement = $(`.restaurant-list[id=${restaurantListId}]`);
    restaurantListElement.replaceChildren();
    elements.forEach((element) => restaurantListElement.appendChild(element));
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
