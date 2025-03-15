import changeModalContents from "./changeModalContents";
import storage from "./domain/storage";
import createRestaurantCards from "./service/createRestaurantCards";
import renderRestaurants from "./ui/renderRestaurant";
import { $ } from "./utils/dom";

const renderFilteredRestaurants = (restaurantList) => {
  renderRestaurants(
    createRestaurantCards(restaurantList.filter(), {
      clickCard: (restaurant) => {
        $("#restaurant-detail-modal-backdrop").classList.add("open");
        changeModalContents(restaurant, restaurantList);
      },
      clickFavorite: () => {
        storage.saveRestaurantList(
          restaurantList.list.map((restaurant) => restaurant.value)
        );
      },
    })
  );
};

export default renderFilteredRestaurants;
