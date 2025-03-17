import storage from "../domain/storage";
import renderFilteredRestaurants from "../ui/renderFilteredRestaurant";

const clickDelete = (restaurant, restaurantList) => {
  restaurantList.delete(restaurant);

  storage.saveRestaurantList(restaurantList.value);

  renderFilteredRestaurants(restaurantList);
};

export default clickDelete;
