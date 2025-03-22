import Persistence from "../domain/persistence/Persistence";
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
        Persistence.saveRestaurantList(restaurantList.value);
        renderFilteredRestaurants(restaurantList);
      },
    };
  },

  favorite(restaurantList) {
    return {
      clickFavorite: () => {
        Persistence.saveRestaurantList(restaurantList.value);
        renderFavoritePage(restaurantList);
      },
    };
  },
};

export default eventHandlers;
