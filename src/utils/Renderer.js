import FilterSelect from "../component/FilterSelect.js";
import RestaurantList from "../component/RestaurantList.js";
import { RESTAURANT_LIST_KEY } from "../constants/constants.ts";
import LocalStorage from "./LocalStorage.ts";
import { $ } from "./querySelectors.js";
import RestaurantListUtils from "./RestaurantListUtils.ts";

const Renderer = {
  restaurantList() {
    const isAllRestaurantActivated = $(
      ".all_restaurant_nav"
    ).classList.contains("activated");
    const isFavoriteRestaurantActivated = $(
      ".favorite_restaurant_nav"
    ).classList.contains("activated");

    if (isAllRestaurantActivated) this.filteredList("allRestaurant");
    if (isFavoriteRestaurantActivated) {
      const favoriteRestaurantList = RestaurantListUtils.getFavoriteList(
        LocalStorage.getJSON(RESTAURANT_LIST_KEY)
      );
      RestaurantList.applyList("favoriteRestaurant", favoriteRestaurantList);
    }
  },

  filteredList(restaurantListId) {
    const filteredList = FilterSelect.getFilteredList();
    RestaurantList.applyList(restaurantListId, filteredList);
  },
};

export default Renderer;
