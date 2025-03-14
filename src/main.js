import { $ } from "./utils/dom";
import header from "./components/header";
import Modal from "./components/common/modal";
import CategoryAndSortFilter from "./components/categoryAndSortFilter";
import FavoriteTabFilters from "./components/favoriteTabFilter";
import Restaurants from "./model/Restaurants.ts";

addEventListener("load", () => {
  const restaurantList = new Restaurants();
  $("#app").prepend(header(restaurantList.addRestaurant));

  $("main").prepend(CategoryAndSortFilter(restaurantList.changeState));
  $("main").prepend(FavoriteTabFilters(restaurantList.changeState));

  $("main").appendChild(Modal(restaurantList.filter));
});
