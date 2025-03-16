import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";
import createFavoriteListView from "../view/createFavoriteListView.js";

function FavoriteListController(restaurantList) {
  const { favoriteListElement, updateFavoriteListView } = createFavoriteListView(restaurantList);
  return { favoriteListElement, updateFavoriteListView };
}

export default FavoriteListController;
