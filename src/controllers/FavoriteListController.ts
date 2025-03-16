import RestaurantList from "../domain/RestaurantList.ts";
import createFavoriteListView from "../view/createFavoriteListView.js";

function FavoriteListController(restaurantList: RestaurantList) {
  const { favoriteListElement, updateFavoriteListView } = createFavoriteListView(restaurantList);
  return { favoriteListElement, updateFavoriteListView };
}

export default FavoriteListController;
