import storage from "../domain/storage.ts";
import createRestaurantCards from "../service/createRestaurantCards";
import { $ } from "../utils/dom";
import renderRestaurants from "./renderRestaurant";

const renderFavoritePage = (restaurantList) => {
  $(".restaurant-filter-container").innerHTML = "";
  $(".restaurant-list").innerHTML = "";

  const favoriteCardList = createRestaurantCards(
    restaurantList.getFavoriteList(),
    {
      clickFavorite: () => {
        storage.saveRestaurantList(restaurantList.value);
        renderFavoritePage(restaurantList);
      },
    }
  );

  return renderRestaurants(favoriteCardList);
};

export default renderFavoritePage;
