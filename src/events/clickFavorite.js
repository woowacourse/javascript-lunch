import Persistence from "../domain/persistence/Persistence";
import renderFavoritePage from "../ui/renderFavoritePage";
import renderFilteredRestaurants from "../ui/renderFilteredRestaurant";

const clickFavorite = (restaurantList) => {
  Persistence.saveRestaurantList(restaurantList.value);
  if (Persistence.loadTabInfo() === "favorites") {
    console.log(Persistence.loadTabInfo());
    renderFavoritePage(restaurantList);
  } else {
    renderFilteredRestaurants(restaurantList);
  }
};

export default clickFavorite;
