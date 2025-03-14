import List from "../components/List.js";
import ListItem from "../components/ListItem.js";
import { LIST_ITEM_CONTENTS } from "../constants/listData.js";
import RestaurantList from "../domain/RestaurantList.js";

function FavoriteListController(favoriteListContainerElement, restaurantList) {
  let favoriteListElement = List(restaurantList.favoriteRestaurants());
  favoriteListContainerElement.appendChild(favoriteListElement);

  function updateFavoriteList() {
    const favoriteRestaurants = restaurantList.favoriteRestaurants();
    favoriteListElement.innerHTML = "";
    favoriteRestaurants.forEach(({ information }) => {
      favoriteListElement.appendChild(ListItem(information));
    });
  }

  return { favoriteListElement, updateFavoriteList };
}

export default FavoriteListController;
