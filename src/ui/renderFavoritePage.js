import storage from "../domain/storage";
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
        storage.saveRestaurantList(
          restaurantList.list.map((restaurant) => restaurant.value)
        );
        renderFavoritePage(restaurantList);
      },
    })
  );
};

export default renderFavoritePage;
