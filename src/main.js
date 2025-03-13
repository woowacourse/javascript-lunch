import { $ } from "./utils/dom.js";
import header from "./components/header.js";
import Modal from "./components/common/modal.js";
import CategoryAndSortFilter from "./components/categoryAndSortFilter.js";
import FavoriteTabFilters from "./components/favoriteTabFilter.js";
import Restaurants from "./model/Restaurants.js";

addEventListener("load", () => {
  const restaurantList = new Restaurants();
  $("#app").prepend(header(restaurantList.addRestaurant));

  $("main").prepend(CategoryAndSortFilter(restaurantList.changeState));
  $("main").prepend(FavoriteTabFilters(restaurantList.changeState));

  $("main").appendChild(Modal(restaurantList.filter));
});
