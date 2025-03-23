import List from "../components/List.js";
import ListItem from "../components/ListItem.js";

function createFavoriteListView(restaurantList) {
  let favoriteListElement = List(restaurantList.getFavoriteRestaurants());

  function updateFavoriteListView() {
    const favoriteRestaurants = restaurantList.getFavoriteRestaurants();
    favoriteListElement.innerHTML = "";
    favoriteRestaurants.forEach(({ restaurant }) => {
      favoriteListElement.appendChild(ListItem(restaurant));
    });
  }

  return { favoriteListElement, updateFavoriteListView };
}

export default createFavoriteListView;
