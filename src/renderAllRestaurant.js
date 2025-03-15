import changeModalContents from "./changeModalContents";
import storage from "./domain/storage.ts";
import createRestaurantCards from "./service/createRestaurantCards";
import renderRestaurants from "./ui/renderRestaurant";
import { $ } from "./utils/dom";

const renderAllRestaurant = (restaurantList) => {
  renderRestaurants(
    createRestaurantCards(restaurantList.list, {
      clickCard: (restaurant) => {
        $("#restaurant-detail-modal-backdrop").classList.add("open");
        changeModalContents(restaurant, restaurantList);
      },
      clickFavorite: () => {
        storage.saveRestaurantList(restaurantList.list);
      },
    })
  );
};

export default renderAllRestaurant;
