import changeModalContents from "../changeModalContents.js";
import storage from "../domain/storage.ts";
import createRestaurantCards from "../service/createRestaurantCards.js";
import renderRestaurants from "./renderRestaurant.js";
import { $ } from "../utils/dom.js";

const renderFilteredRestaurants = (restaurantList) => {
  const filteredCardList = createRestaurantCards(restaurantList.value, {
    clickCard: (restaurant) => {
      $("#restaurant-detail-modal-backdrop").classList.add("open");
      changeModalContents(restaurant, restaurantList);
    },
    clickFavorite: () => {
      storage.saveRestaurantList(restaurantList.value);
    },
  });

  return renderRestaurants(filteredCardList);
};

export default renderFilteredRestaurants;
