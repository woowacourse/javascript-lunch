import FilterSelect from "../component/FilterSelect.js";
import RestaurantList from "../component/RestaurantList.js";
import { RESTAURANT_LIST_KEY } from "../constants/constants.ts";
import state from "../state.ts";
import LocalStorage from "./LocalStorage.ts";
import RestaurantListUtils from "./RestaurantListUtils.ts";

const Renderer = {
  renderOuter() {
    if (state.currentRestaurantListId === "allRestaurant")
      FilterSelect.applyFilter("allRestaurant");
    if (state.currentRestaurantListId === "favoriteRestaurant") {
      const favoriteRestaurantList = RestaurantListUtils.getFavoriteList(
        LocalStorage.getJSON(RESTAURANT_LIST_KEY)
      );
      RestaurantList.applyList("favoriteRestaurant", favoriteRestaurantList);
    }
  },
};

export default Renderer;
