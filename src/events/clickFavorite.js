import Persistence from "../domain/persistence/Persistence";
import renderFavoritesPage from "../ui/renderFavoritesPage";
import renderFilteredRestaurants from "../ui/renderFilteredRestaurant";

const clickFavorite = (restaurantList) => {
  Persistence.saveRestaurantList(restaurantList.value);
  if (Persistence.loadTabInfo() === "favorites") {
    renderFavoritesPage(restaurantList);
  } else {
    renderFilteredRestaurants(restaurantList);
  }
};

export default clickFavorite;
