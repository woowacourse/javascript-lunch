import Persistence from "../domain/persistence/Persistence";
import renderFilteredRestaurants from "../ui/renderFilteredRestaurant";

const clickDelete = (restaurant, restaurantList) => {
  restaurantList.delete(restaurant);
  Persistence.saveRestaurantList(restaurantList.value);
  renderFilteredRestaurants(restaurantList);
};

export default clickDelete;
