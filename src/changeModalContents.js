import RestaurantCard from "./components/RestaurantCard";
import RestaurantDetailButtonContainer from "./components/RestaurantDetailButtonContainer";
import storage from "./domain/storage";
import renderFilteredRestaurants from "./renderFilteredRestaurant";
import createRestaurantCards from "./service/createRestaurantCards";
import { $ } from "./utils/dom";

const changeModalContents = (restaurant, restaurantList) => {
  const restaurantDetailModal = $(".restaurant-detail-modal");
  restaurantDetailModal.innerHTML = "";

  restaurantDetailModal.appendChild(
    RestaurantCard(restaurant, {
      clickFavorite: () => {
        storage.saveRestaurantList(
          restaurantList.list.map((restaurant) => restaurant.value)
        );
        renderFilteredRestaurants(restaurantList);
      },
    })
  );

  restaurantDetailModal.appendChild(
    RestaurantDetailButtonContainer(restaurant, () => {
      clickDelete(restaurant, restaurantList);
    })
  );
};

const clickDelete = (restaurant, restaurantList) => {
  restaurantList.delete(restaurant);

  storage.saveRestaurantList(
    restaurantList.list.map((restaurant) => restaurant.value)
  );

  renderFilteredRestaurants(restaurantList);
};

export default changeModalContents;
