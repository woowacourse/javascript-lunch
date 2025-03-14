import createRestaurantCards from "../service/createRestaurantCards";
import createElement from "../utils/createElement/createElement";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderFavoritePage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  renderRestaurants(
    createRestaurantCards(restaurantList.getFavoriteList(), {
      clickFavorite: () => {
        renderFavoritePage(restaurantList);
      },
    })
  );
};

export default renderFavoritePage;
