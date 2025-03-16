import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";
import createFavoriteListView from "../view/createFavoriteListView.js";

function FavoriteListController(favoriteListContainerElement, restaurantList) {
  const updateFavoriteListView = createFavoriteListView(favoriteListContainerElement, restaurantList);
  return updateFavoriteListView;
}

export default FavoriteListController;
