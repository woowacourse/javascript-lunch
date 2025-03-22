import RestaurantCard from "../components/RestaurantCard/index.js";
import RestaurantCardList from "../components/RestaurantCardList/index.js";
import storage from "../domain/storage.ts";
import eventHandlers from "../events/eventHandlers.js";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderFavoritePage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const favoriteCardList = RestaurantCardList(
    restaurantList.getFavoriteList(),
    eventHandlers.favorite(restaurantList)
  );

  return renderRestaurants(favoriteCardList);
};

export default renderFavoritePage;
