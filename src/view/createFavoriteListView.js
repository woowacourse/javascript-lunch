import List from "../components/List.js";
import ListItem from "../components/ListItem.js";

function createFavoriteListView(restaurantList) {
  let favoriteListElement = List(restaurantList.favoriteRestaurants());

  function updateFavoriteListView() {
    const favoriteRestaurants = restaurantList.favoriteRestaurants();
    favoriteListElement.innerHTML = "";
    favoriteRestaurants.forEach(({ information }) => {
      favoriteListElement.appendChild(ListItem(information));
    });
  }

  return { favoriteListElement, updateFavoriteListView };
}

export default createFavoriteListView;
