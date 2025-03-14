import createElement from "../utils/createElement/createElement";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderFavoritePage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  renderRestaurants(restaurantList, ...restaurantList.getFavoriteList());
};

export default renderFavoritePage;
