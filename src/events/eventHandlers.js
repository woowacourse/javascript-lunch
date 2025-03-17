import storage from "../domain/storage";
import changeModalContents from "../ui/changeModalContents";
import renderFavoritePage from "../ui/renderFavoritePage";
import renderFilteredRestaurants from "../ui/renderFilteredRestaurant";
import { $ } from "../utils/dom";

const eventHandlers = {
  filtered(restaurantList) {
    return {
      clickCard: (restaurant) => {
        $("#restaurant-detail-modal-backdrop").classList.add("open");
        changeModalContents(restaurant, restaurantList);
      },
      clickFavorite: () => {
        storage.saveRestaurantList(restaurantList.value);
        renderFilteredRestaurants(restaurantList);
      },
    };
  },

  favorite(restaurantList) {
    return {
      clickFavorite: () => {
        storage.saveRestaurantList(restaurantList.value);
        renderFavoritePage(restaurantList);
      },
    };
  },
};

export default eventHandlers;
