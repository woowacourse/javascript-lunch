import RestaurantCardList from "../components/RestaurantCardList/index.js";
import restaurantCardEvents from "../events/restaurantCardEvents.js";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderFavoritesPage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const favoriteCardList = RestaurantCardList(
    restaurantList.favoriteList,
    restaurantCardEvents(restaurantList)
  );

  return renderRestaurants(favoriteCardList);
};

export default renderFavoritesPage;
